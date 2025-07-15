using MongoDB.Driver;
using SsoServer.Models;
using SsoServer.Database;
using MongoDB.Bson;

namespace SsoServer.Services
{
    public class TokenService : MongoService<Token>
    {
        public TokenService() : base("tokens") { }

        public async Task SaveAsync(Token token)
        {
            await AddAsync(token);
        }

        public async Task<Token?> GetByRefreshTokenAsync(string refreshToken)
        {
            var filter = Builders<Token>.Filter.Eq(t => t.RefreshToken, refreshToken);
            return await GetOneAsync(filter);
        }

        public bool IsAccessTokenExpired(Token token)
        {
            return token.AccessTokenExpiresAt < DateTime.UtcNow;
        }

        public bool IsRefreshTokenExpired(Token token)
        {
            return token.RefreshTokenExpiresAt < DateTime.UtcNow;
        }

        public async Task<bool> RevokeByRefreshTokenAsync(string refreshToken)
        {
            var filter = Builders<Token>.Filter.Eq(t => t.RefreshToken, refreshToken);
            var result = await Collection.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
        }

        public async Task ReplaceAsync(string oldRefreshToken, Token newToken)
        {
            var filter = Builders<Token>.Filter.Eq(t => t.RefreshToken, oldRefreshToken);
            await ReplaceOneAsync(filter, newToken);
        }

        public async Task RevokeAllByUserIdAsync(ObjectId userId)
        {
            var filter = Builders<Token>.Filter.Eq(t => t.UserId, userId);
            await Collection.DeleteManyAsync(filter);
        }
    }
}
