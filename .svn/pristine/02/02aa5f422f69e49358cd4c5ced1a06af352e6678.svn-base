using CSM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class VideoBLL:AbstractFilter
    {
        /// <summary>
        /// 处理视频数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandleVideoData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.VideoData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.视频子系统);
                    break;
                default: break;
            }
            return true;
        }
    }
}
