using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Building_Info
	public class ServBuildingInfoDAL : MapContext, IDataFactory<CSM.Model.ServBuildingInfoModel, ServBuildingInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServBuildingInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertBuildingInfo", entity);
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
		public int DeleteBuildingInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteBuildingInfoById", id);
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
        public int UpdateBuildingInfoById(ServBuildingInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateBuildingInfo", model);
                return result;
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
        public List<ServBuildingInfoModel> GetEntities(ServBuildingInfoQuery query)
        {
            try
            {
                List<ServBuildingInfoModel> list = mapContext.QueryForList<ServBuildingInfoModel>("GetBuildingInfo", query).ToList();
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
        public List<ServBuildingInfoModel> GetEntities(ServBuildingInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServBuildingInfoModel> list = mapContext.QueryForList<ServBuildingInfoModel>("BuildingInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServBuildingInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServBuildingInfoModel>("GetBuildingInfoById", id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServBuildingInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据区域id获取楼宇
        /// </summary>
        /// <param name="areaID">区域id</param>
        /// <returns></returns>
        public ServBuildingInfoModel GetBuildinginfoByAreaID(int areaID)
        {
            try
            {
                ServBuildingInfoModel model = mapContext.QueryForObject<ServBuildingInfoModel>("GetBuildinginfoByAreaID", areaID);
                return model;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        
    }
}