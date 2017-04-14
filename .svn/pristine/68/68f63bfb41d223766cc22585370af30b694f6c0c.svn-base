using CSM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class SensorBLL:AbstractFilter
    {
        /// <summary>
        /// 处理传感器数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandleSensorData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.SensorData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.传感器);
                    break;
                default: break;
            }
            return true;
        }
    }
}
