using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class EmergencyPhoneCustom
    {
        /// <summary>
        /// 组名称
        /// </summary>
        public string groupName { get; set; }
        /// <summary>
        /// 电话号码集合
        /// </summary>
        public List<PhoneGroup> phoneList { get; set; }

    }
}
