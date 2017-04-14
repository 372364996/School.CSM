using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Utils
{
    public class JsonHelper
    {
        /// <summary>
        /// 序列化对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string ObjectToString<T>(T t) where T:new()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(t); 
        }
        /// <summary>
        ///反序列化
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="str"></param>
        /// <returns></returns>
        public static T StringToObject<T>(string str)
        {
            try
            {
                if (!string.IsNullOrEmpty(str))
                {
                    return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(str);
                }
                else
                {
                    return default(T);
                }
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("反序列化失败！数据体：" + str + " 错误：" + ex.Message);
                return default(T);
            }
        }
        /// <summary>
        /// 转换JObject
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="jobj"></param>
        /// <returns></returns>
        public static T JObjectToObject<T>(JObject jobj)
        {
            try
            {
                return jobj.ToObject<T>();
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("将JObject转换为指定类型失败！"+ex.Message);
                return default(T);
            }
        }
    }
}
