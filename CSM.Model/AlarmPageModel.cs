using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    public class AlarmPageModel
    {
        //从第几行开始
        public long startRowNum { get; set; }
        //到第几行结束
        public long endRowNum { get; set; }
    }
}
