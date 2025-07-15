using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using SsoServer.Models;

namespace SsoServer.Utils
{
    public class JWTUtils
    {
        private readonly string _privateKeyPath = "../resources/private_key.pem";
        private readonly string _issuer = "sso-server";
        private readonly string _audience = "i4movies";

        public string CreateToken(Users user)
        {
            if (!File.Exists(_privateKeyPath))
                throw new FileNotFoundException("Private key file not found");

            using var key = ECDsa.Create();
            key.ImportFromPem(File.ReadAllText(_privateKeyPath));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim("role", user.Role),
                new Claim("email", user.Email)
            };

            var creds = new SigningCredentials(new ECDsaSecurityKey(key), SecurityAlgorithms.EcdsaSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string RefreshToken(string oldToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(oldToken);

            var user = new Users
            {
                Username = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ?? "",
                Role = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "user",
                Email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value ?? "",
            };

            return CreateToken(user);
        }

        public bool RevokeToken()
        {
            // ⚠️ JWT không thể thu hồi trừ khi bạn giữ blacklist hoặc token store
            // Ở đây giả lập là luôn thành công
            return true;
        }
    }
}
