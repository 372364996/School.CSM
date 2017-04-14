using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Utils;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
    public class ServAreaInfoDAL : MapContext, IDataFactory<CSM.Model.ServAreaInfoModel, ServAreaInfoQuery>
    {
        public int AddEntity(ServAreaInfoModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertAreaInfo", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public int DeleteAreaInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteAreaInfoById", id);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public int UpdateAreaInfoById(ServAreaInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateAreaInfo", model);
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
        public List<ServAreaInfoModel> GetEntities(ServAreaInfoQuery query)
        {
            try
            {
                List<ServAreaInfoModel> list = mapContext.QueryForList<ServAreaInfoModel>("GetServAreaInfo", query).ToList();
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
        public List<ServAreaInfoModel> GetEntities(ServAreaInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServAreaInfoModel> list = mapContext.QueryForList<ServAreaInfoModel>("AreaInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServAreaInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServAreaInfoModel>("GetAreaInfoById", id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServAreaInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据园区id获取区域
        /// </summary>
        /// <param name="region_id">园区id</param>
        /// <returns></returns>
        public List<ServAreaInfoModel> GetAreaInfoTree(int region_id)
        {
            try
            {
                List<ServAreaInfoModel> areaList = mapContext.QueryForList<ServAreaInfoModel>("GetAreaInfoTree", region_id).ToList();
                return areaList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 区域注册，选择的若是楼宇注册，则向servAreaInfo表插入数据并返回area_id，接着插入servBuildingInfoModel中楼宇相关信息+area_id并返回数据building_id，接着插入servBuildingAreaType中楼宇的所属功能区id+building_id
        /// </summary>
        /// <param name="servAreaInfoModel"></param>
        /// <param name="servBuildingInfoModel"></param>
        /// <param name="servBuildingAreaTypeModel"></param>
        /// <returns></returns>
        public bool AddModel(ServAreaInfoModel servAreaInfoModel, ServBuildingInfoModel servBuildingInfoModel, ServBuildingAreaTypeModel servBuildingAreaTypeModel)
        {
            bool result = false;
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                int area_id = (int)mapContext.Insert("InsertAreaInfo", servAreaInfoModel);
                if (area_id > 0)
                {
                    servBuildingInfoModel.area_id = area_id;
                    //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "InsertBuildingInfo", servBuildingInfoModel);
                    int building_id = (int)mapContext.Insert("InsertBuildingInfo", servBuildingInfoModel);
                    if (building_id > 0)
                    {
                        servBuildingAreaTypeModel.building_id = building_id;
                        int id = (int)mapContext.Insert("InsertBuildingAreaType", servBuildingAreaTypeModel);
                        if (id > 0)
                        {
                            result = true;
                        }
                        else
                        {
                            result = false;
                        }
                    }
                    else
                    {
                        result = false;
                    }
                }

                else
                {
                    result = false;
                }
                if (result == true)
                {
                    mapContext.CommitTransaction();//提交事务
                    return result;
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }
        }
        /// <summary>
        /// 根据地图类型获取区域和楼宇信息
        /// </summary>
        /// <param name="region_id">园区id</param>
        /// <returns></returns>
        public List<AreaInfoCustom> GetAreaInfoAndBuilding(BaseAreaTypeModel baseIndustryAreaModel)
        {
            try
            {
                List<AreaInfoCustom> areaList = mapContext.QueryForList<AreaInfoCustom>("GetAreaInfoAndBuilding", baseIndustryAreaModel).ToList();
                return areaList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 软删除区域
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int HideAreaInfoById(int id)
        {
            try
            {
                int num = mapContext.Update("HideAreaInfoById", id);
                return num;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 楼内图表、楼宇表、区域表的联表查询
        /// </summary>
        /// <returns></returns>
        public List<FloorBuildingAreaInfoCustom> GetAllFloorBuildingArea()
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "GetFloorAreaInfo11", 1); //获取SQL语句
                List<FloorBuildingAreaInfoCustom> floorBuildingAreaList = mapContext.QueryForList<FloorBuildingAreaInfoCustom>("GetFloorAreaInfo11", 1).ToList();
                return floorBuildingAreaList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 区域注册2.5D区域注册
        /// </summary>
        /// <returns></returns>
        public bool RegisterArea25D(ServAreaInfoModel model)
        {
            try
            {
                int result = mapContext.Update("RegisterArea25D", model);
                if (result>0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
