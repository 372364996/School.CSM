using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Car_CrossGateRecord
	public class ServCarCrossGateRecordDAL : MapContext, IDataFactory<CSM.Model.ServCarCrossGateRecordModel, ServCarCrossGateRecordQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServCarCrossGateRecordModel entity)  
		{
            int id = (int)mapContext.Insert("InsertCarCrossGateRecord", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteCarCrossGateRecordById(int id)
        {
            int result = mapContext.Delete("DeleteCarCrossGateRecordById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateCarCrossGateRecordById(ServCarCrossGateRecordModel model)
        {

            int result = mapContext.Update("UpdateCarCrossGateRecord", model);
            return result;
        }
		
		
		
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServCarCrossGateRecordModel> GetEntities(ServCarCrossGateRecordQuery query)
        {
            List<ServCarCrossGateRecordModel> list = mapContext.QueryForList<ServCarCrossGateRecordModel>("GetCarCrossGateRecord", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServCarCrossGateRecordModel> GetEntities(ServCarCrossGateRecordQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServCarCrossGateRecordModel> list = mapContext.QueryForList<ServCarCrossGateRecordModel>("CarCrossGateRecordPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServCarCrossGateRecordModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServCarCrossGateRecordModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}