using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Common;
using CSM.Model;

namespace CSM.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            string subsys = Enum.IsDefined(typeof(EnumClass.SubSystem), 100) ? Enum.ToObject(typeof(EnumClass.SubSystem), 100).ToString() : "";
           
        }


        void aaa()
        {
            double d = 0.1;

            double m = 10000;
            int count = 24;

            double lixi = (m * d) / 12;

            for (int i = 0; i < count - 1; i++)
            {
                lixi = (lixi * (1 + d / 12)) + ((m * d) / 12);

                Console.WriteLine("月：" + (i + 1) + ",利息：" + lixi);
            }

            Console.ReadKey();
        }
    }
}
