using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Model.SubSystemModel;

namespace CSM.BLL
{
    public class RelayBLL
    {
        private BaseRegionConfigDAL regionDal = new BaseRegionConfigDAL();
        private BaseRelayConfigDAL relayDal = new BaseRelayConfigDAL();
        /// <summary>
        /// 分页获取园区
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetBaseRegionPages(int pageIndex, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel query = new PageModel();
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                return regionDal.GetRegionPages(query, out totalNumber);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取报警灯配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<BaseRelayConfigModel> GetAlarmLampByRegion(int regionId)
        {
            try
            {
                List<BaseRelayConfigModel> retRelayList = new List<BaseRelayConfigModel>();
                BaseRelayConfigModel relay = null;
                BaseRegionConfigDAL regionDal = new BaseRegionConfigDAL();
                List<BaseRegionConfigModel> regionList = regionDal.GetAllRegionConfig();
                List<BaseRelayConfigModel> relayList = relayDal.GetAlarmLampByRegion(regionId);
                for (int i = 0; i < relayList.Count; i++)
                {
                    relay = new BaseRelayConfigModel();
                    relay.control_id = relayList[i].control_id;
                    relay.ext3 = regionList.Where(n => n.id == relayList[i].region_id).FirstOrDefault() == null ? "" : regionList.Where(n => n.id == relayList[i].region_id).FirstOrDefault().region_code;
                    relay.id = relayList[i].id;
                    relay.region_id = relayList[i].region_id;
                    relay.relay_content = relayList[i].relay_content;
                    relay.relay_type = relayList[i].relay_type;
                    retRelayList.Add(relay);
                }
                return retRelayList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过ID删除报警灯配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteRelayById(int id)
        {
            try
            {
                int res = relayDal.DeleteBaseRelayConfigById(id);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改报警灯配置
        /// </summary>
        /// <returns></returns>
        public bool UpdateBaseRelayConfigById(int id, string color, int relayType, int controlId, int regionId)
        {
            try
            {
                BaseRelayConfigModel model = new BaseRelayConfigModel();
                model.id = id;
                model.control_id = controlId;
                model.region_id = regionId;
                model.relay_content = color;
                model.relay_type = relayType;
                int res = relayDal.UpdateBaseRelayConfigById(model);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增报警灯配置
        /// </summary>
        /// <param name="color"></param>
        /// <param name="relayType"></param>
        /// <param name="controlId"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public bool AddRelayConfig(string color, int relayType, int controlId, int regionId)
        {
            try
            {
                BaseRelayConfigModel model = new BaseRelayConfigModel();
                model.control_id = controlId;
                model.region_id = regionId;
                model.relay_content = color;
                model.relay_type = relayType;
                int res = relayDal.AddEntity(model);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID删除报警灯配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public bool DeleteBaseRelayConfigByRegionId(int regionId)
        {

            try
            {
                int res = relayDal.DeleteBaseRelayConfigByRegionId(regionId);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 发送报警灯信息
        /// </summary>
        /// <param name="regionCode"></param>
        /// <param name="content"></param>
        public RetMsgModel SendRelayMessage(string regionCode, int controlId, int op)
        {
            try
            {
                RetMsgModel retModel = new RetMsgModel();
                RelayMsgModel ledMsgModel = new RelayMsgModel();
                ledMsgModel.controlId = controlId; //控制器编号
                ledMsgModel.regionCode = regionCode;
                ledMsgModel.op = op;  //1：开，0：关，3：全开，4：全关
                string param = CSM.Utils.JsonHelper.ObjectToString(ledMsgModel);
                string url = System.Configuration.ConfigurationManager.AppSettings["InterfaceUrl"] + "/api/Interface/RelayControlCommand";
                string ret = Utils.HttpHelper.PostWebRequestBandError(url, param, "application/json;charset=utf-8", Encoding.UTF8);
                //RetMsgModel retModel = Utils.JsonHelper.StringToObject<RetMsgModel>(ret);
                if (string.IsNullOrEmpty(ret))
                {
                    retModel.status = 1;
                    retModel.message = "调用中间件报警灯接口返回值为空！";
                }
                else
                {
                    retModel = Utils.JsonHelper.StringToObject<RetMsgModel>(ret);
                }
                return retModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
