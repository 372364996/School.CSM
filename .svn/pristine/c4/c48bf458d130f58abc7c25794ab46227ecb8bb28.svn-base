using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
    public class ServDeviceGroupInfoDAL : MapContext, IDataFactory<CSM.Model.ServDeviceGroupInfoModel, ServDeviceGroupInfoQuery>
    {
        public int AddEntity(ServDeviceGroupInfoModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertDeviceGroupInfo", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据组id删除设备分组
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteDeviceGroupInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteDeviceGroupInfoById", id);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改设备分组名称
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceGroupInfoById(ServDeviceGroupInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateDeviceGroupInfo", model);
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

        public ServDeviceGroupInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServDeviceGroupInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetEntities(ServDeviceGroupInfoQuery query)
        {
            try
            {
                List<ServDeviceGroupInfoModel> list = mapContext.QueryForList<ServDeviceGroupInfoModel>("GetServDeviceGroupInfo", query).ToList();
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
        public List<ServDeviceGroupInfoModel> GetEntities(ServDeviceGroupInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServDeviceGroupInfoModel> list = mapContext.QueryForList<ServDeviceGroupInfoModel>("DeviceGroupInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 获取所有视频分组信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<DeviceGroupInfoCustom> GetCameraGroupInfo(ServDeviceGroupInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<DeviceGroupInfoCustom>("GetCameraGroupInfo", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 获取分组信息根据园区id和分组类型
        /// </summary>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetDeviceGroupInfo(ServDeviceGroupInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceGroupInfoModel>("GetDeviceGroupInfo", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据园区id、分组类型分页获取分组信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetdeviceGroupInfoByGroupTypeAndRegionIdPage(ServDeviceGroupInfoQuery query, out int total)
        {
            try
            {
                total = mapContext.QueryForObject<int>("GetdeviceGroupCountByTypeAndRegId", query);
                return mapContext.QueryForList<ServDeviceGroupInfoModel>("GetdeviceGroupInfoByGroupTypeAndRegionIdPage", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取视频巡更设备分组(封传波 2017-2-16)
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetCameraPatrolDeviceGroupInfo(ServDeviceGroupInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceGroupInfoModel>("GetCameraPatrolGroupInfo", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取视频巡更设备分组(封传波 2017-2-16)
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetCameraPatrolDeviceGroupInfoByRegion(ServDeviceGroupInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceGroupInfoModel>("GetCameraPatrolGroupInfoByRegion", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据ID获取设备分组信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDeviceGroupInfoModel GetDeviceGroupInfoByGroupId(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServDeviceGroupInfoModel>("GetDeviceGroupInfoByGroupId", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组名称、分组类别、园区id获取分组
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public ServDeviceGroupInfoModel GetServDeviceGroupByNameAndType(ServDeviceGroupInfoQuery query)
        {
            try
            {
                return mapContext.QueryForObject<ServDeviceGroupInfoModel>("GetGroupByNameAndTypeAndRegionId", query);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备分组id获取分组下的设备集合
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceInfoByGroupId(int groupId)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetDeviceInfoByGroupId2", groupId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id修改视频轮切组的编码
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceSwitchCodeById(ServDeviceGroupInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdateGroupSwitchCodeById", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据设备分组id获取分组下的设备集合--周丽杰
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<Model.CustomModel.VideoInGroupModel> GetVideoInfoByGroupIdint(int groupId)
        {
            try
            {
                List<Model.CustomModel.VideoInGroupModel> ada = mapContext.QueryForList<Model.CustomModel.VideoInGroupModel>("GetVideoInfoByGroupId", groupId).ToList();

                return ada;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
