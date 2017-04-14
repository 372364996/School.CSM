using CSM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class PerimeterBLL : AbstractFilter
    {
        /// <summary>
        /// 处理周界数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandlePerimeterData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.PerimeterData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.周界子系统);
                    break;
                default: break;
            }
            return true;
        }
    }
}
