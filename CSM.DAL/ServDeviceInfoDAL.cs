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
    public class ServDeviceInfoDAL : MapContext, IDataFactory<CSM.Model.ServDeviceInfoModel, ServDeviceInfoQuery>
    {
        /// <summary>
        /// 添加设备
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServDeviceInfoModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertDeviceInfo", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 添加设备
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServDeviceInfoQuery entity)
        {
            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "InsertDeviceInfo", entity);//获取SQL语句
                int id = (int)mapContext.Insert("InsertDeviceInfo", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 删除设备
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteDeviceInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteDeviceInfoById", id);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据code删除设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public int DeleteDeviceInfoByCode(string code)
        {
            try
            {
                int num = mapContext.Delete("DeleteDeviceInfoByCode", code);
                return num;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceInfoById(ServDeviceInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateDeviceInfo", model);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 修改设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceInfo2D(ServDeviceInfoQuery model)
        {
            try
            {
                int result = mapContext.Update("UpdateDeviceInfo2D", model);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 更新设备的2.5D的坐标
        /// </summary>
        /// <param name="id"></param>
        /// <param name="local_longitude"></param>
        /// <param name="local_latitude"></param>
        /// <returns></returns>
        public bool RegisterDevice25D(ServDeviceInfoModel model)
        {
            try
            {
                int result = mapContext.Update("RegisterDeviceInfo25D", model);
                if (result > 0)
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
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetEntities(ServDeviceInfoQuery query)
        {
            List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("GetServDeviceInfo", query).ToList();
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
        public List<ServDeviceInfoModel> GetEntities(ServDeviceInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("DeviceInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 根据设备code查找设备 2016.12.11 封传波
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <returns></returns>
        public ServDeviceInfoModel GetEntity(string deviceCode)
        {
            try
            {

                return mapContext.QueryForObject<ServDeviceInfoModel>("GetDeviceInfoByCode", deviceCode);
            }
            catch (Exception ex)
            {
                //log:根据设备code查找设备失败！+设备code：deviceCode+ex.message
                throw ex;
            }
        }
        /// <summary>
        /// 根据code查询所有设备code中包含code的设备列表（用于生成添加其他设备的code）
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceInfoLikeCode(string code)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceInfoLikeCode", code).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据id获取设备信息 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDeviceInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServDeviceInfoModel>("GetDeviceInfoById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备类型获取设备 2016.12.09乔会会
        /// </summary>
        /// <param name="deviceType">设备类型</param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetAllDevice(int deviceType, int regionId)
        {
            try
            {
                ServDeviceInfoQuery query = new ServDeviceInfoQuery();
                query.device_type = deviceType;
                query.region_id = regionId;
                List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceInfoByType", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备类型获取设备 2016.12.09乔会会
        /// </summary>
        /// <param name="deviceType">设备类型</param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetAllDeviceInfo(int deviceType, int regionId,int inbuildingId)
        {
            try
            {
                ServDeviceInfoQuery query = new ServDeviceInfoQuery();
                query.device_type = deviceType;
                query.region_id = regionId;
                query.is_inbuilding = inbuildingId;
                List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceInfoByTypeId", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id获取行业所有的复合设备
        /// </summary>
        /// <param name="industryId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetAllCompoundDevice(int industryId)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetCompoundDeviceByIndustryId", industryId).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 获取所有摄像头设备 2016.12.09乔会会
        /// </summary>
        /// <param name="industryId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetCameraInfo(int industryId, int regionId)
        {
            try
            {
                ServDeviceInfoQuery query = new ServDeviceInfoQuery();
                query.region_id = regionId;
                query.industryId = industryId;
                List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("GetCameraInfo", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 查询所有的设备和图标地址联合
        /// </summary>
        /// <param name="region_id">园区id</param>
        /// <returns></returns>
        public List<DeviceInfoCustom> GetDeviceInfoAndIconUrl(ServDefinedDeviceModel model)
        {
            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "GetDeviceInfoAndIconUrl", model);//获取SQL语句
                List<DeviceInfoCustom> deviceList = mapContext.QueryForList<DeviceInfoCustom>("GetDeviceInfoAndIconUrl", model).ToList();
                return deviceList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool UpdateEntity(int id, ServDeviceInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetEntities(ServDeviceInfoQuery query, out int totalNumber)
        {
            try
            {
                List<ServDeviceInfoModel> list = mapContext.QueryForList<ServDeviceInfoModel>("DeviceInfoPage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("DeviceInfoPageCount", query);
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
        /// <summary>
        /// 修改设备信息（设备列表页面，不可修改坐标等信息）
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceInfo(ServDeviceInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdateDeviceInfoListPage", model);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id查询所有的设备信息
        /// </summary>
        /// <param name="industryId">行业id</param>
        public List<ServDeviceInfoModel> GetAllDeviceInfoByIndustry(ServDeviceInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetAllDeviceInfoByIndustry", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据设备组id获取设备列表
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceInfoByGroupId(int groupId)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceInfoByGroupId", groupId).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id获取所有的未分组的设备
        /// </summary>
        /// <param name="industryId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetNotRegisterDeviceInfoByIndustryId(int industryId)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetNotRegisterDeviceInfoByIndustryId", industryId).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 获取楼内图信息
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public BuildingAreaInfo GetMapBuildingInfo(int deviceId)
        {
            try
            {

                return mapContext.QueryForObject<BuildingAreaInfo>("GetMapBuildingInfo", deviceId);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 查询所有未注册的25D设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> Get25DUnRegisterDevice(ServDefinedDeviceModel model)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("Get25DUnRegisterDevice", model).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据设备code获取设备
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <returns></returns>
        public ServDeviceInfoModel GetDeviceByDeviceCode(string deviceCode)
        {
            try
            {
                return mapContext.QueryForObject<ServDeviceInfoModel>("GetDeviceByDeviceCode", deviceCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备code更新设备状态
        /// </summary>
        /// <param name="device"></param>
        /// <returns></returns>
        public int UpdateDeviceStatusByDeviceCode(DeviceInfoStatusCustom device)
        {
            try
            {
                return mapContext.Update("UpdateDeviceStatusByDeviceCode", device);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过设备的id得到设备周围的摄像头
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceNearCameraByDeviceId(int id)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceNearCameraByDeviceId", id).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
