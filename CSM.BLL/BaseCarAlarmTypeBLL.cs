using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class BaseCarAlarmTypeBLL
    {
        private CSM.DAL.BaseCarAlarmTypeDAL baseCarAlarmTypeDAL = new DAL.BaseCarAlarmTypeDAL();

        public int AddEntity(CSM.Model.BaseCarAlarmTypeModel entity)
        {
            return baseCarAlarmTypeDAL.AddEntity(entity);
        }
        public bool DelEntity(int id)
        {
            bool result = false;
            int ReturnResult = baseCarAlarmTypeDAL.DeleteCarAlarmTypeById(id);
            if (ReturnResult == 0)
            {
                result = false;
            }
            else
            {
                result = true;
            }
            return result;
        }

        public bool UpdateEntity(CSM.Model.BaseCarAlarmTypeModel newentity)
        {
            bool result = false;
            int ReturnResult = baseCarAlarmTypeDAL.UpdateCarAlarmTypeById(newentity);
            if (ReturnResult == 0)
            {
                result = false;
            }
            else
            {
                result = true;
            }
            return result;
        }
    }
}