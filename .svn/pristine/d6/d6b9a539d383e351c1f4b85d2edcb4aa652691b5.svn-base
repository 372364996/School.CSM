using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Alarm_Image
	public class ServAlarmImageDAL : MapContext, IDataFactory<CSM.Model.ServAlarmImageModel, ServAlarmImageQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServAlarmImageModel entity)  
		{
            int id = (int)mapContext.Insert("InsertAlarmImage", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteAlarmImageById(int id)
        {
            int result = mapContext.Delete("DeleteAlarmImageById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateAlarmImageById(ServAlarmImageModel model)
        {

            int result = mapContext.Update("UpdateAlarmImage", model);
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
        public List<ServAlarmImageModel> GetEntities(ServAlarmImageQuery query)
        {
            List<ServAlarmImageModel> list = mapContext.QueryForList<ServAlarmImageModel>("GetAlarmImage", query).ToList();
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
        public List<ServAlarmImageModel> GetEntities(ServAlarmImageQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServAlarmImageModel> list = mapContext.QueryForList<ServAlarmImageModel>("AlarmImagePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServAlarmImageModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServAlarmImageModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}