using MongoDB.Bson;
using MongoDB.Driver;

namespace SsoServer.Database
{
    public abstract class MongoService<T>
    {
        protected IMongoCollection<T> Collection { get; private set; }

        protected MongoService(string collectionName, string connectionString = "mongodb://localhost:27017", string databaseName = "movies")
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            Collection = database.GetCollection<T>(collectionName);
        }

        public async Task AddAsync(T item)
        {
            await Collection.InsertOneAsync(item);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await Collection.Find(_ => true).ToListAsync();
        }

        public async Task<T?> GetById(ObjectId id)
        {
            var filter = Builders<T>.Filter.Eq("_id", id);
            return await GetOneAsync(filter);
        }

        public async Task<T?> GetOneAsync(FilterDefinition<T> filter)
        {
            return await Collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task ReplaceOneAsync(FilterDefinition<T> filter, T replacement)
        {
            await Collection.ReplaceOneAsync(filter, replacement);
        }
    }
}
