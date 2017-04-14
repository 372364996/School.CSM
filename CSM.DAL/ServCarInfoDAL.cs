using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Car_Info
	public class ServCarInfoDAL : MapContext, IDataFactory<CSM.Model.ServCarInfoModel, ServCarInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServCarInfoModel entity)  
		{
            int id = (int)mapContext.Insert("InsertCarInfo", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteCarInfoById(int id)
        {
            int result = mapContext.Delete("DeleteCarInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateCarInfoById(ServCarInfoModel model)
        {

            int result = mapContext.Update("UpdateCarInfo", model);
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
        public List<ServCarInfoModel> GetEntities(ServCarInfoQuery query)
        {
            List<ServCarInfoModel> list = mapContext.QueryForList<ServCarInfoModel>("GetCarInfo", query).ToList();
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
        public List<ServCarInfoModel> GetEntities(ServCarInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServCarInfoModel> list = mapContext.QueryForList<ServCarInfoModel>("CarInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServCarInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServCarInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}