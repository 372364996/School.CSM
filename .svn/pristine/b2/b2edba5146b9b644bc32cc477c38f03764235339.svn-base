using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Utils
{
    public class TimeOperation
    {
        /// <summary>
        /// 斜杠操作符('/')
        /// </summary>
        /// <param name="start">表达式'/'前面的字符</param>
        /// <param name="end">表达式'/'后面的字符</param>
        /// <param name="checkNum">待检测值</param>
        /// <param name="currentNum">开始值</param>
        /// <returns></returns>
        public static bool SlashOperation(string start, string end, int checkNum, int currentNum)
        {
            try
            {
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))  //校验字符是否为空，为空返回异常
                {
                    if (start.ToUpper() == "C")  //判断‘/’前部分字符是否为‘C’
                    {
                        int endInt = -1;
                        bool bl = int.TryParse(end, out endInt); //判断‘/’后部分字符是否能转化为int类型
                        if (bl == true)
                        {
                            if ((checkNum - currentNum) % endInt == 0)   //判断待校验值减去初始值除以周期数，是否整除
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            throw new Exception("时间字符串非法！");
                        }
                    }
                    else
                    {
                        int startInt = -1; int endInt = -1;
                        bool startBl = int.TryParse(start, out startInt);
                        bool endBl = int.TryParse(end, out endInt);
                        if (startBl == true && endBl == true)
                        {
                            if (checkNum >= startInt && (checkNum - startInt) % endInt == 0)   //判断待校验值减去初始值除以周期数，是否整除
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            throw new Exception("时间字符串非法！");
                        }
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 日斜杠操作符('/')
        /// </summary>
        /// <param name="start">表达式'/'前面的字符</param>
        /// <param name="end">表达式'/'后面的字符</param>
        /// <param name="checkNum">待检测值</param>
        /// <param name="currentNum">开始值</param>
        /// <returns></returns>
        public static bool DaysSlashOperation(DateTime current, DateTime startTime, string start, string end)
        {
            try
            {

                int daySpan = (int)(current.Date - startTime.Date).TotalDays;  //计算开始时间到当前相差天数
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))  //校验字符是否为空，为空返回异常
                {
                    if (start.ToUpper() == "C")  //判断‘/’前部分字符是否为‘C’
                    {
                        int endInt = -1;
                        bool bl = int.TryParse(end, out endInt); //判断‘/’后部分字符是否能转化为int类型
                        if (bl == true)
                        {
                            if (daySpan % endInt == 0)   //判断待校验值减去初始值除以周期数，是否整除
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            throw new Exception("时间字符串非法！");
                        }
                    }
                    else
                    {
                        int startInt = -1; int endInt = -1;
                        bool startBl = int.TryParse(start, out startInt);
                        bool endBl = int.TryParse(end, out endInt);
                        if (startBl == true && endBl == true)
                        {
                            if (current.Day >= startInt && (current.Day - startInt) % endInt == 0)   //判断待校验值减去初始值除以周期数，是否整除
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            throw new Exception("时间字符串非法！");
                        }
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// ‘-’操作符
        /// </summary>
        /// <param name="start">表达式‘-’前的字符</param>
        /// <param name="end">表达式‘-’后的字符</param>
        /// <param name="checkNum">待检测值</param>
        /// <returns></returns>
        public static bool DayHyphenOperation(string start, string end, int checkNum)
        {
            try
            {
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
                {
                    int startInt = -1; int endInt = -1;
                    bool startBl = int.TryParse(start, out startInt);
                    bool endBl = int.TryParse(end, out endInt);
                    if (startBl == true && endBl == true)
                    {
                        if (checkNum >= startInt && checkNum <= endInt)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 日'#'操作符
        /// </summary>
        /// <param name="start">表达式‘#’前的字符</param>
        /// <param name="end">表达式‘#’后的字符</param>
        /// <param name="currentTime">当前时间</param>
        /// <param name="type">类型，1：天；2：周</param>
        /// <returns></returns>
        public static bool DayPoundOperation(string start, string end, DateTime currentTime)
        {
            try
            {
                //校验
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
                {
                    int currentDay = currentTime.Day;
                    DayOfWeek weekDay = currentTime.DayOfWeek;
                    switch (start)
                    {
                        case "F":
                            if (end.ToUpper() == "W")
                            {
                                if (weekDay == DayOfWeek.Saturday || weekDay == DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Monday)
                                {
                                    return currentDay < 4 ? true : false;
                                }
                                else
                                {
                                    return currentDay == 1 ? true : false;
                                }
                            }
                            else if (end.ToUpper() == "H")
                            {

                                if (weekDay == DayOfWeek.Sunday)
                                {
                                    return currentDay == 1 ? true : false;
                                }
                                else if (weekDay == DayOfWeek.Saturday)
                                {
                                    return currentDay < 7 ? true : false;
                                }
                                else
                                {
                                    return false;
                                }
                            }
                            else
                            {
                                int endInt = -1;
                                if (int.TryParse(end, out endInt))
                                {
                                    return endInt == currentDay ? true : false;
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }
                            }
                        case "S":
                            if (end.ToUpper() == "W")
                            {
                                if (weekDay == DayOfWeek.Saturday || weekDay == DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Monday)
                                {
                                    return currentDay == 4 ? true : false;
                                }
                                else if (weekDay == DayOfWeek.Tuesday)
                                {
                                    return currentDay <= 4 && currentDay >= 2 ? true : false;
                                }
                                else
                                {
                                    return currentDay == 2 ? true : false;
                                }
                            }
                            else if (end.ToUpper() == "H")
                            {
                                if (weekDay != DayOfWeek.Saturday && weekDay != DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Saturday)
                                {
                                    return currentDay == 7 ? true : false;
                                }
                                else
                                {
                                    return currentDay <= 7 ? true : false;
                                }
                            }
                            else
                            {
                                throw new Exception("时间字符串非法！");
                            }
                        case "T":
                            if (end.ToUpper() == "W")
                            {
                                if (weekDay == DayOfWeek.Saturday || weekDay == DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Monday || weekDay == DayOfWeek.Tuesday)
                                {
                                    return currentDay == 5 ? true : false;
                                }
                                else if (weekDay == DayOfWeek.Wednesday)
                                {
                                    return currentDay <= 5 && currentDay >= 3 ? true : false;
                                }
                                else
                                {
                                    return currentDay == 3 ? true : false;
                                }
                            }
                            else if (end.ToUpper() == "H")
                            {
                                if (weekDay != DayOfWeek.Saturday && weekDay != DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Saturday)
                                {
                                    return currentDay >= 8 && currentDay <= 13 ? true : false;
                                }
                                else
                                {
                                    return currentDay == 8 ? true : false;
                                }
                            }
                            else
                            {
                                throw new Exception("时间字符串非法！");
                            }

                        case "R":
                            if (end.ToUpper() == "W")
                            {
                                if (weekDay == DayOfWeek.Saturday || weekDay == DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Monday || weekDay == DayOfWeek.Tuesday || weekDay == DayOfWeek.Wednesday)
                                {
                                    return currentDay == 6 ? true : false;
                                }
                                else if (weekDay == DayOfWeek.Thursday)
                                {
                                    return currentDay <= 6 && currentDay >= 4 ? true : false;
                                }
                                else
                                {
                                    return currentDay == 4 ? true : false;
                                }
                            }
                            else if (end.ToUpper() == "H")
                            {
                                if (weekDay != DayOfWeek.Saturday && weekDay != DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else if (weekDay == DayOfWeek.Saturday)
                                {
                                    return currentDay == 13 ? true : false;
                                }
                                else
                                {
                                    return currentDay >= 9 && currentDay <= 14 ? true : false;
                                }
                            }
                            else
                            {
                                throw new Exception("时间字符串非法！");
                            }
                        case "L":
                            if (end.ToUpper() == "W")
                            {
                                if (weekDay == DayOfWeek.Saturday || weekDay == DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else
                                {
                                    DateTime nextTime = currentTime.Date.AddDays(1);
                                    return currentTime.Month + 1 == nextTime.Month ? true : false;
                                }
                            }
                            else if (end.ToUpper() == "H")
                            {
                                if (weekDay != DayOfWeek.Saturday && weekDay != DayOfWeek.Sunday)
                                {
                                    return false;
                                }
                                else
                                {
                                    DateTime nextTime = currentTime.Date.AddDays(1);
                                    return currentTime.Month + 1 == nextTime.Month ? true : false;
                                }
                            }
                            else
                            {
                                int endInt = -1;
                                if (int.TryParse(end, out endInt))
                                {
                                    DateTime nextTime = currentTime.Date.AddDays(endInt);
                                    return currentTime.Month + 1 == nextTime.Month ? true : false;
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }
                            }

                        default: throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 周斜杠操作符（'/'）
        /// </summary>
        /// <param name="startTime"></param>
        /// <param name="currentTime"></param>
        /// <param name="expWeek"></param>
        /// <returns></returns>
        public static bool WeekSlashOperation(DateTime startTime, DateTime currentTime, string expWeek)
        {
            try
            {
                int weekSpan = WeekSpan(startTime, currentTime);
                int spanInt = -1;      //递增周数
                int currentInt = -1;  //当前周数
                if (expWeek.Split('/')[0].ToUpper() == "C")
                {
                    if (int.TryParse(expWeek.Split('/')[1], out spanInt))
                    {
                        return weekSpan % spanInt == 0 ? true : false;
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    if (int.TryParse(expWeek.Split('/')[0], out currentInt) && int.TryParse(expWeek.Split('/')[1], out spanInt))
                    {
                        if (GetWeekOfYear(currentTime) >= currentInt && weekSpan % spanInt == 0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 周‘#’操作符
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="currentTime"></param>
        /// <returns></returns>
        public static bool WeekPoundOperation(string start, string end, DateTime currentTime)
        {
            try
            {
                //校验
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
                {
                    int currentDay = currentTime.Day;
                    DayOfWeek dayOfWeek = currentTime.DayOfWeek;
                    switch (start)
                    {
                        case "F":
                            if (GetWeekOfMonth(currentTime) == 1)
                            {
                                if (end.ToUpper() == "W")
                                {
                                    return (int)dayOfWeek >= 1 && (int)dayOfWeek <= 5 ? true : false;
                                }
                                else if (end.ToUpper() == "H")
                                {
                                    return (int)dayOfWeek == 0 || (int)dayOfWeek == 6 ? true : false;
                                }
                                else
                                {
                                    int endInt = -1;
                                    if (int.TryParse(end, out endInt)) //查看周几
                                    {
                                        return endInt == (int)dayOfWeek ? true : false;
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }

                        case "S":
                            if (GetWeekOfMonth(currentTime) == 2)
                            {
                                if (end.ToUpper() == "W")
                                {
                                    return (int)dayOfWeek >= 1 && (int)dayOfWeek <= 5 ? true : false;
                                }
                                else if (end.ToUpper() == "H")
                                {
                                    return (int)dayOfWeek == 0 || (int)dayOfWeek == 6 ? true : false;
                                }
                                else
                                {
                                    int endInt = -1;
                                    if (int.TryParse(end, out endInt)) //查看周几
                                    {
                                        return endInt == (int)dayOfWeek ? true : false;
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        case "T":
                            if (GetWeekOfMonth(currentTime) == 3)
                            {
                                if (end.ToUpper() == "W")
                                {
                                    return (int)dayOfWeek >= 1 && (int)dayOfWeek <= 5 ? true : false;
                                }
                                else if (end.ToUpper() == "H")
                                {
                                    return (int)dayOfWeek == 0 || (int)dayOfWeek == 6 ? true : false;
                                }
                                else
                                {
                                    int endInt = -1;
                                    if (int.TryParse(end, out endInt)) //查看周几
                                    {
                                        return endInt == (int)dayOfWeek ? true : false;
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }

                        case "R":
                            if (GetWeekOfMonth(currentTime) == 4)
                            {
                                if (end.ToUpper() == "W")
                                {
                                    return (int)dayOfWeek >= 1 && (int)dayOfWeek <= 5 ? true : false;
                                }
                                else if (end.ToUpper() == "H")
                                {
                                    return (int)dayOfWeek == 0 || (int)dayOfWeek == 6 ? true : false;
                                }
                                else
                                {
                                    int endInt = -1;
                                    if (int.TryParse(end, out endInt)) //查看周几
                                    {
                                        return endInt == (int)dayOfWeek ? true : false;
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        case "L":
                            if (JudgeMonthLastWeek(currentTime))
                            {
                                if (end.ToUpper() == "W")
                                {
                                    return (int)dayOfWeek >= 1 && (int)dayOfWeek <= 5 ? true : false;
                                }
                                else if (end.ToUpper() == "H")
                                {
                                    return (int)dayOfWeek == 0 || (int)dayOfWeek == 6 ? true : false;
                                }
                                else
                                {
                                    int endInt = -1;
                                    if (int.TryParse(end, out endInt)) //查看周几
                                    {
                                        return endInt == (int)dayOfWeek ? true : false;
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        default: throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 周操作符‘-’（单独使用，周几）
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static bool SingleWeekHyphenOperation(string start, string end, DateTime nowTime)
        {
            try
            {
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
                {
                    int startInt = -1; int endInt = -1;
                    bool startBl = int.TryParse(start, out startInt);
                    bool endBl = int.TryParse(end, out endInt);
                    if (startBl == true && endBl == true)
                    {
                        return (int)nowTime.DayOfWeek >= startInt && (int)nowTime.DayOfWeek <= endInt ? true : false;
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 周操作符‘-’（复合，跟@符号一起，第几周）
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static bool CompositeWeekHyphenOperation(string start, string end, DateTime nowTime)
        {
            try
            {
                if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
                {
                    int startInt = -1; int endInt = -1;
                    bool startBl = int.TryParse(start, out startInt);
                    bool endBl = int.TryParse(end, out endInt);
                    if (startBl == true && endBl == true)
                    {
                        return GetWeekOfMonth(nowTime) >= startInt && GetWeekOfMonth(nowTime) <= endInt ? true : false;
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 周'@'操作符
        /// </summary>
        /// <param name="nowTime"></param>
        /// <param name="startExp"></param>
        /// <param name="endExp"></param>
        /// <returns></returns>
        public static bool AtWeekOperation(DateTime nowTime, DateTime startTime, string startExp, string endExp)
        {
            try
            {
                if (startExp.Contains('-'))
                {
                    if (CompositeWeekHyphenOperation(startExp, endExp, nowTime))
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('/'))
                {
                    if (WeekSlashOperation(startTime, nowTime, startExp))
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('F'))
                {
                    if (GetWeekOfMonth(nowTime) == 1)
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('S'))
                {
                    if (GetWeekOfMonth(nowTime) == 2)
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('T'))
                {
                    if (GetWeekOfMonth(nowTime) == 3)
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('R'))
                {
                    if (GetWeekOfMonth(nowTime) == 4)
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (startExp.Contains('L'))
                {
                    if (JudgeMonthLastWeek(nowTime))
                    {
                        return BeforeAtOperation(endExp, nowTime);
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 周‘@’符号后面字符判断
        /// </summary>
        /// <param name="exp"></param>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static bool BeforeAtOperation(string exp, DateTime nowTime)
        {
            if (exp.Contains('+'))
            {
                bool bl = false;
                string[] endArr = exp.Split('+');
                for (int i = 0; i < endArr.Length; i++)
                {
                    int outInt = -1;
                    if (int.TryParse(endArr[i], out outInt))
                    {
                        if (outInt == (int)nowTime.DayOfWeek)
                        {
                            return true;
                        }
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                return bl;
            }
            else
            {
                int outInt = -1;
                if (int.TryParse(exp, out outInt))
                {
                    return outInt == (int)nowTime.DayOfWeek ? true : false;
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }
            }
        }
        /// <summary>
        /// 两个时间间隔几周
        /// </summary>
        /// <param name="passTime"></param>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static int WeekSpan(DateTime passTime, DateTime nowTime)
        {
            try
            {
                int daySpan = (int)(nowTime.Date - passTime.Date).TotalDays;
                int multi = daySpan / 7;  //取整
                int remainder = daySpan % 7;//取余
                DayOfWeek passDayOfWeek = passTime.DayOfWeek;
                DayOfWeek nowDayOfWeek = nowTime.DayOfWeek;
                if (remainder == 0)
                {
                    return multi;
                }
                else
                {
                    if (passDayOfWeek == DayOfWeek.Sunday)
                    {
                        return multi + 1;
                    }
                    else
                    {
                        if ((int)passDayOfWeek + remainder > 7)
                        {
                            return multi + 1;
                        }
                        else
                        {
                            return multi;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 当天是本年第几周
        /// </summary>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static int GetWeekOfYear(DateTime nowTime)
        {
            //找到第一周的最后一天（先获取1月1日是星期几，从而得知第一周周末是几）
            int firstWeekend = 7 - Convert.ToInt32(DateTime.Parse(nowTime.Year + "-1-1").DayOfWeek);
            //获取今天是一年当中的第几天
            int nowDay = nowTime.DayOfYear;
            //(今天减去第一周周末)/7 等于距第一周多少周  再加上第一周就是今年的第几周
            return Convert.ToUInt16(Math.Ceiling((nowDay - firstWeekend) / 7.0)) + 1;
        }
        /// <summary>
        ///获取当天为本月的第几周（周一至周日 为一周）
        /// </summary>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static int GetWeekOfMonth(DateTime nowTime)
        {
            try
            {
                DateTime firstOfMonth;
                firstOfMonth = Convert.ToDateTime(nowTime.Date.Year + "-" + nowTime.Date.Month + "-" + 1);
                int res = (int)firstOfMonth.Date.DayOfWeek == 0 ? 7 : (int)firstOfMonth.Date.DayOfWeek;
                return (nowTime.Date.Day + res - 2) / 7 + 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 判断当前时间是否是本月最后一周
        /// </summary>
        /// <param name="nowTime"></param>
        /// <returns></returns>
        public static bool JudgeMonthLastWeek(DateTime nowTime)
        {
            try
            {
                int dayOfWeek = (int)nowTime.DayOfWeek;//当前周几
                dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek;
                DateTime futrueTime = nowTime.AddDays(8 - dayOfWeek);
                if (nowTime.Month == 12)
                {
                    return futrueTime.Month == 1 ? true : false;
                }
                else
                {
                    return futrueTime.Month == nowTime.Month + 1 ? true : false;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 计划任务时间表达式反向解析
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static ShowCronTimeModel ExplainScheduleCron(string expression)
        {
            try
            {
                if (string.IsNullOrEmpty(expression) || expression == "")
                {
                    ShowCronTimeModel model = new ShowCronTimeModel();
                    model.pType = 0;
                    model.describe = "单次";
                    return model;
                }
                else
                {
                    if (expression.Contains('|') && expression.Split('|').Length == 4)
                    {
                        string[] expArr = expression.Split('|');
                        if (expArr[2].Contains('*'))//当为所有年的时候
                        {
                            if (expArr[1].Contains('*'))  //当为所有月的时候
                            {

                                if (expArr[3].Contains('?')) //当为天
                                {
                                    #region  天
                                    ShowCronTimeModel model = new ShowCronTimeModel();
                                    model.pType = 1;
                                    if (expArr[0].Contains('/'))
                                    {
                                        int daySpan = int.Parse(expArr[0].Split('/')[1]);
                                        model.span = daySpan;
                                        model.describe = "每隔" + daySpan + "天";
                                        model.cType = 1;
                                    }
                                    else if (expArr[0].ToUpper() == "W")
                                    {
                                        model.cType = 2;
                                        model.describe = "工作日";
                                    }
                                    else if (expArr[0].ToUpper() == "H")
                                    {
                                        model.cType = 3;
                                        model.describe = "周末";
                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }
                                    return model;

                                    #endregion
                                }
                                else if (expArr[0].Contains('?'))//当为周
                                {
                                    #region  周
                                    int weekSpan;
                                    string[] weekArr;
                                    string splice = "";
                                    ShowCronTimeModel model = new ShowCronTimeModel();
                                    model.pType = 2;
                                    model.cType = 1;
                                    if (expArr[3].Contains('@'))
                                    {
                                        string headWeek = expArr[3].Split('@')[0];
                                        string backWeek = expArr[3].Split('@')[1];
                                        if (headWeek.Contains('/'))
                                        {
                                            weekSpan = int.Parse(headWeek.Split('/')[1]);
                                        }
                                        else
                                        {
                                            throw new Exception("时间字符串非法！");
                                        }
                                        if (backWeek.Length > 1 && backWeek.Contains('+'))
                                        {
                                            weekArr = backWeek.Split('+');
                                        }
                                        else if (backWeek.Length == 1)
                                        {
                                            weekArr = new string[] { backWeek };
                                        }
                                        else
                                        {
                                            throw new Exception("时间字符串非法！");
                                        }
                                        model.span = weekSpan;
                                        model.weekDayArray = Array.ConvertAll<string, int>(weekArr, n => int.Parse(n));
                                        #region 拼接表达式字符串
                                        for (int i = 0; i < weekArr.Length; i++)
                                        {
                                            switch (weekArr[i])
                                            {
                                                case "0": splice += "周日"; break;
                                                case "1": splice += "周一"; break;
                                                case "2": splice += "周二"; break;
                                                case "3": splice += "周三"; break;
                                                case "4": splice += "周四"; break;
                                                case "5": splice += "周五"; break;
                                                case "6": splice += "周六"; break;
                                                default: break;
                                            }
                                            if (i != weekArr.Length - 1)
                                            {
                                                splice += ",";
                                            }
                                        }
                                        #endregion
                                        model.describe = "每隔" + weekSpan + "周的" + splice;
                                        return model;

                                    }
                                    else
                                    {
                                        throw new Exception("时间字符串非法！");
                                    }

                                    #endregion
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }
                            }
                            else
                            {
                                #region 月
                                if (expArr[1].Contains('/'))
                                {

                                    #region
                                    //if (expArr[3].Contains('?')) //当为天
                                    //{
                                    //    int desc = 1;
                                    //    int week = 1;
                                    //    if (expArr[3].Contains('#'))
                                    //    {
                                    //        string sign = expArr[3].Split('#')[0];
                                    //        string weekTime = expArr[3].Split('#')[1];
                                    //        switch (sign)
                                    //        {
                                    //            case "F": desc = 1; break;
                                    //            case "S": desc = 2; break;
                                    //            case "T": desc = 3; break;
                                    //            case "R": desc = 4; break;
                                    //            case "L": desc = 5; break;
                                    //            default: throw new Exception("时间字符串非法！");
                                    //        }
                                    //        switch (sign.ToUpper())
                                    //        {
                                    //            case "0": week = 1; break;
                                    //            case "1": week = 2; break;
                                    //            case "2": week = 3; break;
                                    //            case "3": week = 4; break;
                                    //            case "4": week = 5; break;
                                    //            case "5": week = 6; break;
                                    //            case "6": week = 7; break;
                                    //            case "W": week = 8; break;
                                    //            case "H": week = 9; break;
                                    //            default: throw new Exception("时间字符串非法！");
                                    //        }
                                    //    }
                                    //}
                                    //else if (expArr[0].Contains('?'))//当为周
                                    //{
                                    //    if (expArr[0].Contains('#'))
                                    //    {
                                    //        int desc = 1;
                                    //        string sign = expArr[0].Split('#')[0];
                                    //        string dayTime = expArr[0].Split('#')[1];
                                    //        switch (sign)
                                    //        {
                                    //            case "F": desc = 1; break;
                                    //            case "L": desc = 5; break;
                                    //            default: throw new Exception("时间字符串非法！");
                                    //        }
                                    //    }
                                    //    else
                                    //    {
                                    //        throw new Exception("时间字符串非法！");
                                    //    }
                                    //}
                                    //else
                                    //{
                                    //    throw new Exception("时间字符串非法！");
                                    //}

                                    #endregion
                                    int monthSpan = int.Parse(expArr[1].Split('/')[1]);  //获取间隔周期
                                    ShowCronTimeModel model = new ShowCronTimeModel();
                                    model.pType = 3;
                                    model.span = monthSpan;
                                    model.describe = "每隔" + monthSpan + "月";
                                    ExplainDayOfYearOrMonth(expArr[0], expArr[3], ref model);
                                    return model;
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }
                                #endregion
                            }
                        }
                        else
                        {
                            #region 年
                            if (expArr[2].Contains('/'))
                            {
                                int yearSpan = int.Parse(expArr[2].Split('/')[1]);  //获取间隔周期
                                int month = int.Parse(expArr[1]);//获取月份
                                ShowCronTimeModel model = new ShowCronTimeModel();
                                model.pType = 4;
                                model.span = yearSpan;
                                model.time = month;
                                model.describe = "每隔" + yearSpan + "年的" + month + "月";
                                ExplainDayOfYearOrMonth(expArr[0], expArr[3], ref model);
                                return model;
                            }
                            else
                            {
                                throw new Exception("时间字符串非法！");
                            }
                            #endregion

                        }
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 解析周和日
        /// </summary>
        /// <param name="dayExp"></param>
        /// <param name="weekExp"></param>
        /// <param name="model"></param>
        public static void ExplainDayOfYearOrMonth(string dayExp, string weekExp, ref ShowCronTimeModel model)
        {
            try
            {
                if (dayExp.Contains('?'))
                {
                    if (weekExp.Contains('#'))
                    {
                        model.cType = 2;  //周有值
                        string sign = weekExp.Split('#')[0];
                        string weekTime = weekExp.Split('#')[1];
                        switch (sign.ToUpper())
                        {
                            case "F": model.order = 1; model.describe += " 第一个"; break;
                            case "S": model.order = 2; model.describe += " 第二个"; break;
                            case "T": model.order = 3; model.describe += " 第三个"; break;
                            case "R": model.order = 4; model.describe += " 第四个"; break;
                            case "L": model.order = 5; model.describe += " 最后一个"; break;
                            default: throw new Exception("时间字符串非法！");
                        }
                        switch (weekTime.ToUpper())
                        {
                            case "0": model.week = 0; model.describe += "周日"; break;
                            case "1": model.week = 1; model.describe += "周一"; break;
                            case "2": model.week = 2; model.describe += "周二"; break;
                            case "3": model.week = 3; model.describe += "周三"; break;
                            case "4": model.week = 4; model.describe += "周四"; break;
                            case "5": model.week = 5; model.describe += "周五"; break;
                            case "6": model.week = 6; model.describe += "周六"; break;
                            case "W": model.week = 7; model.describe += "工作日(周一到周五)"; break;
                            case "H": model.week = 8; model.describe += "周末"; break;
                            default: throw new Exception("时间字符串非法！");
                        }
                    }
                }
                else if (weekExp.Contains('?'))
                {
                    if (dayExp.Contains('#'))
                    {
                        model.cType = 1;  //天有值
                        string sign = dayExp.Split('#')[0];
                        string dayTime = dayExp.Split('#')[1];
                        model.week = int.Parse(dayTime);//第几天
                        switch (sign.ToUpper())
                        {
                            case "F": model.order = 1; model.describe += "第"; break;
                            case "L": model.order = 5; model.describe += "月末第"; break;
                            default: throw new Exception("时间字符串非法！");
                        }
                        model.describe += dayTime + "天";
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else
                {
                    throw new Exception("时间字符串非法！");
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
