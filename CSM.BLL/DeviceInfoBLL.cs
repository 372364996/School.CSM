using CSM.DAL;
using CSM.Model;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class DeviceInfoBLL
    {
        private ServDeviceInfoDAL servDeviceInfoDAL = new ServDeviceInfoDAL();
        /// <summary>
        /// 获取设备列表
        /// </summary>
        /// <param name="deviceName">设备名称</param>
        /// <param name="deviceCode">设备编码</param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceInfoList(string deviceName,string deviceCode,int regionId,int deviceType,int pageIndex,int pageSize,out int total)
        {
            try
            {
                ServDeviceInfoQuery query = new ServDeviceInfoQuery();
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.device_name = deviceName;
                query.device_code = deviceCode;
                query.region_id = regionId;
                query.device_type = deviceType;
                List<ServDeviceInfoModel> deviceList = servDeviceInfoDAL.GetEntities(query,out total);
                return deviceList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据id获取设备
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDeviceInfoModel GetDeviceInfoById(int id)
        {
            try
            {
                return servDeviceInfoDAL.GetEntity(id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据设备code查询设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public ServDeviceInfoModel GetDeviceInfoByDeviceCode(string code)
        {
            try
            {
                return servDeviceInfoDAL.GetEntity(code);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改设备信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateDeviceInfo(ServDeviceInfoModel model)
        {
            try
            {
                bool result = false;
                int num = servDeviceInfoDAL.UpdateDeviceInfo(model);
                result = true;
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据设备组id获取组下所有的设备
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetDeviceInfoByGroupId(int groupId,int industryId)
        {
            try
            {
                List<ServDeviceInfoModel> deviceList = new List<ServDeviceInfoModel>();
                if (groupId == 0)//未分组的设备
                {
                    deviceList = servDeviceInfoDAL.GetNotRegisterDeviceInfoByIndustryId(industryId);
                }
                else
                {
                    deviceList= servDeviceInfoDAL.GetDeviceInfoByGroupId(groupId);
                }
                return deviceList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
