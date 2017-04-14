using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
   public  class EasyUIDataGruidModel<T> where T:new ()
    {
        public int total { get; set; }

        public T rows { get; set; }
    }
}
