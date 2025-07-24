using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SsoServer.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("username")]
        public required string Username { get; set; }

        [BsonElement("email")]
        public required string Email { get; set; }

        [BsonElement("role")]
        public required string Role { get; set; }

        [BsonElement("password")]
        public string? Password { get; set; }
    }
}
