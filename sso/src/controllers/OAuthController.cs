using Microsoft.AspNetCore.Mvc;
using SsoServer.Models;
using SsoServer.Requests;
using SsoServer.Services;
using SsoServer.Utils;

[ApiController]
[Route("api/oauth")]
public class OAuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly TokenService _tokenService;
    private readonly JWTUtils _jwtUtils;

    public OAuthController()
    {
        _userService = new UserService();
        _tokenService = new TokenService();
        _jwtUtils = new JWTUtils();
    }

    [HttpGet("authorization")]
    public async Task<IActionResult> Authorization(
        [FromQuery] string response_type,
        [FromQuery] string client_id,
        [FromQuery] string redirect_uri,
        [FromQuery] string scope,
        [FromQuery] string state
    )
    {
        if (response_type != "code")
            return BadRequest(new { error = "unsupported_response_type" });

        if (string.IsNullOrEmpty(client_id) || string.IsNullOrEmpty(redirect_uri))
            return BadRequest(new { error = "invalid_request" });

        // TODO: Sửa lại phần này, đổi sang cookie
        var user = await _userService.GetByEmail("i4104.vn");
        if (user == null)
            return Unauthorized();

        var authorizationCode = Guid.NewGuid().ToString("N");

        System.IO.File.WriteAllText($"./tmp/code_{authorizationCode}.txt", user.Username);

        var redirectUrl = $"{redirect_uri}?code={authorizationCode}&state={state}";
        return Redirect(redirectUrl);
    }

    [HttpPost("get-token")]
    public async Task<IActionResult> GetToken([FromBody] GetTokenRequest request)
    {
        if (request.AuthorizeCode != "authorization_code")
            return BadRequest(new { error = "unsupported_grant_type" });

        if (string.IsNullOrEmpty(request.AuthorizeCode) ||
            string.IsNullOrEmpty(request.ClientId) ||
            string.IsNullOrEmpty(request.RedirectUri))
        {
            return BadRequest(new { error = "invalid_request" });
        }

        if (request.ClientId != "myclient")
            return Unauthorized(new { error = "invalid_client" });

        // TODO: Sửa lại phần này
        var codeFilePath = $"./tmp/code_{request.AuthorizeCode}.txt";
        if (!System.IO.File.Exists(codeFilePath))
            return BadRequest(new { error = "invalid_grant" });

        var email = await System.IO.File.ReadAllTextAsync(codeFilePath);
        System.IO.File.Delete(codeFilePath);

        var user = await _userService.GetByEmail(email);
        if (user == null)
            return Unauthorized();

        var accessToken = _jwtUtils.CreateToken(user);
        var refreshToken = Guid.NewGuid().ToString("N");
        // Đọc dữ liệu từ database thay vì dùng hasrd code như này

        return Ok(new
        {
            access_token = accessToken,
            token_type = "bearer",
            expires_in = 3600,
            refresh_token = refreshToken
        });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.RefreshToken))
            return BadRequest(new { message = "Missing refresh token" });

        var token = await _tokenService.GetByRefreshTokenAsync(request.RefreshToken);
        if (token == null)
            return Unauthorized(new { message = "Invalid or revoked token" });

        if (_tokenService.IsRefreshTokenExpired(token))
            return Unauthorized(new { message = "Refresh token expired" });

        var user = await _userService.GetById(token.UserId);
        if (user == null)
            return Unauthorized(new { message = "User not found" });

        await _tokenService.RevokeByRefreshTokenAsync(request.RefreshToken);

        var accessToken = _jwtUtils.CreateToken(user);
        var refreshToken = _jwtUtils.CreateRefreshToken();
        var now = DateTime.UtcNow;

        var newToken = new Token
        {
            UserId = token.UserId,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            AccessTokenExpiresAt = now.AddMinutes(60),
            RefreshTokenExpiresAt = now.AddDays(7)
        };

        await _tokenService.SaveAsync(newToken);

        return Ok(new
        {
            accessToken,
            refreshToken
        });
    }
}
