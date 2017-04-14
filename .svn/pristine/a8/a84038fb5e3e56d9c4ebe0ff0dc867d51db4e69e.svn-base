using CSM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class PowerEnvironmentBLL:AbstractFilter
    {
        /// <summary>
        /// 处理动力环境监测数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandlePowerEnvironmentData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.PowerEnvironmentData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.动力环境检测);
                    break;
                default: break;
            }
            return true;
        }
    }
}
