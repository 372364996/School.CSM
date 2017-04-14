using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
   public  class ServPlanHandleItemCameraQuery
    {
        public int id { get; set; }
        public int handleitem_id { get; set; }
        public int device_id { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
    }
}
