using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class BuildingInfoTreeCustom
    {
        public int id { get; set; }
        public int pId { get; set; }
        public string name { get; set; }
        public string floor_code { get; set; }
        public int building_id { set; get; }
        public string point1 { set; get; }
        public string point2 { set; get; }
        public string floor_src_2d { set; get; }
        public int rank { get; set; }
    }
}
