using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Room_Info
	public class ServRoomInfoDAL : MapContext, IDataFactory<CSM.Model.ServRoomInfoModel, ServRoomInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServRoomInfoModel entity)  
		{
            int id = (int)mapContext.Insert("InsertRoomInfo", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteRoomInfoById(int id)
        {
            int result = mapContext.Delete("DeleteRoomInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateRoomInfoById(ServRoomInfoModel model)
        {

            int result = mapContext.Update("UpdateRoomInfo", model);
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
        public List<ServRoomInfoModel> GetEntities(ServRoomInfoQuery query)
        {
            List<ServRoomInfoModel> list = mapContext.QueryForList<ServRoomInfoModel>("GetRoomInfo", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServRoomInfoModel> GetEntities(ServRoomInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServRoomInfoModel> list = mapContext.QueryForList<ServRoomInfoModel>("RoomInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServRoomInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServRoomInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}