using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSM.Model.SubSystemModel
{
    public class InterfaceData
    {
        //子系统类型
        public int subSysType { get; set; }
        //数据类型
        public int dataType { get; set; }
        //数据体
        public object data { get; set; }
        //驱动标识
        public string mark { get; set; }
    }
}