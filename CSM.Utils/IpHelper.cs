using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net;

namespace CSM.Utils
{
    /// <summary>
    /// IP查询
    /// </summary>
    public class IPHelper
    {
       
        public static string GetClientIPv4()
        {
            string ipv4 = String.Empty;
            foreach (IPAddress ip in Dns.GetHostAddresses(GetClientIP()))
            {
                if (ip.AddressFamily.ToString() == "InterNetwork")
                {
                    ipv4 = ip.ToString();
                    break;
                }
            }
            if (ipv4 != String.Empty)
            {
                return ipv4;
            }
            // 原代码使用 Dns.GetHostName 方法取回的是 Server 端资料，非 Client 端。 
            // 改为利用 Dns.GetHostEntry 方法，由获取的 IPv6 位址反查 DNS 记录， 
            // 再逐一判断是否属于 IPv4 协议定，如果是转换为 IPv4 地址。 
            foreach (IPAddress ip in Dns.GetHostEntry(GetClientIP()).AddressList)
            //foreach (IPAddress ip in Dns.GetHostAddresses(Dns.GetHostName())) 
            {
                if (ip.AddressFamily.ToString() == "InterNetwork")
                {
                    ipv4 = ip.ToString();
                    break;
                }
            }
            return ipv4;
        }

        /// 取得客戶端主机地址 
        /// </summary> 
        public static string GetClientIP()
        {
            if (null != HttpContext.Current.Request.ServerVariables["HTTP_VIA"])
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
            else
            {
                return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
        }
   
    }
}
