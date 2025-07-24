using Microsoft.AspNetCore.Mvc;
using SsoServer.Models;
using SsoServer.Requests;
using SsoServer.Services;
using SsoServer.Utils;

namespace SsoServer.Controllers;

[ApiController]
[Route("/auth")]
public class AuthController : Controller
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

    [HttpGet("login")]
    public IActionResult Index(string returnUrl = "/")
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View("Login");
    }

    [HttpGet("register")]
    public IActionResult Register(string returnUrl = "/")
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View("Register");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userService.GetByUsername(request.Username);
        if (user == null)
            return Unauthorized(new { message = "Người dùng không tồn tại" });

        var isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
        if (!isValid)
            return Unauthorized(new { message = "Mật khẩu không chính xác" });

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

        // Lưu token vào cookie
        Response.Cookies.Append("accessToken", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = DateTime.UtcNow.AddMinutes(60),
            SameSite = SameSiteMode.Strict
        });

        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = DateTime.UtcNow.AddDays(7),
            SameSite = SameSiteMode.Strict
        });

        return Ok(new
        {
            error = 0,
            action = "login",
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await _userService.GetByUsername(request.Username);
        if (existingUser != null)
            return Conflict(new { message = "Người dùng này đã tồn tại" });

        var existingEmail = await _userService.GetByEmail(request.Email);
        if (existingEmail != null)
            return Conflict(new { message = "Email này đã được sử dụng" });

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

        await _userService.AddAsync(newUser);
        await _tokenService.AddAsync(newToken);

        // Lưu token vào cookie
        Response.Cookies.Append("accessToken", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = DateTime.UtcNow.AddMinutes(60),
            SameSite = SameSiteMode.Strict
        });

        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = DateTime.UtcNow.AddDays(7),
            SameSite = SameSiteMode.Strict
        });

        return Ok(new
        {
            error = 0,
            action = "register",
        });
    }
}
