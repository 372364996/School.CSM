using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class ReportFile
    {
        public string file_name { get; set; }//文件名
        public string create_time { get; set; }//创建时间
        public string ext { get; set; }//扩展名
        public string file_address { get; set; }//文件地址
    }
}
