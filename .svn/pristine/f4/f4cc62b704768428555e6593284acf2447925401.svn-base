using CSM.Model;
using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServAreaInfoBLL
    {
        private CSM.DAL.ServAreaInfoDAL servAreaInfoDAL = new DAL.ServAreaInfoDAL();
        private CSM.DAL.ServFloorInfoDAL servFloorInfoDAL = new DAL.ServFloorInfoDAL();

        /// <summary>
        /// 得到AreaInfo区域表中的所有的数据
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<CSM.Model.ServAreaInfoModel> GetEntities()
        {
            CSM.Model.QueryModel.ServAreaInfoQuery query = new Model.QueryModel.ServAreaInfoQuery();
            return servAreaInfoDAL.GetEntities(query);
        }
        /// <summary>
        /// 根据地图类型获取区域和楼宇
        /// </summary>
        /// <param name="region_id">园区id</param>
        /// <returns></returns>
        public List<AreaInfoCustom> GetAreaInfoAndBuilding(int region_id, int industry_id)
        {
            try
            {
                BaseAreaTypeModel baseIndustryAreaModel = new BaseAreaTypeModel();
                baseIndustryAreaModel.id = region_id;
                baseIndustryAreaModel.industry_id = industry_id;
                List<AreaInfoCustom> areaList = servAreaInfoDAL.GetAreaInfoAndBuilding(baseIndustryAreaModel);
                return areaList;
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
        public List<FloorBuildingAreaInfoCustom> GetFloorBuildingAreaInfoCustom()
        {
            List<FloorBuildingAreaInfoCustom> floorBuildingAreaList = servAreaInfoDAL.GetAllFloorBuildingArea();
            return floorBuildingAreaList;
        }


        /// <summary>
        /// 根据id查询楼内图信息__周丽杰
        /// </summary>
        /// <returns></returns>
        public Model.ServFloorInfoModel GetBuildingInfoByid(int floor_id)
        {
            try
            {
                return servFloorInfoDAL.GetEntity(floor_id);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
