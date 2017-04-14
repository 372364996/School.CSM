using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Common
{
    public class PeriodTimeHelper
    {
        /// <summary>
        /// 获取时间段
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static TimePeriod GetPeriodTime(EnumClass.PeriodType type)
        {
            TimePeriod time = new TimePeriod();
            DateTime now = DateTime.Now;
            switch (type)
            {
                case EnumClass.PeriodType.Day:  //当天
                    time.startTime = now.Date;
                    time.endTime = now;
                    break;
                case EnumClass.PeriodType.Week: //本周
                    time.startTime = now.Date.AddDays(-(GetWeekOfDayIndex(now)-1));
                    time.endTime = now;
                    break;
                case EnumClass.PeriodType.Month:  //本月
                    time.startTime = new DateTime(now.Year, now.Month, 1);
                    time.endTime = now;
                    break;
                case EnumClass.PeriodType.Quarter://本季度
                    time.startTime = now.Date.AddMonths(0 - ((now.Month - 1) % 3)).AddDays(1 - now.Day);
                    time.endTime = now;
                    break;
                case EnumClass.PeriodType.FHalfYear: //上半年
                    time.startTime = new DateTime(now.Year, 1, 1);
                    time.endTime = new DateTime(now.Year, 7, 1);
                    break;
                case EnumClass.PeriodType.SHalfYear: //下半年
                    time.startTime = new DateTime(now.Year, 7, 1);
                    time.endTime = new DateTime(now.Year + 1, 1, 1);
                    break;
                case EnumClass.PeriodType.Year:  //本年
                    time.startTime = new DateTime(now.Year, 1, 1);
                    time.endTime = now;
                    break;
                default:  //默认当天
                    time.startTime = now.Date;
                    time.endTime = now;
                    break;
            }
            return time;
        }
        /// <summary>
        /// 确定星期几
        /// </summary>
        /// <param name="now"></param>
        /// <returns></returns>
        private static int GetWeekOfDayIndex(DateTime now)
        {
            int index = (int)now.DayOfWeek;
            return index = index == 0 ? 7 : index;
        }
        /// <summary>
        /// 获取查询model
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public static TimePeriodQuery GetQueryModel(EnumClass.PeriodType type)
        {
            TimePeriod time = GetPeriodTime(type);
            TimePeriodQuery model = new TimePeriodQuery();
            model.eTime = time.endTime.ToString();
            model.sTime = time.startTime.ToString();
            return model;
        }
    }
}
