using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace SsoServer.Models
{
    public class Token
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("user_id")]
        public ObjectId UserId { get; set; }

        [BsonElement("access_token")]
        public string? AccessToken { get; set; }

        [BsonElement("refresh_token")]
        public string? RefreshToken { get; set; }

        [BsonElement("access_token_expires_at")]
        public DateTime? AccessTokenExpiresAt { get; set; }

        [BsonElement("refresh_token_expires_at")]
        public DateTime? RefreshTokenExpiresAt { get; set; }
    }
}
