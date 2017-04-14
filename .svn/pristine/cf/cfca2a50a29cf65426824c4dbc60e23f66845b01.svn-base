using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
    //Serv_Floor_Info
    public class ServFloorInfoDAL : MapContext, IDataFactory<CSM.Model.ServFloorInfoModel, ServFloorInfoQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServFloorInfoModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertFloorInfo", entity);
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
        public int DeleteFloorInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteFloorInfoById", id);
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
        public int UpdateFloorInfoById(ServFloorInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateFloorInfo", model);
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
        public List<ServFloorInfoModel> GetEntities(ServFloorInfoQuery query)
        {
            try
            {
                List<ServFloorInfoModel> list = mapContext.QueryForList<ServFloorInfoModel>("GetFloorInfo", query).ToList();
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
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServFloorInfoModel> GetEntities(ServFloorInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel model = new PageModel();
                model.pageIndex = pageNumber;
                model.pageSize = pageSize;
                List<ServFloorInfoModel> list = mapContext.QueryForList<ServFloorInfoModel>("FloorInfoPage", model).ToList();
                totalNumber = list.Count();
                return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据id查询楼内图
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServFloorInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServFloorInfoModel>("GetFloorInfoById", id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServFloorInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据楼宇id查询楼宇下的楼层 张丰刚
        /// </summary>
        /// <param name="buildingID">楼宇id</param>
        /// <returns></returns>
        public List<ServFloorInfoModel> GetFloorInfoByBuildingID(int buildingID)
        {
            try
            {
                return mapContext.QueryForList<ServFloorInfoModel>("GetFloorInfoByBuildingID", buildingID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据楼宇id和楼层号验证该楼宇中是否存在该层（新增用）
        /// </summary>
        /// <param name="buildingID">楼宇id</param>
        /// <param name="floorNum">楼层号</param>
        /// <returns></returns>
        public ServFloorInfoModel GetFloorInfoByFloorNumAndBuildingID(int buildingID, int floorNum)
        {
            try
            {
                ServFloorInfoQuery query = new ServFloorInfoQuery();
                query.building_id = buildingID;
                query.rank = floorNum;
                return mapContext.QueryForObject<ServFloorInfoModel>("GetFloorInfoByFloorNumAndBuildingID", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据楼宇id和楼层号以及楼层id验证该楼（修改用）
        /// </summary>
        /// <param name="buildingID"></param>
        /// <param name="floorNum"></param>
        /// <param name="floorID"></param>
        /// <returns></returns>
        public ServFloorInfoModel GetFloorInfoByFloorNumAndBuildingID(int buildingID, int floorNum, int floorID)
        {
            try
            {
                ServFloorInfoQuery query = new ServFloorInfoQuery();
                query.building_id = buildingID;
                query.rank = floorNum;
                query.id = floorID;
                return mapContext.QueryForObject<ServFloorInfoModel>("GetFloorInfoByFloorNumAndBuildingIDAndFloorID", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int UpdateRank(ServFloorInfoModel floorInfoModel)
        {
            try
            {
                int result = mapContext.Update("UpdateRank", floorInfoModel);
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}