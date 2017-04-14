using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace CSM.Utils
{
    public class SSOTools
    {
        static string ssoIp = System.Configuration.ConfigurationManager.AppSettings["SSOServerIP"];
        /// <summary>
        /// 获取带令牌请求的URL(Passport服务器)
        /// 在当前URL中附加上令牌请求参数
        /// </summary>
        /// <returns></returns>
        public static string TokenUrl()
        {
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            Regex reg = new Regex(@"^.*\?.+=.+$");
            if (reg.IsMatch(url))
                url += "&token=$token$";
            else
                url += "?token=$token$";
            //string DomainName = System.Configuration.ConfigurationManager.AppSettings["DomainName"].ToString();
            //string ReturnUrl=
            //  return "http://192.168.6.239:9002/gettoken.aspx?backurl=" + System.Web.HttpUtility.UrlEncode(url);
            return "http://"+ ssoIp + "/gettoken.aspx?backurl=" + System.Web.HttpUtility.UrlEncode(url);
        }

        /// <summary>
        /// 去掉backurl中的令牌
        /// 并返回passport登录地址
        /// </summary>
        /// <returns></returns>
        public static string TokenReplace()
        {
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            url = Regex.Replace(url, @"(\?|&)Token=.*", "", RegexOptions.IgnoreCase);
            return "/Login/Login?backurl=" + System.Web.HttpUtility.UrlEncode(url);
        }

        public static string EnAes(string plainText)
        {
            byte[] key = new byte[32] { 22, 22, 22, 22, 33, 33, 33, 33, 44, 44, 44, 44, 55, 55, 55, 55, 66, 97, 45, 81, 85, 192, 67, 58, 185, 198, 33, 72, 153, 52, 76, 29 };
            byte[] iv = new byte[16] { 55, 55, 33, 44, 66, 66, 185, 47, 90, 109, 74, 58, 185, 168, 33, 72 };
            return Convert.ToBase64String(enAes(plainText, key, iv));
        }

        public static string DeAes(string cipherText)
        {
            byte[] key = new byte[32] { 22, 22, 22, 22, 33, 33, 33, 33, 44, 44, 44, 44, 55, 55, 55, 55, 66, 97, 45, 81, 85, 192, 67, 58, 185, 198, 33, 72, 153, 52, 76, 29 };
            byte[] iv = new byte[16] { 55, 55, 33, 44, 66, 66, 185, 47, 90, 109, 74, 58, 185, 168, 33, 72 };
            return deAes(Convert.FromBase64String(cipherText), key, iv);
        }

        private static byte[] enAes(string plainText, byte[] key, byte[] iv)
        {
            if (plainText == null || plainText.Length <= 0)
                throw new ArgumentNullException("plainText");
            if (key == null || key.Length <= 0)
                throw new ArgumentNullException("key");
            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException("iv");
            MemoryStream msEncrypt = null;
            CryptoStream csEncrypt = null;
            StreamWriter swEncrypt = null;
            Aes aesAlg = null;
            try
            {
                aesAlg = Aes.Create();
                aesAlg.Key = key;
                aesAlg.IV = iv;
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
                msEncrypt = new MemoryStream();
                csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
                swEncrypt = new StreamWriter(csEncrypt);
                swEncrypt.Write(plainText);
            }
            finally
            {
                if (swEncrypt != null)
                    swEncrypt.Close();
                if (csEncrypt != null)
                    csEncrypt.Close();
                if (msEncrypt != null)
                    msEncrypt.Close();
                if (aesAlg != null)
                    aesAlg.Clear();
            }
            return msEncrypt.ToArray();
        }

        private static string deAes(byte[] cipherText, byte[] key, byte[] iv)
        {
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException("cipherText");
            if (key == null || key.Length <= 0)
                throw new ArgumentNullException("key");
            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException("iv");
            MemoryStream msDecrypt = null;
            CryptoStream csDecrypt = null;
            StreamReader srDecrypt = null;
            Aes aesAlg = null;
            string plaintext = null;
            try
            {
                aesAlg = Aes.Create();
                aesAlg.Key = key;
                aesAlg.IV = iv;
                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                msDecrypt = new MemoryStream(cipherText);
                csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
                srDecrypt = new StreamReader(csDecrypt);
                plaintext = srDecrypt.ReadToEnd();
            }
            finally
            {
                if (srDecrypt != null)
                    srDecrypt.Close();
                if (csDecrypt != null)
                    csDecrypt.Close();
                if (msDecrypt != null)
                    msDecrypt.Close();
                if (aesAlg != null)
                    aesAlg.Clear();
            }
            return plaintext;
        }
    }
}
