using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{

    public class ReportSuspectArr
    {
        public ReportSuspect[] suspect_arr { get; set; }

    }
    public class ReportSuspect
    {
       public string suspect_name { get; set; }//嫌疑人姓名
       public string suspect_gender { get; set; }//嫌疑人性别
       public string suspect_nationality { get; set; }//嫌疑人国籍
       public string suspect_featrue { get; set; }//嫌疑人特征
       public string suspect_credential { get; set; }//嫌疑人证件号
       public string url { get; set; }//嫌疑人照片


    }
}
