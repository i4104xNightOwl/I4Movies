using Microsoft.AspNetCore.Mvc;
using SsoServer.Database;
using SsoServer.Models;
using SsoServer.Requests;
using SsoServer.Utils;

namespace SsoServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly MongoService _mongoService;
    private readonly JWTUtils _jwtUtils;

    public AuthController()
    {
        _mongoService = new MongoService();
        _jwtUtils = new JWTUtils();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _mongoService.GetByUsername(request.Username);
        if (user == null)
            return Unauthorized(new { message = "User not found" });

        var isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
        if (!isValid)
            return Unauthorized(new { message = "Invalid password" });

        var token = _jwtUtils.CreateToken(user);
        return Ok(new { token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await _mongoService.GetByUsername(request.Username);
        if (existingUser != null)
            return Conflict(new { message = "Username already exists" });

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var newUser = new Users
        {
            Username = request.Username,
            Email = request.Email,
            Role = "user",
            Password = hashedPassword
        };

        await _mongoService.Add(newUser);
        var token = _jwtUtils.CreateToken(newUser);

        return Ok(new { token });
    }

    [HttpPost("refresh-token")]
    public IActionResult RefreshToken([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Username))
            return BadRequest(new { message = "Missing token" });

        var newToken = _jwtUtils.RefreshToken(request.Username);
        return Ok(new { token = newToken });
    }
}
