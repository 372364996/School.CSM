using CSM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class MapLoadBLL
    {
        /// <summary>
        /// 根据园区编号获取园区所有已注册设备
        /// </summary>
        /// <param name="regionID"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetAllDevice(int regionID)
        {
            List<ServDeviceInfoModel> list = new List<ServDeviceInfoModel>();
            return list;
        }
    }
}
