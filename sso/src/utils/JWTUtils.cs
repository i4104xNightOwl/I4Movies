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
        private readonly string _issuer = "sso-server";
        private readonly string _audience = "i4movies";

        public string CreateRefreshToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        }

        public string CreateToken(Users user)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "resources", "private_key.pem");
            var key = ECDsa.Create();
            key.ImportFromPem(File.ReadAllText(path));

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

        public bool RevokeToken()
        {
            return true;
        }
    }
}
