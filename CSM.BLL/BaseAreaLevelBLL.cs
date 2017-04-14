using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
   
    public class BaseAreaLevelBLL
    {
        private CSM.DAL.BaseAreaLevelDAL baseAreaLevelDAL = new DAL.BaseAreaLevelDAL();

        public int AddEntity(CSM.Model.BaseAreaLevelModel entity)
        {
            return baseAreaLevelDAL.AddEntity(entity);
        }
        public bool DelEntity(int id)
        {
            bool result = false;
            int ReturnResult= baseAreaLevelDAL.DelAreaLevelById(id);
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

        public bool UpdateEntity(CSM.Model.BaseAreaLevelModel newentity)
        {
            bool result = false;
            int ReturnResult= baseAreaLevelDAL.UpdateAreaLevelById(newentity);
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
        /// <summary>
        /// 根据条件分页查询固定巡更路线信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<CSM.Model.BaseAreaLevelModel> GetPageAreaLevel(CSM.Model.QueryModel.BaseAreaLevelQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            return baseAreaLevelDAL.GetPageBaseAreaLevel(query,pageSize, pageNumber, out totalNumber);

        }

        public List<CSM.Model.BaseAreaLevelModel> GetEntities()
        {
            CSM.Model.QueryModel.BaseAreaLevelQuery query = new Model.QueryModel.BaseAreaLevelQuery();
            return baseAreaLevelDAL.GetEntities(query);
        }



    }
   




}
