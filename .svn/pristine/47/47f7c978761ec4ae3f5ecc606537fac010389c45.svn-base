using CSM.Common;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class FireBLL : AbstractFilter
    {
        /// <summary>
        /// 处理消防数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandleFireData(int dataType, object  message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.FireData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.消防子系统);
                    break;
                default: break;
            }
            return true;
        }
    }

}
