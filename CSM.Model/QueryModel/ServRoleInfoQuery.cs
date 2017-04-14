using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class ServRoleInfoQuery
    {
        public int id { get; set; }
        /// <summary>
        /// 角色名称
        /// </summary>
        public string role_name { get; set; }
        /// <summary>
        /// 角色编码
        /// </summary>
        public string role_code { get; set; }
        /// <summary>
        /// 角色描述
        /// </summary>
        public string role_describe { get; set; }
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public string ext1 { get; set; }
        public string ext2 { get; set; }
        public string ext3 { get; set; }
        public string ext4 { get; set; }
        public string ext5 { get; set; }
    }
}
