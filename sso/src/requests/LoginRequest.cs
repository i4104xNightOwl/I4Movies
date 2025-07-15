using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SsoServer.Requests;

public class LoginRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}



