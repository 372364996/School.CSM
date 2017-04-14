using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CSM.Common.EnumClass;

namespace CSM.BLL
{
    public class ServDeviceGroupBLL
    {
        private ServDeviceGroupInfoDAL servDeviceGroupInfoDAL = new ServDeviceGroupInfoDAL();
        private ServDeviceInfoDAL servDeviceInfoDAL = new ServDeviceInfoDAL();
        private ServDeviceRelateDAL servDeviceRelateDAL = new ServDeviceRelateDAL();
        /// <summary>
        /// 获取设备分组树
        /// </summary>
        /// <returns></returns>
        public List<DeviceGroupTreeCustom> GetDefinedGroupTree(ServDeviceGroupInfoQuery query)
        {
            try
            {
                //获取所有设备分组和组下的设备
                List<ServDeviceGroupInfoModel> groupDeviceList = servDeviceGroupInfoDAL.GetDeviceGroupInfo(query);
                //先将分组名称添加进树结构中
                List<DeviceGroupTreeCustom> deviceGroupTreeList = new List<DeviceGroupTreeCustom>();
                DeviceGroupTreeCustom deviceGroupTree;
                for (int i = 0; i < groupDeviceList.Count; i++)
                {
                    deviceGroupTree = new DeviceGroupTreeCustom();
                    deviceGroupTree.id = groupDeviceList[i].id;
                    deviceGroupTree.name = groupDeviceList[i].group_name;
                    deviceGroupTree.sid = groupDeviceList[i].id;
                    deviceGroupTree.pid = groupDeviceList[i].pid;
                    deviceGroupTree.resSwitchCode = groupDeviceList[i].ext1;
                    deviceGroupTree.device_code = "";
                    deviceGroupTree.iconOpen = "../images/groupIcon/文件夹开.png";
                    deviceGroupTree.iconClose = "../images/groupIcon/文件夹闭.png";
                    deviceGroupTreeList.Add(deviceGroupTree);
                    List<CameraPatrolDevice> deviceList = servDeviceRelateDAL.GetCameraPatrolDeviceByGroupId(groupDeviceList[i].id);
                    deviceList = deviceList.OrderBy(n => n.rank).ToList();
                    for (int j = 0; j < deviceList.Count; j++)
                    {
                        deviceGroupTree = new DeviceGroupTreeCustom();
                        deviceGroupTree.id = deviceList[j].id;
                        deviceGroupTree.name = deviceList[j].device_name;
                        deviceGroupTree.sid = 0;
                        deviceGroupTree.pid = groupDeviceList[i].id;
                        deviceGroupTree.device_code = deviceList[j].device_code;
                        deviceGroupTree.rank = deviceList[j].rank;
                        deviceGroupTree.icon = "../images/groupIcon/摄像头.png";
                        deviceGroupTreeList.Add(deviceGroupTree);
                    }
                }
                deviceGroupTree = new DeviceGroupTreeCustom();
                deviceGroupTree.id = -1;
                deviceGroupTree.name = "设备组";
                deviceGroupTree.sid = -1;
                deviceGroupTree.pid = -2;
                deviceGroupTree.iconOpen = "../images/groupIcon/文件夹开.png";
                deviceGroupTree.iconClose = "../images/groupIcon/文件夹闭.png";
                deviceGroupTreeList.Add(deviceGroupTree);
                return deviceGroupTreeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取所有的摄像头
        /// </summary>
        /// <param name="industryId">行业id</param>
        /// <returns></returns>
        public List<DeviceGroupTreeCustom> GetAllCameraList(int industryId,int regionID)
        {
            try
            {
                //获取所有的摄像头
                List<ServDeviceInfoModel> deviceInfoList = servDeviceInfoDAL.GetCameraInfo(industryId, regionID);
                List<DeviceGroupTreeCustom> deviceGroupTreeList = new List<DeviceGroupTreeCustom>();
                DeviceGroupTreeCustom deviceGroupTree;
                for (int i = 0; i < deviceInfoList.Count; i++)
                {
                    deviceGroupTree = new DeviceGroupTreeCustom();
                    deviceGroupTree.id = deviceInfoList[i].id;
                    deviceGroupTree.name = deviceInfoList[i].device_name;
                    deviceGroupTree.device_code = deviceInfoList[i].device_code;
                    deviceGroupTree.sid = deviceInfoList[i].id;
                    deviceGroupTree.pid = 0;
                    deviceGroupTree.icon = "../images/groupIcon/摄像头.png";
                    deviceGroupTreeList.Add(deviceGroupTree);
                }
                deviceGroupTree = new DeviceGroupTreeCustom();
                deviceGroupTree.id = -1;
                deviceGroupTree.name = "摄像头";
                deviceGroupTree.device_code = "";
                deviceGroupTree.sid = 0;
                deviceGroupTree.pid = -1;
                deviceGroupTree.iconOpen = "../images/groupIcon/文件夹开.png";
                deviceGroupTree.iconClose = "../images/groupIcon/文件夹闭.png";
                deviceGroupTreeList.Add(deviceGroupTree);
                return deviceGroupTreeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 获取设备分组树,设备列表页面
        /// </summary>
        /// <param name="query">查询条件</param>
        /// <param name="pageType">页面标识（设备列表：0；视频监控页面：1）</param>
        /// <returns></returns>
        public List<DeviceGroupTreeCustom> GetDeviceGroupTree(ServDeviceGroupInfoQuery query, int industryId, int pageType)
        {
            try
            {
                //分组树结构集合
                List<DeviceGroupTreeCustom> deviceGroupTreeList = new List<DeviceGroupTreeCustom>();
                //获取所有的分组
                List<ServDeviceGroupInfoModel> deviceGroupList = servDeviceGroupInfoDAL.GetDeviceGroupInfo(query);
                //获取行业下该园区的所有的设备
                ServDeviceInfoQuery deviceQuery = new ServDeviceInfoQuery();
                deviceQuery.area_id = industryId;//行业id
                deviceQuery.region_id = query.region_id;//园区id
                List<ServDeviceInfoModel> deviceInfoList = servDeviceInfoDAL.GetAllDeviceInfoByIndustry(deviceQuery);
                if (pageType == 1)//视频监控页面只取摄像头
                {
                    deviceInfoList = deviceInfoList.Where(n => n.device_type < 5).ToList();
                }
                DeviceGroupTreeCustom deviceGroupTree;
                for (int i = 0; i < deviceGroupList.Count; i++)
                {
                    deviceGroupTree = new DeviceGroupTreeCustom();
                    deviceGroupTree.id = deviceGroupList[i].id;
                    deviceGroupTree.name = deviceGroupList[i].group_name;
                    deviceGroupTree.sid = deviceGroupList[i].id;
                    deviceGroupTree.pid = deviceGroupList[i].pid;
                    deviceGroupTree.device_code = "";
                    deviceGroupTree.iconOpen = "../images/groupIcon/文件夹开.png";
                    deviceGroupTree.iconClose = "../images/groupIcon/文件夹闭.png";
                    //根据设备分组id获取分组和设备的绑定
                    List<ServDeviceRelateModel> relateList = servDeviceRelateDAL.GetDeviceRelateByGroupId(deviceGroupList[i].id);
                    if (pageType == 1)//视频监控页面
                    {
                        List<ServDeviceInfoModel> deviceList = new List<ServDeviceInfoModel>();//如果分组下没有设备则不添加分组
                        for (int j = 0; j < relateList.Count; j++)
                        {
                            ServDeviceInfoModel deviceModel = deviceInfoList.Where(n => n.id == relateList[j].device_id).FirstOrDefault();
                            if (deviceModel != null)
                            {
                                deviceList.Add(deviceModel);
                            }
                        }
                        if (deviceList.Count != 0)
                        {
                            deviceGroupTreeList.Add(deviceGroupTree);
                        }
                    }
                    else//设备列表页面
                    {
                        deviceGroupTreeList.Add(deviceGroupTree);
                    }

                    for (int j = 0; j < relateList.Count; j++)
                    {
                        ServDeviceInfoModel deviceModel = deviceInfoList.Where(n => n.id == relateList[j].device_id).FirstOrDefault();
                        if (deviceModel != null)
                        {
                            deviceGroupTree = new DeviceGroupTreeCustom();
                            deviceGroupTree.id = deviceModel.id;
                            deviceGroupTree.name = deviceModel.device_name;
                            deviceGroupTree.sid = 0;
                            deviceGroupTree.pid = deviceGroupList[i].id;
                            deviceGroupTree.device_code = deviceModel.device_code;
                            deviceGroupTree.rank = relateList[j].rank;
                            switch (deviceModel.device_type)
                            {
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                    deviceGroupTree.icon = "../images/groupIcon/摄像头.png";
                                    break;
                                case 5:
                                case 6:
                                    deviceGroupTree.icon = "../images/groupIcon/门禁.png";
                                    break;
                                case 7:
                                case 9:
                                case 14:
                                    deviceGroupTree.icon = "../images/groupIcon/手报.png";
                                    break;
                                case 8:
                                case 12:
                                    deviceGroupTree.icon = "../images/groupIcon/卡口.png";
                                    break;
                                case 10:
                                case 11:
                                    deviceGroupTree.icon = "../images/groupIcon/消防栓.png";
                                    break;
                                case 13:
                                    deviceGroupTree.icon = "../images/groupIcon/水表.png";
                                    break;
                                case 15:
                                case 19:
                                    deviceGroupTree.icon = "../images/groupIcon/巡更点.png";
                                    break;
                                case 16:
                                    deviceGroupTree.icon = "../images/groupIcon/烟感.png";
                                    break;
                                case 17:
                                    deviceGroupTree.icon = "../images/groupIcon/广播.png";
                                    break;
                                case 18:
                                    deviceGroupTree.icon = "../images/groupIcon/红外对射探测器.png";
                                    break;
                            }
                            deviceGroupTreeList.Add(deviceGroupTree);
                            deviceInfoList.Remove(deviceModel);
                        }
                    }
                }

                //将剩余未分组的设备加入树结构
                for (int i = 0; i < deviceInfoList.Count; i++)
                {
                    deviceGroupTree = new DeviceGroupTreeCustom();
                    deviceGroupTree.id = deviceInfoList[i].id;
                    deviceGroupTree.name = deviceInfoList[i].device_name;
                    deviceGroupTree.device_code = deviceInfoList[i].device_code;
                    deviceGroupTree.sid = -2;
                    deviceGroupTree.pid = 0;
                    switch (deviceInfoList[i].device_type)
                    {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            deviceGroupTree.icon = "../images/groupIcon/摄像头.png";
                            break;
                        case 5:
                        case 6:
                            deviceGroupTree.icon = "../images/groupIcon/门禁.png";
                            break;
                        case 7:
                        case 9:
                        case 14:
                            deviceGroupTree.icon = "../images/groupIcon/手报.png";
                            break;
                        case 8:
                        case 12:
                            deviceGroupTree.icon = "../images/groupIcon/卡口.png";
                            break;
                        case 10:
                        case 11:
                            deviceGroupTree.icon = "../images/groupIcon/消防栓.png";
                            break;
                        case 13:
                            deviceGroupTree.icon = "../images/groupIcon/水表.png";
                            break;
                        case 15:
                        case 19:
                            deviceGroupTree.icon = "../images/groupIcon/巡更点.png";
                            break;
                        case 16:
                            deviceGroupTree.icon = "../images/groupIcon/烟感.png";
                            break;
                        case 17:
                            deviceGroupTree.icon = "../images/groupIcon/广播.png";
                            break;
                        case 18:
                            deviceGroupTree.icon = "../images/groupIcon/红外对射探测器.png";
                            break;
                    }
                    deviceGroupTreeList.Add(deviceGroupTree);
                }

                //加入一个未分组的树结构
                deviceGroupTree = new DeviceGroupTreeCustom();
                deviceGroupTree.id = 0;
                deviceGroupTree.name = "未分组设备";
                deviceGroupTree.device_code = "";
                deviceGroupTree.sid = 0;
                deviceGroupTree.pid = -1;
                deviceGroupTree.iconOpen = "../images/groupIcon/文件夹开.png";
                deviceGroupTree.iconClose = "../images/groupIcon/文件夹闭.png";
                deviceGroupTreeList.Add(deviceGroupTree);
                return deviceGroupTreeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 添加设备分组
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddDeviceGroup(ServDeviceGroupInfoModel model)
        {
            try
            {
                bool result = false;
                //提取中文首字母当code
                ConvertChinese chinese = new ConvertChinese();
                string codes = chinese.GetHeadOfChs(model.group_name);
                model.group_code = codes;
                int id = servDeviceGroupInfoDAL.AddEntity(model);
                result = true;
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 判断分组名称是否存在
        /// </summary>
        /// <param name="groupName">分组名称</param>
        /// <param name="groupType">分组类型</param>
        /// <returns>存在返回false;不存在返回true</returns>
        public bool VerifyGroupName(string groupName, int groupType, int regionId)
        {
            try
            {
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                query.group_name = groupName;
                query.group_type = groupType;
                query.region_id = regionId;
                ServDeviceGroupInfoModel model = servDeviceGroupInfoDAL.GetServDeviceGroupByNameAndType(query);
                bool result = false;
                if (model == null)
                {
                    result = true;
                }
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
        public bool UpdateGroupName(ServDeviceGroupInfoModel model)
        {
            try
            {
                bool result = false;
                int num = servDeviceGroupInfoDAL.UpdateDeviceGroupInfoById(model);
                if (num != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据组id删除分组
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteGroupById(int id)
        {
            try
            {
                bool result = false;
                //删除组和设备的绑定
                servDeviceRelateDAL.DeleteDeviceRelateByGroupId(id);
                //删除组
                servDeviceGroupInfoDAL.DeleteDeviceGroupInfoById(id);
                result = true;
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 绑定设备和组的关联
        /// </summary>
        /// <param name="deviceIds">设备id集合</param>
        /// <param name="id">组id</param>
        /// <returns></returns>
        public bool AddDeviceGroupRelate(string deviceIds, int id)
        {
            try
            {
                bool result = false;
                string[] ids = deviceIds.Split(',');
                for (int i = 0; i < ids.Length; i++)
                {
                    int deviceId = Convert.ToInt32(ids[i]);
                    //查询设备和组之前是否有绑定，如有先删除绑定
                    //servDeviceRelateDAL.DeleteDeviceRelateByDeviceId(deviceId);
                    //绑定设备和组的绑定
                    //if (id != 0)//如果id为0则拖入的是未分组设备只用删除之前的绑定即可
                    //{
                    ServDeviceRelateModel model = new ServDeviceRelateModel();
                    model.device_id = deviceId;
                    model.group_id = id;
                    int relateId = servDeviceRelateDAL.AddEntity(model);
                    //}
                }
                result = true;
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool AddDeviceGroupRelateEX(string deviceIds, int groupId,int rank)
        {
            bool result = false;
            string[] ids = deviceIds.Split(',');
            //修改原有排序,从rank后所有的往后推ids的 
            ServDeviceRelateModel models = new ServDeviceRelateModel();
            models.device_id = ids.Length;
            models.rank = rank;
            models.group_id = groupId;
            int num = servDeviceRelateDAL.UpdateGroupRankBygroupidAndRank(models);
            for (int i = 0; i < ids.Length; i++)
            {
                int deviceId = Convert.ToInt32(ids[i]);
                ServDeviceRelateModel model = new ServDeviceRelateModel();
                model.device_id = deviceId;
                model.group_id = groupId;
                model.rank = rank + i;
                int relateId = servDeviceRelateDAL.AddEntity(model);
                if (relateId != 0)
                {
                    result = true;
                }
            }
            return result;
        }
        /// <summary>
        /// 根据设备id和组id删除设备和组的绑定
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public bool DeleteDeviceAndGroupBind(int deviceId, int groupId)
        {
            try
            {
                ServDeviceRelateModel model = new ServDeviceRelateModel();
                model.device_id = deviceId;
                model.group_id = groupId;
                servDeviceRelateDAL.DeleteDeviceRelateByDeviceIdAndGroupId(model);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        /// <summary>
        /// 修改分组设备排序
        /// </summary>
        /// <param name="groupId">组id</param>
        /// <param name="idrank">新排序</param>
        /// <returns></returns>
        public bool UpdateGroupDeviceRank(int groupId, string devices)
        {
            try
            {
                string[] deviceArray = devices.Split(',');
                for (int i = 0; i < deviceArray.Length; i++)
                {
                    ServDeviceRelateQuery model = new ServDeviceRelateQuery();
                    model.device_id = Convert.ToInt32(deviceArray[i].Split('|')[0]);
                    model.group_id = groupId;
                    model.rank = i + 1;
                    model.oldRank= Convert.ToInt32(deviceArray[i].Split('|')[1]);
                    int num=servDeviceRelateDAL.UpdateGroupDeviceRank(model);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区id和设备分组类型分页获取所有的设备分组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        public List<ServDeviceGroupInfoModel> GetAllVideoGroupByRegionId(ServDeviceGroupInfoQuery query,out int total)
        {
            try
            {
                List<ServDeviceGroupInfoModel> groupList = servDeviceGroupInfoDAL.GetdeviceGroupInfoByGroupTypeAndRegionIdPage(query,out total);
                return groupList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id获取分组下的设备
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel>GetDeviceInfoByGroupId(int groupId)
        {
            try
            {
                List<ServDeviceInfoModel> deviceList = servDeviceGroupInfoDAL.GetDeviceInfoByGroupId(groupId);
                return deviceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id修改视频轮切组的编码
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="regCode"></param>
        /// <returns></returns>
        public bool UpdateGroupSwitchCodeById(int groupId, string regCode)
        {
            try
            {
                ServDeviceGroupInfoModel model = new ServDeviceGroupInfoModel();
                model.id = groupId;
                model.ext1 = regCode;
                int num = servDeviceGroupInfoDAL.UpdateDeviceSwitchCodeById(model);
                if (num == 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id获取分组下的设备---周丽杰
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<Model.CustomModel.VideoInGroupModel> GetVideoInfoByGroupIdint(int groupId)
        {
            try
            {
                List<Model.CustomModel.VideoInGroupModel> deviceList = servDeviceGroupInfoDAL.GetVideoInfoByGroupIdint(groupId);
                return deviceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
