using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SsoServer.Requests
{
    public class RefreshTokenRequest
    {
        public required string RefreshToken { get; set; }
    }
}
