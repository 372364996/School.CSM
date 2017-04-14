using IBatisNet.DataMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.DAL
{
    public class MapContext
    {
        private ISqlMapper _mapContext;

        protected ISqlMapper mapContext
        {
            get
            {
                if (_mapContext != null)
                {
                    return _mapContext;
                }
                else
                {
                    _mapContext = Mapper.Instance();
                    return _mapContext;
                }
            }
            set { _mapContext = value; }
        }
    }
}
