using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSM.Controllers
{

    public class TestController : ApiController
    {
        public DateTime GetTime()
        {
            return DateTime.Now;
        }
    }
}
