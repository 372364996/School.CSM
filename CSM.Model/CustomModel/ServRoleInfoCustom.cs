using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class ServRoleInfoCustom
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
        public int pid { get; set; }
        public bool @checked { get; set; }
    }
}
