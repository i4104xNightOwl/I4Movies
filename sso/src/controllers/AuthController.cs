using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SsoServer.Database;
using SsoServer.Models;
using SsoServer.Requests;
using SsoServer.Services;
using SsoServer.Utils;

namespace SsoServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly TokenService _tokenService;
    private readonly JWTUtils _jwtUtils;

    public AuthController()
    {
        _userService = new UserService();
        _tokenService = new TokenService();
        _jwtUtils = new JWTUtils();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userService.GetByUsername(request.Username);
        if (user == null)
            return Unauthorized(new { message = "User not found" });

        var isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
        if (!isValid)
            return Unauthorized(new { message = "Invalid password" });

        var accessToken = _jwtUtils.CreateToken(user);
        var refreshToken = _jwtUtils.CreateRefreshToken();
        
        var newToken = new Token
        {
            UserId = user.Id,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(60),
            RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _tokenService.AddAsync(newToken);

        return Ok(new
        {
            accessToken,
            refreshToken
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await _userService.GetByUsername(request.Username);
        if (existingUser != null)
            return Conflict(new { message = "Username already exists" });

        var existingEmail = await _userService.GetByEmail(request.Email);
        if (existingEmail != null)
            return Conflict(new { message = "Email already used" });

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var newUser = new Users
        {
            Username = request.Username,
            Email = request.Email,
            Role = "user",
            Password = hashedPassword
        };

        var accessToken = _jwtUtils.CreateToken(newUser);
        var refreshToken = _jwtUtils.CreateRefreshToken();

        var newToken = new Token
        {
            UserId = newUser.Id,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(60),
            RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _tokenService.AddAsync(newToken);
        await _userService.AddAsync(newUser);

        return Ok(new
        {
            accessToken,
            refreshToken
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
