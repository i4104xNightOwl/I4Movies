using SsoServer.Models;
using MongoDB.Driver;
using SsoServer.Database;

namespace SsoServer.Services
{
    public class UserService : MongoService<Users>
    {
        public UserService() : base("users") { }

        public async Task<Users?> GetByUsername(string username)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.Username, username);
            return await GetOneAsync(filter);
        }

        public async Task<Users?> GetByEmail(string email)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.Email, email);
            return await GetOneAsync(filter);
        }

        public async Task Update(Users user)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.Email, user.Email);
            await ReplaceOneAsync(filter, user);
        }
    }
}
