using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class BaseEventTypeQuery
    {
        public int id { set; get; }
        public string event_name { set; get; }
        public string event_code { set; get; }

        public int pid { set; get; }

        public string content { set; get; }

        public int pageIndex { get; set; }

        public int pageSize { get; set; }
    }
}
