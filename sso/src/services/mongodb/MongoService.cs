using MongoDB.Bson;
using MongoDB.Driver;
using SsoServer.Models;

namespace SsoServer.Database
{
    public class MongoService
    {
        private readonly IMongoCollection<Users> _users;

        public MongoService()
        {
            var connectionString = "mongodb://localhost:27017";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("movies");

            _users = database.GetCollection<Users>("users");
        }

        public async Task Add(Users newUser)
        {
            await _users.InsertOneAsync(newUser);
        }

        public async Task<Users?> GetByUsername(string username)
        {
            return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
        }

        public async Task<List<Users>> GetAll()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task Update(ObjectId id, Users updatedUser)
        {
            await _users.ReplaceOneAsync(u => u.Id == id, updatedUser);
        }

        public async Task Delete(ObjectId id)
        {
            await _users.DeleteOneAsync(u => u.Id == id);
        }
    }
}
