using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class ServOrganizationChartQuery
    {
        public int id { get; set; }
        public string image_url { get; set; }
        public string content { get; set; }
        public DateTime create_time { get; set; }
        public DateTime update_time { get; set; }
        public string parent_node { get; set; }
        public string child_node { get; set; }
        public string color { get; set; }
        public string ext1 { get; set; }
        public string ext2 { get; set; }
        public string ext3 { get; set; }
        public string ext4 { get; set; }
        public string ext5 { get; set; }
    }
}
