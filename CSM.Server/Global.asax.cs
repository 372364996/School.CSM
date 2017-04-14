using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace CSM.Server
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        public static List<Model.SubSystemModel.InterfaceRouteModel> routeList;
        CSM.BLL.SubSystemBLL.InterfaceBLL interfaceBll = new BLL.SubSystemBLL.InterfaceBLL();
        protected void Application_Start()
        {
            routeList = interfaceBll.GetInterfaceRoute();  //获取转发层路由配置
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
