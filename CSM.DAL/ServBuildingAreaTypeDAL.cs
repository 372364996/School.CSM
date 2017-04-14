using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//楼宇所属功能区域
    // 初始默认填写，后期修改房间区域修改此表
	public class ServBuildingAreaTypeDAL : MapContext, IDataFactory<CSM.Model.ServBuildingAreaTypeModel, ServBuildingAreaTypeQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServBuildingAreaTypeModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertBuildingAreaType", entity);
                return id;
            }
            catch (Exception ex)
            {
               
                throw ex;
            }


        }
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteBuildingAreaTypeById(int id)
        {    try
            {
                int result = mapContext.Delete("DeleteBuildingAreaTypeById", id);
                return result;
            }
             catch (Exception ex)
            {

                throw ex;
            }
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateBuildingAreaTypeById(ServBuildingAreaTypeModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateBuildingAreaType", model);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
		/// <summary>
        /// 根据楼宇id更新楼宇区域类型绑定表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		public int UpdateBuildingAreaTypeByBuildingId(ServBuildingAreaTypeModel model)
        {
            try
            {
                int num = mapContext.Update("UpdateBuildingAreaTypeByBuildingId", model);
                return num;
            }
            catch (Exception ex)
            {

                throw ex;
            }
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
        public List<ServBuildingAreaTypeModel> GetEntities(ServBuildingAreaTypeQuery query)
        {
            try
            {
                List<ServBuildingAreaTypeModel> list = mapContext.QueryForList<ServBuildingAreaTypeModel>("GetBuildingAreaType", query).ToList();
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServBuildingAreaTypeModel> GetEntities(ServBuildingAreaTypeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServBuildingAreaTypeModel> list = mapContext.QueryForList<ServBuildingAreaTypeModel>("BuildingAreaTypePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServBuildingAreaTypeModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServBuildingAreaTypeModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据楼宇id删除楼宇区域类型关联
        /// </summary>
        /// <param name="buildingId"></param>
        /// <returns></returns>
        public int DeleteBuildingAreaTypeByBuildingId(int buildingId)
        {
            try
            {
                return mapContext.Delete("DeleteBuildingAreaTypeByBuildingId", buildingId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}