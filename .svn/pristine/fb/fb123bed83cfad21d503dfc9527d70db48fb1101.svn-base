using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class CowinBLL : AbstractFilter
    {
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        /// <summary>
        /// 处理丛文数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandleCowinData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.CowinData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.丛文报警子系统);
                    break;
                case (int)EnumClass.CowinData.设备数据:
                    HandleCowinDeviceData(message, mark);
                    break;
                default: break;
            }
            return true;
        }
        /// <summary>
        /// 处理丛文设备数据
        /// </summary>
        /// <returns></returns>
        private bool HandleCowinDeviceData(object message, string mark)
        {
            try
            {
                List<DeviceModel> deviceList = JsonHelper.StringToObject<List<DeviceModel>>(message.ToString());
                ServTempDeviceDAL tempDeviceDal = new ServTempDeviceDAL();
                ServDeviceInfoDAL deviceInfoDal = new ServDeviceInfoDAL();
                ConvertChinese convert = new ConvertChinese();
                List<BaseDeviceTypeModel> typeList = null;
                try
                {
                    typeList = baseMapConfigBLL.GetAllBaseDeviceTypeModel();
                }
                catch (Exception ex)
                {
                    Log4NetHelp.Error("获取基本设备类型失败！" + ex.Message);
                }
                for (int i = 0; i < deviceList.Count; i++)
                {
                    //int tempNum = tempDeviceDal.GetTempDeviceByCode(deviceList[i].deviceCode);
                    ServTempDeviceModel tempDevice = tempDeviceDal.GetTempDeviceByDeviceCode(deviceList[i].deviceCode);
                    ServDeviceInfoModel deviceInfo = deviceInfoDal.GetDeviceByDeviceCode(deviceList[i].deviceCode);
                    if (tempDevice == null && deviceInfo == null)
                    {
                        ServTempDeviceModel model = new ServTempDeviceModel();
                        var type = typeList.Where(n => n.type_name == deviceList[i].typeName).FirstOrDefault();
                        model.device_type = type == null ? 0 : type.id;
                        model.create_time = DateTime.Now;
                        model.device_code = deviceList[i].deviceCode;
                        model.device_name = deviceList[i].deviceName;
                        model.search_code = convert.GetHeadOfChs(deviceList[i].deviceName);
                        model.subsystem_id = deviceList[i].subsystemId;
                        model.ext1 = deviceList[i].serverIp;
                        try
                        {
                            int res= tempDeviceDal.AddEntity(model);
                            if (res == 0)
                            {
                                Log4NetHelp.Error("设备code：" + deviceList[i].deviceCode + " 设备名称：" + deviceList[i].deviceName + " 插入临时表失败！");
                            }
                            else
                            {
                                Log4NetHelp.Info("设备code：" + deviceList[i].deviceCode + " 设备名称：" + deviceList[i].deviceName + " 插入临时表成功！");
                            }
                        }
                        catch (Exception ex)
                        {
                            Log4NetHelp.Error("设备code：" + deviceList[i].deviceCode + " 设备名称：" + deviceList[i].deviceName + " 插入临时表失败！" + ex.Message);
                        }
                    }
                    else if (tempDevice != null)
                    {
                        Log4NetHelp.Error("设备code：" + deviceList[i].deviceCode + " 设备名称：" + deviceList[i].deviceName + " 在临时设备表已存在！");
                    }
                    else if (deviceInfo != null)
                    {
                        Log4NetHelp.Error("设备code：" + deviceList[i].deviceCode + " 设备名称：" + deviceList[i].deviceName + " 在设备表已存在！");
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("标识为：" + mark + "驱动同步丛文设备数据失败！" + ex.Message);
                return false;
            }
        }
    }
}
