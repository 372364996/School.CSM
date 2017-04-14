using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
   public  class BaseCarTypeQuery
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// 白名单：1
        ///黑名单：2
        /// </summary>		
        public string type_name { set; get; }

    }
}

