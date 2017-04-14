using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServDeviceInfoBLL
    {
        private CSM.DAL.ServDeviceInfoDAL servDeviceInfoDAL = new DAL.ServDeviceInfoDAL();

        ///// <summary>
        ///// 得到ServDeviceInfo设备表中所有的数据
        ///// </summary>
        ///// <returns></returns>
        //public List<CSM.Model.ServDeviceInfoModel> GetEntities()
        //{
        //    try
        //    {
        //        CSM.Model.QueryModel.ServDeviceInfoQuery servDeviceInfoQuery = new Model.QueryModel.ServDeviceInfoQuery();
        //        return servDeviceInfoDAL.GetEntities(servDeviceInfoQuery);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        /// <summary>
        /// 获取所有的设备和图标地址联合
        /// </summary>
        /// <returns></returns>
        public List<DeviceInfoCustom> GetDeviceInfoAndIconUrl(int region_id, int industry_id)
        {
            try
            {
                ServDefinedDeviceModel model = new ServDefinedDeviceModel();//要传园区id和行业ID，所以这个数据库只能传一个条件查询，所以借用这个BaseIndustryDeviceModel
                model.industry_id = industry_id;
                model.base_device_type_id = region_id;
                List<DeviceInfoCustom> deviceList = servDeviceInfoDAL.GetDeviceInfoAndIconUrl(model);
                return deviceList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 获取25D未注册设备列表
        /// </summary>
        /// <param name="region_id"></param>
        /// <param name="industry_id"></param>
        /// <returns></returns>
        public List<DeviceInfoCustom> GetDeviceInfoAndIconUrlToRegister25d(int region_id, int industry_id)
        {
            try
            {
                ServDefinedDeviceModel model = new ServDefinedDeviceModel();
                model.industry_id = industry_id;
                model.base_device_type_id = region_id;
                //取出25D未注册设备
                List<ServDeviceInfoModel> deviceList = servDeviceInfoDAL.Get25DUnRegisterDevice(model);
                DeviceInfoCustom deviceInfoCustomTree = new DeviceInfoCustom();
                List<DeviceInfoCustom> deviceInfoCustomTreeList = new List<DeviceInfoCustom>();
                //加入树结构中
                for (int i = 0; i < deviceList.Count; i++)
                {
                    deviceInfoCustomTree = new DeviceInfoCustom();
                    deviceInfoCustomTree.pid = 0;
                    deviceInfoCustomTree.id = deviceList[i].id;
                    deviceInfoCustomTree.device_name = deviceList[i].device_name;
                    deviceInfoCustomTreeList.Add(deviceInfoCustomTree);
                }
                deviceInfoCustomTree = new DeviceInfoCustom();
                deviceInfoCustomTree.pid = -1;
                deviceInfoCustomTree.id = 0;
                deviceInfoCustomTree.device_name = "25D未注册设备";
                deviceInfoCustomTreeList.Add(deviceInfoCustomTree);
                return deviceInfoCustomTreeList;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 根据设备获取设备名称 2016.12.04 乔会会
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public CSM.Model.ServDeviceInfoModel GetDeviceNameById(int Deviceid)
        {
            try
            {
                return servDeviceInfoDAL.GetEntity(Deviceid);
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
        public List<CSM.Model.ServDeviceInfoModel> GetAllDevice(int deviceType, int regionId)
        {
            try
            {

                return servDeviceInfoDAL.GetAllDevice(deviceType, regionId);
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
        public List<CSM.Model.ServDeviceInfoModel> GetAllDeviceInfo(int deviceType, int regionId, int inbuildingId)
        {
            try
            {

                return servDeviceInfoDAL.GetAllDeviceInfo(deviceType, regionId, inbuildingId);
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
        public List<CSM.Model.ServDeviceInfoModel> GetCameraInfo(int industryId, int regionId)
        {
            try
            {
                return servDeviceInfoDAL.GetCameraInfo(industryId, regionId);
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
        public ServFloorInfoModel GetMapBuildingInfo(int deviceId, int maptype)
        {
            try
            {
                ServFloorInfoModel FloorInfomodel = new ServFloorInfoModel();
                BuildingAreaInfo model = servDeviceInfoDAL.GetMapBuildingInfo(deviceId);
                if (model != null)
                {
                    FloorInfomodel.id = model.id;
                    FloorInfomodel.building_id = model.building_id;
                    FloorInfomodel.floor_code = model.floor_code;
                    FloorInfomodel.floor_name = model.floor_name;
                    FloorInfomodel.floor_src_25d = model.floor_src_25d;
                    FloorInfomodel.point1 = model.point1;
                    FloorInfomodel.point2 = model.point2;
                    FloorInfomodel.rank = model.rank;
                    // '../images/map/buildingImage/' + floorinfo.building_id + '/' + floorinfo.floor_src_2d + '.png';
                    if (maptype == (int)EnumClass.MapEngine.DGIS)
                    {
                        FloorInfomodel.floor_src_2d = "../images/map/buildingImage/" + model.building_id + "/" + model.floor_src_2d + ".png";
                    }
                    else if (maptype == (int)EnumClass.MapEngine.超图)
                    {
                        FloorInfomodel.floor_src_2d = model.floor_src_2d;
                    }

                    return FloorInfomodel;
                }
                else
                {
                    return null;
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region 根据设备id获取周围摄像头
        /// <summary>
        /// 通过设备的id得到设备周围的摄像头
        /// </summary>
        /// <param name="id">目标设备的id</param>
        /// <param name="distance">距离，单位为m</param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceNearCameraByDeviceId(int id, int distance)
        {
            try
            {
                //返回的结果
                List<ServDeviceInfoModel> resultCamera = new List<ServDeviceInfoModel>();
                //根据id查询到的设备
                ServDeviceInfoModel targetDevice = new ServDeviceInfoModel();
                targetDevice = GetDeviceNameById(id);

                if (targetDevice != null)
                {
                    //查询到设备的经纬度
                    double tlat = double.Parse(targetDevice.latitude);
                    double tlng = double.Parse(targetDevice.longitude);
                    List<ServDeviceInfoModel> cameraModelList = new List<ServDeviceInfoModel>();
                    cameraModelList = servDeviceInfoDAL.GetDeviceNearCameraByDeviceId(id);
                    for (int i = 0; i < cameraModelList.Count; i++)
                    {
                        ServDeviceInfoModel cameraDevice = cameraModelList[i];
                        if (targetDevice.is_inbuilding == -1 && cameraDevice.is_inbuilding == -1)//如果目标设备在楼外,则要求摄像头也要是楼外的
                        {
                            if (!String.IsNullOrEmpty(cameraModelList[i].latitude) && !String.IsNullOrEmpty(cameraModelList[i].longitude))
                            {
                                double clat = double.Parse(cameraModelList[i].latitude);
                                double clng = double.Parse(cameraModelList[i].longitude);

                                double d = GetDistance(tlat, tlng, clat, clng);
                                if (d <= distance)
                                {
                                    resultCamera.Add(cameraDevice);
                                }
                            }
                        }
                        //如果目标设备在楼内,则摄像头不做限定
                        else if (targetDevice.is_inbuilding != -1)
                        {
                            //如果是楼内的摄像头，将楼内的全部返回
                            if (cameraDevice.is_inbuilding == targetDevice.is_inbuilding)
                            {
                                resultCamera.Add(cameraDevice);
                            }
                            //如果不是楼内的则做距离的判断
                            else if (cameraDevice.is_inbuilding != targetDevice.is_inbuilding)
                            {
                                if (!String.IsNullOrEmpty(cameraModelList[i].latitude) && !String.IsNullOrEmpty(cameraModelList[i].longitude))
                                {
                                    double clat = double.Parse(cameraModelList[i].latitude);
                                    double clng = double.Parse(cameraModelList[i].longitude);

                                    double d = GetDistance(tlat, tlng, clat, clng);
                                    if (d <= distance)
                                    {
                                        resultCamera.Add(cameraDevice);
                                    }
                                }
                            }
                        }
                    }

                }
                return resultCamera;
            }
            catch (Exception)
            {

                throw;
            }
        }


        private const double EARTH_RADIUS = 6378137;//地球半径
        private static double rad(double d)
        {
            return d * Math.PI / 180.0;
        }

        public static double GetDistance(double lat1, double lng1, double lat2, double lng2)
        {
            double radLat1 = rad(lat1);
            double radLat2 = rad(lat2);
            double a = radLat1 - radLat2;
            double b = rad(lng1) - rad(lng2);

            double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
             Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
            s = s * EARTH_RADIUS;
            s = Math.Round(s * 10000) / 10000;
            return s;
        }
        #endregion

    }
}
