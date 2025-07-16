using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SsoServer.Requests;

public class GetTokenRequest
{
    public required string AuthorizeCode { get; set; }
    public required string State { get; set; }
    public required string ClientId { get; set; }
    public required string RedirectUri { get; set; }
}


