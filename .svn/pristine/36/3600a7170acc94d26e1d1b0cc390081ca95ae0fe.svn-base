using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Utils
{
    public class HttpHelper
    {
        private static object obj = new object();
        private static CookieContainer cookie = new CookieContainer();

        public static string HttpPost(string Url, string postDataStr)
        {
            string retString = "";
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = Encoding.UTF8.GetByteCount(postDataStr);
                request.CookieContainer = cookie;
                Stream myRequestStream = request.GetRequestStream();
                //StreamWriter myStreamWriter = new StreamWriter(myRequestStream, Encoding.GetEncoding("gb2312"));
                StreamWriter myStreamWriter = new StreamWriter(myRequestStream, Encoding.GetEncoding("gb2312"));
                myStreamWriter.Write(postDataStr);
                myStreamWriter.Close();

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();

                response.Cookies = cookie.GetCookies(response.ResponseUri);
                Stream myResponseStream = response.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
                retString = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                myResponseStream.Close();
            }
            catch
            {
            }
            return retString;
        }
        /// <summary>
        /// 发送json数据（UTF-8）
        /// </summary>
        /// <param name="postUrl"></param>
        /// <param name="paramData"></param>
        /// <param name="dataEncode"></param>
        public static void PostJsonData(string postUrl, string paramData, Encoding dataEncode)
        {
            PostWebRequest(postUrl, paramData, "application/json;charset=utf-8", dataEncode);
        }

        /// <summary>
        /// http  post发送
        /// </summary>
        /// <param name="postUrl">post地址</param>
        /// <param name="paramData">post数据</param>
        /// <param name="contenttype">post格式</param>
        /// <param name="dataEncode">编码格式</param>
        /// <returns></returns>
        public static string PostWebRequest(string postUrl, string paramData, string contenttype, Encoding dataEncode)
        {
            string ret = string.Empty;
            HttpWebRequest webReq = null;
            HttpWebResponse response = null;
            StreamReader sr = null;
            Stream newStream = null;
            try
            {
                byte[] byteArray = dataEncode.GetBytes(paramData); //转化
                webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                webReq.ContentType = contenttype;
                webReq.ContentLength = byteArray.Length;
                webReq.KeepAlive = false;
                newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入数据流
                newStream.Close();
                response = (HttpWebResponse)webReq.GetResponse();
                sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                // log4nethelp.Log4Logger.Info("POST数据:" + paramData + "至:" + postUrl + "成功! ");
                Log4NetHelp.Info("POST数据:" + paramData + "至:" + postUrl + "成功! ");
            }
            catch (Exception ex)
            {
                //log4nethelp.Log4Logger.Error("POST数据:" + paramData + "至:" + postUrl + "失败! " + ex.Message.ToString());
                Log4NetHelp.Error("POST数据:" + paramData + "至:" + postUrl + "失败! " + ex.Message.ToString());
            }
            finally
            {
                if (webReq != null)
                {
                    webReq.Abort();
                }
                if (sr != null)
                {
                    sr.Close();
                }
                if (response != null)
                {
                    response.Close();
                }
                if (newStream != null)
                {
                    newStream.Close();
                }
            }
            return ret;
        }
        /// <summary>
        /// http  post发送，带抛出异常
        /// </summary>
        /// <param name="postUrl">post地址</param>
        /// <param name="paramData">post数据</param>
        /// <param name="contenttype">post格式</param>
        /// <param name="dataEncode">编码格式</param>
        /// <returns></returns>
        public static string PostWebRequestBandError(string postUrl, string paramData, string contenttype, Encoding dataEncode)
        {
            string ret = string.Empty;
            HttpWebRequest webReq = null;
            HttpWebResponse response = null;
            StreamReader sr = null;
            Stream newStream = null;
            try
            {
                byte[] byteArray = dataEncode.GetBytes(paramData); //转化
                webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                //webReq.Timeout = 3000;
                webReq.Method = "POST";
                webReq.ContentType = contenttype;
                webReq.ContentLength = byteArray.Length;
                webReq.KeepAlive = false;
                newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入数据流
                newStream.Close();
                response = (HttpWebResponse)webReq.GetResponse();
                sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                // log4nethelp.Log4Logger.Info("POST数据:" + paramData + "至:" + postUrl + "成功! ");
                Log4NetHelp.Info("POST数据:" + paramData + "至:" + postUrl + "成功! 返回信息:" + ret);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (webReq != null)
                {
                    webReq.Abort();
                }
                if (sr != null)
                {
                    sr.Close();
                }
                if (response != null)
                {
                    response.Close();
                }
                if (newStream != null)
                {
                    newStream.Close();
                }
            }
            return ret;
        }
        /// <summary>
        /// http加锁post发送
        /// </summary>
        /// <param name="postUrl">post地址</param>
        /// <param name="paramData">post数据</param>
        /// <param name="contenttype">post格式</param>
        /// <param name="dataEncode">编码格式</param>
        /// <returns></returns>
        public static string PostWebRequestLock(string postUrl, string paramData, string contenttype, Encoding dataEncode)
        {
            string ret = string.Empty;
            lock (obj)
            {
                ret = PostWebRequest(postUrl, paramData, contenttype, dataEncode);
            }
            return ret;
        }
        /// <summary>
        /// http  get请求
        /// </summary>
        /// <param name="Url">地址</param>
        /// <param name="postDataStr">请求数据</param>
        /// <param name="contenttype">格式(text/html;charset=UTF-8或application/json;charset=utf-8)</param>
        /// <returns></returns>
        public static string HttpGet(string Url, string postDataStr, string contenttype)
        {
            string retString = "";

            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
                request.Method = "GET";
                request.ContentType = contenttype;// "text/html;charset=UTF-8";

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream myResponseStream = response.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
                retString = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                myResponseStream.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retString;
        }
    }
}
