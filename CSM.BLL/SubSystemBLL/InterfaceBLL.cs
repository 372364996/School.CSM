
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace CSM.BLL.SubSystemBLL
{
    public class InterfaceBLL
    {
        private delegate void TransSendData(string url, string data, Encoding datacode);    //定义委托
        private TransSendData SendData = new TransSendData(CSM.Utils.HttpHelper.PostJsonData); //委托实例化
        /// <summary>
        /// 获取转发路由
        /// </summary>
        /// <returns></returns>
        public List<InterfaceRouteModel> GetInterfaceRoute()
        {
            List<InterfaceRouteModel> routeList = new List<InterfaceRouteModel>();
            InterfaceRouteModel routeModel = null;
            try
            {
                string myXmlFilePath = System.AppDomain.CurrentDomain.BaseDirectory + "Config/InterfaceRouteConfig/InterfaceRoute.xml";
                XmlDocument myXmlDoc = new XmlDocument();
                myXmlDoc.Load(myXmlFilePath);
                XmlNodeList nodelist = myXmlDoc.DocumentElement.ChildNodes;
                foreach (XmlNode node in nodelist)
                {
                    routeModel = new InterfaceRouteModel();
                    routeModel.url = node.Attributes["url"].Value;
                    string[] substrs = node.InnerText.Split(',');
                    int[] subints = Array.ConvertAll<string, int>(substrs, s => int.Parse(s));
                    routeModel.subsyslist = subints;
                    routeList.Add(routeModel);
                }
                return routeList;
            }
            catch (Exception ex)
            {
                //log：获取转发路由失败+ex.message
                return null;
            }
        }
        /// <summary>
        /// 转发
        /// </summary>
        /// <param name="info"></param>
        public bool Forward(string info,List<InterfaceRouteModel> routeList)
        {
            try
            {
                InterfaceData data = JsonHelper.StringToObject<InterfaceData>(info);
                foreach (InterfaceRouteModel route in routeList)
                {
                    if (route.subsyslist.Contains(data.subSysType))
                    {
                        // PostHttpData.PostWebRequest(obj.url, param, Encoding.UTF8);
                        SendData.BeginInvoke(route.url, info, Encoding.UTF8, null, null);   //异步调用委托，防止线程阻塞
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                //log:转发失败+ex.message
                return false;
            }

        }


    }
}
