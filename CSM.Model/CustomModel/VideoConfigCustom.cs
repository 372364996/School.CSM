using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class VideoConfigCustom
    {
        public int videoPlatform { get; set; }
        public string  serverIP { get; set; }
        public string  userName { get; set; }
        public string userPwd { get; set; }
        public int regionId { get; set; }
    }
}
