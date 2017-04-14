using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
   public  class BaseRelayConfigBLL
    {
        CSM.DAL.BaseRelayConfigDAL baseRelayConfigDAL = new DAL.BaseRelayConfigDAL();

        /// <summary>
        /// 获取四色灯
        /// </summary>
        /// <returns></returns>
        public List<CSM.Model.BaseRelayConfigModel> GetFourColorLight(int regionId)
        {
            try
            {
                CSM.Model.QueryModel.BaseRelayConfigQuery baseRelayConfigQuery = new Model.QueryModel.BaseRelayConfigQuery();
                baseRelayConfigQuery.region_id = regionId;
                return baseRelayConfigDAL.GetFourColorLight(baseRelayConfigQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
