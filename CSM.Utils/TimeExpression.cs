using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Common;
using static CSM.Common.EnumClass;
using CSM.Model.CustomModel;

namespace CSM.Utils
{
    public class TimeExpression
    {


        #region  旧版
        /// <summary>
        /// 将时间转化为时间表达式
        /// </summary>
        /// <param name="dt">第一次执行时间</param>
        /// <param name="timeType">频率类型</param>
        /// <param name="frequency">频率</param>
        /// <returns></returns>
        public static string ToTimeExpression(DateTime dt, int timeType, int frequency)
        {
            StringBuilder builder = new StringBuilder();
            string second = dt.Second.ToString();
            string minute = dt.Minute.ToString();
            string hour = dt.Hour.ToString();
            string day = dt.Day.ToString();
            string month = dt.Month.ToString();
            string year = dt.Year.ToString(); ;
            string week = (dt.DayOfWeek + 1).ToString();//cron表达式周日-周六：1-7
            try
            {
                switch (timeType)
                {
                    case (int)TimeFrequencyType.小时: hour = "*/" + frequency.ToString(); return second + " " + minute + " " + hour + " " + "* * ?";
                    case (int)TimeFrequencyType.天: day = "*/" + frequency.ToString(); return second + " " + minute + " " + hour + " " + day + " * ?";
                    case (int)TimeFrequencyType.月: month = "*/" + frequency.ToString(); return second + " " + minute + " " + hour + " " + day + " " + month + " ?";
                    case (int)TimeFrequencyType.年: year = "*/" + frequency.ToString(); return second + " " + minute + " " + hour + " " + day + " " + month + " ? " + year;
                    case (int)TimeFrequencyType.周: day = "*/" + (7 * frequency).ToString(); return second + " " + minute + " " + hour + " " + day + " * ?";//周按照7天算
                                                                                                                                                           // case TimeFrequencyType.周: week = "*/" + frequency.ToString(); return second + " " + minute + " " + hour + " " + "?" + " * * "+week;
                    case (int)TimeFrequencyType.无: return second + " " + minute + " " + hour + " " + day + " " + month + " ? " + year;
                    default: return second + " " + minute + " " + hour + " " + day + " " + month + " ? " + year;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 将时间表达式转化为时间类
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static CronExpTime ToTimeModel(string expression)
        {
            bool flag = false;
            CronExpTime model = new CronExpTime();
            try
            {
                string[] expArr = expression.Split(' ');
                for (int i = 0; i < expArr.Length; i++)
                {
                    if (expArr[i].Contains("/"))
                    {
                        model.timeType = i - 1;
                        model.frequency = int.Parse(expArr[i].Split('/')[1]);
                        //如果频率为天，需判断是否是以周为单位
                        if (model.timeType == (int)TimeFrequencyType.天)
                        {
                            if (model.frequency % 7 == 0)
                            {
                                model.timeType = (int)TimeFrequencyType.周;
                                model.frequency = model.frequency / 7;
                            }
                        }
                        flag = true;
                        break;
                    }
                }
                if (flag == false)
                {
                    model.timeType = (int)TimeFrequencyType.无;
                    model.frequency = 0;
                }
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion


        #region  新版
        /// <summary>
        /// 判断时间点是否在时间表达式范围内
        /// </summary>
        /// <param name="time">当前时间</param>
        /// <param name="startTime">开始时间</param>
        /// <param name="expression">日|月|年|周</param>
        /// <returns></returns>
        public static  bool TimePointIsExistSpan(DateTime time, DateTime startTime, string expression)
        {
            try
            {
                int checkYear = time.Year;
                int checkMonth = time.Month;
                int checkDAY = time.Day;
                if (string.IsNullOrEmpty(expression))
                {
                    return false;
                }
                else if (expression.Contains('|'))
                {
                    string[] expArr = expression.Split('|');
                    //校验表达式正确性
                    if (expArr.Length != 4 && !expression.Contains("?"))
                    {
                        return false;
                    }
                    //校验年份
                    bool yearBl = CheckYearOrMonth(checkYear, expArr[2]);
                    if (yearBl == true)
                    {
                        //校验月份
                        bool monthBl = CheckYearOrMonth(checkMonth, expArr[1]);
                        if (monthBl == true)
                        {
                            //校验日期
                            return CheckDay(time, startTime, expArr[0], expArr[3]);
                        }
                        else
                        {
                            return false;
                        }
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
        /// 校验年份或者月份是否在表达式范围内
        /// </summary>
        /// <param name="year"></param>
        /// <param name="yearExp"></param>
        /// <returns></returns>
        public static  bool CheckYearOrMonth(int needCheckNum, string expression)
        {
            try
            {
                //需正则匹配字符串是否合理
                /* string reg = @"^\d"; */ //正则表达式
                                           //if (Regex.IsMatch(expression, reg, RegexOptions.IgnoreCase))
                                           //{
                                           //判断年是否是'*'
                if (expression.Contains("*"))
                {
                    return true;
                }
                //判断是否包含','
                else if (expression.Contains(','))
                {
                    bool bl = false;
                    string[] strArr = expression.Split(',');   // int[] intArray = Array.ConvertAll<string, int>(strArr, s => int.Parse(s));
                    for (int i = 0; i < strArr.Length; i++)
                    {
                        if (string.IsNullOrEmpty(strArr[i]))
                        {
                            throw new Exception("时间字符串非法！");
                        }
                        else
                        {
                            if (strArr[i].Contains('/'))
                            {
                                int startNum = -1; int multiNum = -1;
                                if (int.TryParse(strArr[i].Split('/')[0], out startNum) && int.TryParse(strArr[i].Split('/')[1], out multiNum))
                                {
                                    if ((needCheckNum - startNum) % multiNum == 0)
                                    {
                                        return true;
                                    }
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }
                            }
                            else if (strArr[i].Contains('-'))
                            {
                                int startNum = -1; int endNum = -1;
                                if (int.TryParse(strArr[i].Split('-')[0], out startNum) && int.TryParse(strArr[i].Split('-')[1], out endNum))
                                {
                                    if (needCheckNum >= startNum && needCheckNum <= endNum)
                                    {
                                        return true;
                                    }
                                }
                                else
                                {
                                    throw new Exception("时间字符串非法！");
                                }

                            }
                            else if (expression == needCheckNum.ToString())
                            {
                                return true;
                            }
                        }
                    }
                    return bl;
                }
                //判断是否包含'/'
                else if (expression.Contains('/'))
                {
                    int startNum = -1; int multiNum = -1;
                    if (int.TryParse(expression.Split('/')[0], out startNum) && int.TryParse(expression.Split('/')[1], out multiNum))
                    {
                        return (needCheckNum - startNum) % multiNum == 0 ? true : false;
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                //判断年是否包含'-'
                else if (expression.Contains("-"))
                {
                    int startNum = -1; int endNum = -1;
                    if (int.TryParse(expression.Split('-')[0], out startNum) && int.TryParse(expression.Split('-')[1], out endNum))
                    {
                        return needCheckNum >= startNum && needCheckNum <= endNum ? true : false;
                    }
                    else
                    {
                        throw new Exception("时间字符串非法！");
                    }
                }
                else if (expression == needCheckNum.ToString())
                {
                    return true;
                }
                else
                {
                    return false;
                }
                //}
                //else
                //{
                //    throw new Exception("时间字符串非法！");
                //}

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 校验天是否在表达式范围内
        /// </summary>
        /// <param name="needCheckDay"></param>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static  bool CheckDay(DateTime currentTime, DateTime startTime, string expDay, string expWeek)
        {
            try
            {
                //校验expDay表达式

                //校验expWeek表达式


                //如果周包含'?',则去分析天
                if (expWeek == "?")
                {
                    if (expDay.Contains('*'))
                    {
                        return true;
                    }
                    else if (expDay.Contains(','))
                    {
                        bool retBl = false;
                        string[] superDayArr = expDay.Split(',');//一级日期数组表达式
                        for (int i = 0; i < superDayArr.Length; i++)
                        {
                            if (string.IsNullOrEmpty(superDayArr[i]))
                            { throw new Exception("时间字符串非法！"); }
                            else
                            {
                                if (superDayArr[i].Contains('#'))
                                {
                                    if (TimeOperation.DayPoundOperation(superDayArr[i].Split('#')[0], superDayArr[i].Split('#')[1], currentTime))
                                    {
                                        return true;
                                    }
                                }
                                else if (superDayArr[i].Contains('/'))
                                {
                                    if (TimeOperation.DaysSlashOperation(currentTime, startTime, superDayArr[i].Split('/')[0], superDayArr[i].Split('/')[1]))
                                    {
                                        return true;
                                    }
                                }
                                else if (superDayArr[i].Contains('-'))
                                {
                                    if (TimeOperation.DayHyphenOperation(superDayArr[i].Split('-')[0], superDayArr[i].Split('-')[1], currentTime.Day))
                                    {
                                        return true;
                                    }
                                }
                                else if (superDayArr[i] == currentTime.Day.ToString())
                                {
                                    return true;
                                }
                            }
                        }
                        return retBl;
                    }
                    else if (expDay.Contains('#'))
                    {
                        return TimeOperation.DayPoundOperation(expDay.Split('#')[0], expDay.Split('#')[1], currentTime);
                    }
                    else if (expDay.Contains('/'))
                    {
                        return TimeOperation.DaysSlashOperation(currentTime, startTime, expDay.Split('/')[0], expDay.Split('/')[1]);
                    }
                    else if (expDay.Contains('-'))
                    {
                        return TimeOperation.DayHyphenOperation(expDay.Split('-')[0], expDay.Split('-')[1], currentTime.Day);
                    }
                    else if (expDay == "W")//工作日
                    {
                        return (int)currentTime.DayOfWeek >= 1 && (int)currentTime.DayOfWeek <= 5 ? true : false;
                    }
                    else if (expDay == "H")//周末
                    {
                        return (int)currentTime.DayOfWeek == 0 || (int)currentTime.DayOfWeek == 6 ? true : false;
                    }
                    else if (expDay == currentTime.Day.ToString())
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                //如果天包含'?',则去分析周(周日：0，周一到周六：1->6）
                else if (expDay == "?")
                {
                    int dayOfWeek = (int)currentTime.DayOfWeek;  //获取当天是周几
                    if (expWeek.Contains('*'))
                    {
                        return true;
                    }
                    else if (expWeek.Contains(','))
                    {
                        bool bl = false;
                        string[] expWeekArr = expWeek.Split(',');
                        for (int i = 0; i < expWeekArr.Length; i++)
                        {
                            if (expWeekArr[i].Contains('@'))
                            {
                                if (TimeOperation.AtWeekOperation(currentTime, startTime, expWeekArr[i].Split('@')[0], expWeekArr[i].Split('@')[1]))
                                {
                                    return true;
                                }
                            }
                            else if (expWeekArr[i].Contains('#'))
                            {
                                if (TimeOperation.WeekPoundOperation(expWeekArr[i].Split('#')[0], expWeekArr[i].Split('#')[1], currentTime))
                                {
                                    return true;
                                }
                            }
                            else if (expWeekArr[i].Contains('/'))
                            {
                                if (TimeOperation.WeekSlashOperation(startTime, currentTime, expWeekArr[i]))
                                {
                                    return true;
                                }
                            }
                            else if (expWeekArr[i].Contains('-'))
                            {
                                if (TimeOperation.SingleWeekHyphenOperation(expWeekArr[i].Split('-')[0], expWeekArr[i].Split('-')[1], currentTime))
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "W")//工作日
                            {
                                if (dayOfWeek >= 1 && dayOfWeek <= 5)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "H")//周末
                            {
                                if (dayOfWeek == 0 || dayOfWeek == 6)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "F")
                            {
                                if (TimeOperation.GetWeekOfMonth(currentTime) == 1)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "S")
                            {
                                if (TimeOperation.GetWeekOfMonth(currentTime) == 2)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "T")
                            {
                                if (TimeOperation.GetWeekOfMonth(currentTime) == 3)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "R")
                            {
                                if (TimeOperation.GetWeekOfMonth(currentTime) == 4)
                                {
                                    return true;
                                }
                            }
                            else if (expWeek == "L")
                            {
                                if (TimeOperation.JudgeMonthLastWeek(currentTime))
                                {
                                    return true;
                                }
                            }
                        }
                        return bl;
                    }
                    else if (expWeek.Contains('@'))
                    {
                        return TimeOperation.AtWeekOperation(currentTime, startTime, expWeek.Split('@')[0], expWeek.Split('@')[1]);
                    }
                    else if (expWeek.Contains('#'))
                    {
                        return TimeOperation.WeekPoundOperation(expWeek.Split('#')[0], expWeek.Split('#')[1], currentTime);
                    }
                    else if (expWeek.Contains('/'))  //间隔几周,此时月份应为*
                    {
                        return TimeOperation.WeekSlashOperation(startTime, currentTime, expWeek);
                    }
                    else if (expWeek.Contains('-'))  //从周几到周几
                    {
                        return TimeOperation.SingleWeekHyphenOperation(expWeek.Split('-')[0], expWeek.Split('-')[1], currentTime);
                    }
                    else if (expWeek == "W")//工作日
                    {
                        return dayOfWeek >= 1 && dayOfWeek <= 5 ? true : false;
                    }
                    else if (expWeek == "H")//周末
                    {
                        return dayOfWeek == 0 || dayOfWeek == 6 ? true : false;
                    }
                    else if (expWeek == "F")
                    {
                        return TimeOperation.GetWeekOfMonth(currentTime) == 1 ? true : false;
                    }
                    else if (expWeek == "S")
                    {
                        return TimeOperation.GetWeekOfMonth(currentTime) == 2 ? true : false;
                    }
                    else if (expWeek == "T")
                    {
                        return TimeOperation.GetWeekOfMonth(currentTime) == 3 ? true : false;
                    }
                    else if (expWeek == "R")
                    {
                        return TimeOperation.GetWeekOfMonth(currentTime) == 4 ? true : false;
                    }
                    else if (expWeek == "L")
                    {
                        return TimeOperation.JudgeMonthLastWeek(currentTime);
                    }
                    else   //单个周几
                    {
                        int weekInt = -1;
                        if (int.TryParse(expWeek, out weekInt))
                        {
                            return weekInt == dayOfWeek ? true : false;
                        }
                        else
                        {
                            throw new Exception("时间字符串非法！");
                        }
                    }

                }
                //如果天，周都未包含‘?’,表示错误
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
        /// 将cron时间表达式初步解析
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static  ShowCronTimeModel GetCronTimeModel(string expression)
        {
            try
            {
                return TimeOperation.ExplainScheduleCron(expression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion
    }

}
