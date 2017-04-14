using CSM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
using static CSM.Common.EnumClass;
using CSM.Common;
using System.IO;
using System.Xml;

namespace CSM.BLL
{
    public class MapRegisterBLL
    {
        private ServTempDeviceDAL servTempDeviceDAL = new ServTempDeviceDAL();//设备临时表
        private ServDeviceInfoDAL servDeviceInfoDAL = new ServDeviceInfoDAL();//设备表
        private ServAreaInfoDAL servAreaInfoDAL = new ServAreaInfoDAL();//区域表
        private ServBuildingInfoDAL servBuildingInfoDAL = new ServBuildingInfoDAL();//楼宇表
        private ServBuildingAreaTypeDAL servBuildingAreaTypeDAL = new ServBuildingAreaTypeDAL();//区域类型楼宇关联
        private BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();//地图配置
        private ServFloorInfoDAL servFloorInfoDAL = new ServFloorInfoDAL();//楼层表
        private ServDefinedDeviceDAL servDefinedDeviceDAL = new ServDefinedDeviceDAL();//自定义设备类型
        private BaseAreaTypeDAL baseAreaTypeDAL = new BaseAreaTypeDAL();//区域类型
        #region 设备注册相关
        /// <summary>
        /// 获取所有未注册设备
        /// </summary>
        /// <returns></returns>
        public List<TempDeviceCustom> GetUnRegisterDevice()
        {
            try
            {
                ServTempDeviceQuery tempDeviceQuery = new ServTempDeviceQuery();
                List<ServTempDeviceModel> list = new List<ServTempDeviceModel>();
                //获取所有的临时设备
                list = servTempDeviceDAL.GetEntities(tempDeviceQuery);
                //获取子系统枚举
                List<EnumModel> enumList = EnumClass.GetEnumModelList<SubSystem>();
                TempDeviceCustom tempDevice;
                List<TempDeviceCustom> tempDeviceCustomList = new List<TempDeviceCustom>();
                for (int i = 0; i < enumList.Count; i++)
                {
                    List<ServTempDeviceModel> tempDeviceModelList = list.Where(n => n.subsystem_id == enumList[i].key).ToList();
                    if (tempDeviceModelList.Count > 0)
                    {
                        tempDevice = new TempDeviceCustom();
                        tempDevice.pId = -1;
                        tempDevice.id = enumList[i].key - 1;
                        tempDevice.name = enumList[i].value;
                        tempDevice.ip = (enumList[i].key - 1).ToString();
                        tempDevice.pip = "-1";
                        tempDeviceCustomList.Add(tempDevice);
                    }
                    List<string> ipList1 = new List<string>();
                    var ipList = tempDeviceModelList.GroupBy(n => n.ext1).ToList();
                    for (int j = 0; j < ipList.Count; j++)
                    {
                        ipList1.Add(ipList[j].Key);
                        tempDevice = new TempDeviceCustom();
                        tempDevice.pId = enumList[i].key - 1;
                        tempDevice.id = -5;
                        tempDevice.name = ipList[j].Key;
                        tempDevice.ip= ipList[j].Key;
                        tempDevice.pip= (enumList[i].key - 1).ToString();
                        tempDeviceCustomList.Add(tempDevice);
                    }
                    
                    for (int j = 0; j < tempDeviceModelList.Count; j++)
                    {
                        tempDevice = new TempDeviceCustom();
                        tempDevice.pId = tempDeviceModelList[j].subsystem_id - 1;
                        tempDevice.id = tempDeviceModelList[j].id;
                        tempDevice.name = tempDeviceModelList[j].device_name;
                        tempDevice.device_code = tempDeviceModelList[j].device_code;
                        tempDevice.device_type = tempDeviceModelList[j].device_type;
                        tempDevice.subsystem_id = tempDeviceModelList[j].subsystem_id;
                        tempDevice.search_code = tempDeviceModelList[j].search_code;
                        tempDevice.ip = "";
                        tempDevice.pip = tempDeviceModelList[j].ext1;
                        tempDeviceCustomList.Add(tempDevice);
                    }

                }
                tempDevice = new TempDeviceCustom();
                tempDevice.pId = -1;
                tempDevice.id = -2;
                tempDevice.name = "添加其他设备";
                tempDeviceCustomList.Add(tempDevice);
                return tempDeviceCustomList;

            }
            catch (Exception)
            {

                throw;
            }

        }
        /// <summary>
        /// 获取所有复合设备
        /// </summary>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetAllCompoundDevice(int industryId)
        {
            try
            {
                return servDeviceInfoDAL.GetAllCompoundDevice(industryId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 2D设备注册
        /// </summary>
        /// <returns></returns>
        public ServDeviceInfoModel AddDevice2D(ServDeviceInfoQuery deviceInfo, int deviceTempID)
        {
            try
            {

                if (deviceInfo.device_code == "")//其他设备（非摄像头）
                {
                    //提取中文首字母
                    ConvertChinese chinese = new ConvertChinese();
                    string codes = chinese.GetHeadOfChs(Enum.GetName(typeof(BaseDeviceType), deviceInfo.device_type));
                    //根据基础设备类型取出设备表中该类型所有的设备计算设备code
                    List<ServDeviceInfoModel> servDeviceList = servDeviceInfoDAL.GetDeviceInfoLikeCode(codes);
                    string lastDeviceCode = "";
                    if (servDeviceList.Count > 0)
                    {
                        for (int i = servDeviceList.Count - 1; i >= 0; i--)//取出最后一条设备数据
                        {
                            if (servDeviceList[i].device_code.Substring(0, codes.Length) == codes)
                            {
                                lastDeviceCode = servDeviceList[i].device_code;
                                break;
                            }
                        }
                        if (lastDeviceCode.IndexOf(codes) >= 0)
                        {
                            int codeID = Convert.ToInt32(lastDeviceCode.Substring(codes.Length, lastDeviceCode.Length - codes.Length));
                            deviceInfo.device_code = codes + (codeID + 1);
                        }
                    }
                    else
                    {
                        deviceInfo.device_code = codes + 1;
                    }
                }
                int id = servDeviceInfoDAL.AddEntity(deviceInfo);
                if (id != 0)
                {
                    //删除设备临时表数据
                    int num = servTempDeviceDAL.DeleteTempDeviceById(deviceTempID);
                }
                ServDeviceInfoModel model = new ServDeviceInfoModel();
                model.id = id;
                model.device_code = deviceInfo.device_code;
                return model;
            }
            catch (Exception)
            {

                throw;
            }

        }
        /// <summary>
        /// 根据设备code查询设备
        /// </summary>
        /// <param name="code"></param>
        public ServDeviceInfoModel GetDeviceInfoByDeviceCode(string code)
        {
            try
            {
                ServDeviceInfoModel deviceModel = servDeviceInfoDAL.GetEntity(code);
                return deviceModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据基础设备类型id查询设备设备图标路径
        /// </summary>
        /// <param name="path"></param>
        /// <param name="deviceTypeID"></param>
        /// <returns></returns>
        public ServDefinedDeviceModel GetDeviceIcon(int industryId, int deviceTypeID)
        {
            DefinedDeviceToolCustom query = new DefinedDeviceToolCustom();
            query.industry_id = industryId;
            query.device_typeid = deviceTypeID;
            ServDefinedDeviceModel definedDevice = servDefinedDeviceDAL.GetDefinedDeviceByIndusryIdAndBaseDeviceTypeId(query);
            return definedDevice;
        }

        /// <summary>
        /// 修改设备
        /// </summary>
        /// <param name="deviceInfo"></param>
        /// <returns></returns>
        public bool UpdateDeviceInfo2D(ServDeviceInfoQuery deviceInfo)
        {
            try
            {
                bool result = false;
                int num = servDeviceInfoDAL.UpdateDeviceInfo2D(deviceInfo);
                result = true;
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        /// <summary>
        /// 注册25D设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool registerDevice25D(ServDeviceInfoModel model)
        {
            try
            {
                bool result = servDeviceInfoDAL.RegisterDevice25D(model);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 根据code删除设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public bool DeleteDeviceByCode(string code)
        {
            try
            {
                int num = servDeviceInfoDAL.DeleteDeviceInfoByCode(code);
                bool result = true;
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 宇视更新未注册设备列表
        /// </summary>
        /// <param name="xml"></param>
        public void UpdateUnRegisterDevice(string xml,string servIp,int regionId, out int total)
        {
            try
            {
                XmlDocument videoXml = new XmlDocument();
                videoXml.LoadXml(xml);
                XmlNode resNode = videoXml.SelectSingleNode("ResList");
                //资源总数
                total = Convert.ToInt32(((XmlElement)resNode).GetAttribute("count"));
                XmlNodeList itemList = resNode.ChildNodes;
                foreach (XmlNode item in itemList)
                {
                    ServTempDeviceModel model = new ServTempDeviceModel();
                    XmlElement resCode = (XmlElement)item.SelectSingleNode("ResCode");
                    model.device_code = resCode.InnerText;
                    XmlElement resName = (XmlElement)item.SelectSingleNode("ResName");
                    model.device_name = resName.InnerText;
                    XmlElement ResType = (XmlElement)item.SelectSingleNode("ResType");
                    string resType = ResType.InnerText;
                    if (resType == "1001")
                    {
                        XmlElement resSubType = (XmlElement)item.SelectSingleNode("ResSubType");
                        model.device_type = Convert.ToInt32(resSubType.InnerText);
                    }
                    else if (resType == "14")
                    {
                        model.device_type = 5;
                    }
                    model.subsystem_id = (int)SubSystem.视频子系统;
                    model.create_time = DateTime.Now;
                    ConvertChinese convertchinese = new ConvertChinese();
                    model.search_code = convertchinese.GetHeadOfChs(model.device_name);
                    model.ext1 = servIp;
                    //判断该条数据是否在未注册设备表
                    int num = servTempDeviceDAL.GetTempDeviceByCode(model.device_code);
                    int deviceNum = 0;
                    //判断该条数据是否在已注册设备表中已存在
                    ServDeviceInfoModel deviceModel = servDeviceInfoDAL.GetEntity(model.device_code);
                    if (deviceModel != null)
                    {
                        deviceNum = 1;
                    }
                    //在设备临时表和已注册的设备列表中都不存在则往临时表中写入数据
                    if (model.device_type == 5)//监视器
                    {
                        if (deviceNum == 0 && num == 0)
                        {
                            //直接添加到已注册设备列表中
                            ServDeviceInfoModel deviceInfo = new ServDeviceInfoModel();
                            deviceInfo.device_name = model.device_name;
                            deviceInfo.device_code = model.device_code;
                            deviceInfo.device_type = 5;
                            deviceInfo.device_status = Convert.ToInt32(((XmlElement)item.SelectSingleNode("ResStatus")).InnerText);
                            deviceInfo.subsystem_id = model.subsystem_id;
                            deviceInfo.is_parts = -2;
                            deviceInfo.register_time = DateTime.Now;
                            deviceInfo.create_time = DateTime.Now;
                            deviceInfo.search_code = convertchinese.GetHeadOfChs(deviceInfo.device_name);
                            deviceInfo.region_id = regionId;
                            deviceInfo.local_longitude = "";
                            deviceInfo.local_latitude = "";
                            deviceInfo.cover_range = 0;
                            deviceInfo.update_status_time = DateTime.Now;
                            deviceInfo.camera_towards = 0;
                            deviceInfo.visual_range = 0;
                            deviceInfo.asset_code = "";
                            deviceInfo.org_id = 0;
                            deviceInfo.guarantee_time = DateTime.Now;
                            deviceInfo.asset_status = 1;
                            deviceInfo.manager_id = 0;
                            deviceInfo.is_inbuilding = 0;
                            deviceInfo.room_id = 0;
                            deviceInfo.area_id = 0;
                            int deId = servDeviceInfoDAL.AddEntity(deviceInfo);
                        }
                    }
                    else
                    {
                        if (deviceNum == 0 && num == 0)
                        {
                            servTempDeviceDAL.AddEntity(model);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region 区域注册相关
        /// <summary>
        /// 获取区域树结构
        /// </summary>
        /// <param name="region_id">园区编号</param>
        /// <param name="path"></param>
        /// <returns></returns>
        public List<AreaInfoTreeCustom> GetAreaInfoTree(int region_id, string path)
        {
            try
            {
                //获取区域集合
                List<ServAreaInfoModel> areaList = servAreaInfoDAL.GetAreaInfoTree(region_id);
                int industryId = baseMapConfigBLL.GetDefaultIndustryXML(path);
                BaseAreaTypeQuery query = new BaseAreaTypeQuery();
                query.industryId = industryId;
                List<BaseAreaTypeModel> areaTypeList = baseAreaTypeDAL.GetEntities(query);
                List<AreaInfoTreeCustom> areaTreeList = new List<AreaInfoTreeCustom>();
                AreaInfoTreeCustom areaTree;
                for (int i = 0; i < areaTypeList.Count; i++)
                {
                    areaTree = new AreaInfoTreeCustom();
                    areaTree.id = areaTypeList[i].id;
                    areaTree.sId = areaTypeList[i].id;
                    areaTree.pId = -2;
                    areaTree.name = areaTypeList[i].type_name;
                    areaTreeList.Add(areaTree);
                    for (int j = 0; j < areaList.Count; j++)
                    {
                        if (areaList[j].area_type == areaTypeList[i].id)
                        {
                            areaTree = new AreaInfoTreeCustom();
                            areaTree.id = areaList[j].id;
                            areaTree.sId = 0;
                            areaTree.pId = areaTypeList[i].id;
                            areaTree.name = areaList[j].area_name;
                            areaTreeList.Add(areaTree);
                            areaList.Remove(areaList[j]);
                            j--;
                        }
                        else if (areaList[j].area_type == -1)//楼宇
                        {
                            areaTree = new AreaInfoTreeCustom();
                            areaTree.id = areaList[j].id;
                            areaTree.sId = 0;
                            areaTree.pId = -1;
                            areaTree.name = areaList[j].area_name;
                            areaTreeList.Add(areaTree);
                            areaList.Remove(areaList[j]);
                            j--;
                        }
                    }
                }
                areaTree = new AreaInfoTreeCustom();
                areaTree.id = 0;
                areaTree.sId = -1;
                areaTree.pId = -2;
                areaTree.name = "楼";
                areaTreeList.Add(areaTree);
                return areaTreeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        /// <summary>
        /// 区域注册
        /// </summary>
        /// <param name="servAreaInfoModel">区域表model</param>
        /// <param name="servBuildingInfoModel">楼宇表model</param>
        /// <param name="servBuildingAreaTypeModel">楼宇区域类型表model</param>
        /// <returns></returns>
        public bool AddArea(ServAreaInfoModel servAreaInfoModel, ServBuildingInfoModel servBuildingInfoModel, ServBuildingAreaTypeModel servBuildingAreaTypeModel)
        {
            try
            {
                bool result = false;
                if (servAreaInfoModel.area_type == -1)//注册为楼宇
                {
                    //注册楼宇事物回滚
                    result = servAreaInfoDAL.AddModel(servAreaInfoModel, servBuildingInfoModel, servBuildingAreaTypeModel);
                }
                else//单纯注册区域
                {
                    int id = servAreaInfoDAL.AddEntity(servAreaInfoModel);
                    if (id != 0)
                    {
                        result = true;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改区域
        /// </summary>
        /// <param name="servAreaInfoModel">区域表model</param>
        /// <param name="servBuildingInfoModel">楼宇表model</param>
        /// <param name="servBuildingAreaTypeModel">楼宇区域类型表model</param>
        /// <returns></returns>
        public bool UpdateArea(ServAreaInfoModel servAreaInfoModel, ServBuildingInfoModel servBuildingInfoModel, ServBuildingAreaTypeModel servBuildingAreaTypeModel)
        {
            try
            {
                bool result = false;
                //判断是否时区域修改成楼或者楼修改成区域
                ServAreaInfoModel oldAreaInfo = servAreaInfoDAL.GetEntity(servAreaInfoModel.id);
                if (oldAreaInfo.area_type != -1)//之前为区域，未关联楼宇
                {
                    if (servAreaInfoModel.area_type == -1)//注册为楼宇
                    {
                        //修改区域表
                        int num = servAreaInfoDAL.UpdateAreaInfoById(servAreaInfoModel);
                        //增加楼宇表
                        int id = servBuildingInfoDAL.AddEntity(servBuildingInfoModel);
                        //num = servBuildingInfoDAL.UpdateBuildingInfoById(servBuildingInfoModel);
                        //增加楼宇区域类型绑定
                        //num = servBuildingAreaTypeDAL.UpdateBuildingAreaTypeByBuildingId(servBuildingAreaTypeModel);
                        servBuildingAreaTypeModel.building_id = id;
                        num = servBuildingAreaTypeDAL.AddEntity(servBuildingAreaTypeModel);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                    else//单纯注册区域
                    {
                        //修改区域表
                        int num = servAreaInfoDAL.UpdateAreaInfoById(servAreaInfoModel);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                }
                else//之前注册为楼
                {
                    if (servAreaInfoModel.area_type == -1)//注册为楼宇
                    {
                        //修改区域表
                        int num = servAreaInfoDAL.UpdateAreaInfoById(servAreaInfoModel);
                        //修改楼宇表
                        ServBuildingInfoModel buildingModel = servBuildingInfoDAL.GetBuildinginfoByAreaID(servAreaInfoModel.id);
                        servBuildingInfoModel.id = buildingModel.id;
                        num = servBuildingInfoDAL.UpdateBuildingInfoById(servBuildingInfoModel);

                        //修改楼宇区域类型绑定
                        servBuildingAreaTypeModel.building_id = buildingModel.id;
                        num = servBuildingAreaTypeDAL.UpdateBuildingAreaTypeByBuildingId(servBuildingAreaTypeModel);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                    else//单纯注册区域
                    {
                        //修改区域表
                        int num = servAreaInfoDAL.UpdateAreaInfoById(servAreaInfoModel);
                        ServBuildingInfoModel buildingModel = servBuildingInfoDAL.GetBuildinginfoByAreaID(servAreaInfoModel.id);
                        //删除楼宇表
                        num = servBuildingInfoDAL.DeleteBuildingInfoById(buildingModel.id);
                        //删除楼宇区域类型关联
                        num = servBuildingAreaTypeDAL.DeleteBuildingAreaTypeByBuildingId(buildingModel.id);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                }

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 删除区域
        /// </summary>
        /// <param name="areaId">区域id</param>
        /// <returns></returns>
        public bool DeleteArea(int areaId)
        {
            try
            {
                bool result = false;
                int num = servAreaInfoDAL.HideAreaInfoById(areaId);
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
        /// 区域注册2.5D的区域
        /// </summary>
        /// <param name="id">区域的id</param>
        /// <param name="area_25D_location">区域的2.5D坐标</param>
        /// <returns></returns>
        public bool RegisterArea25D(int id, string area_25D_location)
        {
            try
            {
                ServAreaInfoModel model = new ServAreaInfoModel();
                model.id = id;
                model.area_25D_location = area_25D_location;
                return servAreaInfoDAL.RegisterArea25D(model);

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 楼内图注册
        /// <summary>
        /// 获取楼宇和楼层树
        /// </summary>
        /// <returns></returns>
        public List<BuildingInfoTreeCustom> GetBuildingTree(int industryID, int regionID)
        {
            try
            {
                //获取行业下所有的区域
                
                ServAreaInfoBLL servAreaInfoBLL = new ServAreaInfoBLL();
                List<AreaInfoCustom> industryAreaList = servAreaInfoBLL.GetAreaInfoAndBuilding(regionID, industryID);
                //根据区域类型id查询所有的楼宇
                List<ServBuildingInfoModel> buildingInfoList = new List<ServBuildingInfoModel>();
                for (int i = 0; i < industryAreaList.Count; i++)
                {
                    ServBuildingInfoModel buildingModel = servBuildingInfoDAL.GetBuildinginfoByAreaID(industryAreaList[i].id);
                    if (buildingModel != null)
                    {
                        buildingInfoList.Add(buildingModel);
                    }
                }
                //获取楼宇下所有的楼层
                BuildingInfoTreeCustom treeCustom;
                List<BuildingInfoTreeCustom> treeCustomList = new List<BuildingInfoTreeCustom>();
                for (int i = 0; i < industryAreaList.Count; i++)
                {
                    if (industryAreaList[i].area_type == -1)
                    {
                        treeCustom = new BuildingInfoTreeCustom();
                        treeCustom.id = industryAreaList[i].id + 1000;//名字显示根据区域的名称来，父类id为区域的id
                        treeCustom.building_id = industryAreaList[i].building_id;
                        treeCustom.pId = -1;
                        treeCustom.name = industryAreaList[i].area_name + "(编号:" + industryAreaList[i].building_id + ")";
                        treeCustomList.Add(treeCustom);
                        List<ServFloorInfoModel> floorInfoList = servFloorInfoDAL.GetFloorInfoByBuildingID(industryAreaList[i].building_id);
                        for (int j = 0; j < floorInfoList.Count; j++)
                        {
                            treeCustom = new BuildingInfoTreeCustom();
                            treeCustom.id = floorInfoList[j].id;
                            treeCustom.pId = industryAreaList[i].id + 1000;
                            treeCustom.building_id = floorInfoList[j].building_id;
                            treeCustom.floor_code = floorInfoList[j].floor_code;
                            treeCustom.point1 = floorInfoList[j].point1;
                            treeCustom.point2 = floorInfoList[j].point2;
                            treeCustom.rank = floorInfoList[j].rank;
                            treeCustom.floor_src_2d = floorInfoList[j].floor_src_2d;// "../images/map/buildingImage/" + industryAreaList[i].area_name + "/" + floorInfoList[j].floor_src_2d;
                            //treeCustom.super_floor_src_2d = floorInfoList[j].floor_src_2d;
                            treeCustom.name = floorInfoList[j].floor_name;
                            treeCustomList.Add(treeCustom);
                        }
                    }


                }
                return treeCustomList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 楼内图注册
        /// </summary>
        /// <param name="floorModel">楼层model</param>
        /// <param name="buildingName">楼宇名称</param>
        public int AddFloorInfo(ServFloorInfoModel floorModel, string buildingName)
        {
            try
            {
                //根据楼名称加上层名称生产层code
                ConvertChinese chinese = new ConvertChinese();
                string codes = chinese.GetHeadOfChs(buildingName + floorModel.floor_name);
                floorModel.floor_code = codes;
                int id = servFloorInfoDAL.AddEntity(floorModel);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 验证盖层楼是否已注册
        /// </summary>
        /// <param name="floorNum">楼层号</param>
        public bool VerifyFloorNum(int floorNum, int buildingID, int floorID, string path)
        {
            try
            {
                ServBuildingInfoModel buildingModel = servBuildingInfoDAL.GetEntity(buildingID);
                if (buildingModel != null)
                {
                    if (floorID != 0)//修改验证
                    {
                        ServFloorInfoModel floorInfo = servFloorInfoDAL.GetFloorInfoByFloorNumAndBuildingID(buildingModel.id, floorNum, floorID);
                        if (floorInfo != null)
                        {
                            return true;
                        }
                    }
                    else//新增验证
                    {
                        ServFloorInfoModel floorInfo = servFloorInfoDAL.GetFloorInfoByFloorNumAndBuildingID(buildingModel.id, floorNum);
                        if (floorInfo != null)
                        {
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改楼内图
        /// </summary>
        /// <param name="floorModel">楼层model</param>
        /// <param name="buildingName">楼宇名称</param>
        /// <returns></returns>
        public bool UpdateFloorInfo(ServFloorInfoModel floorModel, string buildingName)
        {
            try
            {
                //根据楼名称加上层名称生产层code
                ConvertChinese chinese = new ConvertChinese();
                string codes = chinese.GetHeadOfChs(buildingName + floorModel.floor_name);
                floorModel.floor_code = codes;
                int num = servFloorInfoDAL.UpdateFloorInfoById(floorModel);
                bool result = false;
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
        /// 删除楼层
        /// </summary>
        /// <param name="floorID">楼层id</param>
        /// <returns></returns>
        public bool DeleteFloorInfo(int floorID, string path, string serverPath)
        {
            try
            {
                //int mapEngine = baseMapConfigBLL.GetMapEngine(path);
                //if (mapEngine == (int)MapEngine.DGIS)
                //{
                //    //删除楼内图图片
                //    ServFloorInfoModel floorModel = servFloorInfoDAL.GetEntity(floorID);
                //    if (floorModel != null)
                //    {
                //        ServBuildingInfoModel buildingModel = servBuildingInfoDAL.GetEntity(floorModel.building_id);
                //        if (buildingModel != null)
                //        {
                //            string filePath = serverPath + "images/map/buildingImage/" + buildingModel.building_name + "/" + floorModel.floor_src_2d;
                //            if (File.Exists(filePath))
                //            {
                //                File.Delete(filePath);
                //            }
                //        }
                //    }
                //}
                //删除数据
                int num = servFloorInfoDAL.DeleteFloorInfoById(floorID);
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateRank(string building_id, string[] array)
        {
            try
            {
                bool result = false;
                string[] rankArray = array;
                int updateNum = 0;
                ServFloorInfoModel floorInfoModel = new ServFloorInfoModel();
                for (int i = 0; i < rankArray.Length; i++)
                {
                    floorInfoModel = new ServFloorInfoModel();
                    floorInfoModel.building_id = int.Parse(building_id);
                    floorInfoModel.id = int.Parse(rankArray[i]);
                    floorInfoModel.rank = i + 1;
                    int updateid = servFloorInfoDAL.UpdateRank(floorInfoModel);
                    if (updateid > 0)
                    {
                        updateNum++;
                    }

                }
                if (updateNum == rankArray.Length)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion
    }
}
