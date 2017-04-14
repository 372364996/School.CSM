using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace CSM.Common
{
    public class OperationXML
    {
        /// <summary>
        /// 读取XML
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="nodeID"></param>
        /// <returns></returns>
        public string ReadXml(string filePath, string nodeID)
        {
            XmlDocument doc = new XmlDocument();
            string xmlNode = "";
            try
            {
                doc.Load(filePath);
                XmlNode root = doc.SelectSingleNode("root");
                xmlNode = root.SelectNodes("//Setting[@id='" + nodeID + "']")[0].InnerText;
            }
            catch (Exception)
            {

                throw;
            }

            return xmlNode;
        }
        /// <summary>
        /// 写XML
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="nodeID"></param>
        /// <param name="nodeValue"></param>
        /// <returns></returns>
        public bool WriteXml(string filePath, string nodeID, string nodeValue)
        {
            bool result = false;
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(filePath);
                XmlNode root = doc.SelectSingleNode("root");
                root.SelectNodes("//Setting[@id='" + nodeID + "']")[0].InnerText = nodeValue;
                doc.Save(filePath);
                result = true;
            }
            catch (Exception)
            {
                throw;//log
            }
            return result;
        }
    }
}
