using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class ShowCronTimeModel
    {
        /// <summary>
        /// 无：0,；天：1；周：2；月：3；年：4
        /// </summary>
        public int pType { get; set; }
        /// <summary>
        /// 间隔
        /// </summary>
        public int span { get; set; }
        /// <summary>
        /// 子类型
        /// </summary>
        public int cType { get; set; }
        /// <summary>
        /// 枚举周几
        /// </summary>
        public int[] weekDayArray { get; set; }

        /// <summary>
        /// 指定的一个时间（年：指定月份）
        /// </summary>
        public int time { get; set; }
        /// <summary>
        /// 顺序；第几
        ///  case "F": desc = 1
        ///  case "S": desc = 2
        ///  case "T": desc = 3
        ///  case "R": desc = 4
        ///  case "L": desc = 5
        ///  </summary>
        public int order { get; set; }
        /// <summary>
        /// 周几或者第几天
        /// case "0": week = 1
        /// case "1": week = 2
        /// case "2": week = 3
        /// case "3": week = 4
        /// case "4": week = 5
        /// case "5": week = 6
        /// case "6": week = 7
        /// case "W": week = 8
        /// case "H": week = 9
        /// </summary>
        public int week { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string describe { get; set; }
    }
}
