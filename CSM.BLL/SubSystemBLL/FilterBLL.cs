using CSM.Common;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
   public class FilterBLL
    {
        /// <summary>
        /// 处理转发层数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public bool  HandleSystemData(InterfaceData info)
        {
            try
            {
              //  InterfaceData data = JsonHelper.StringToObject<InterfaceData>(info);
                switch (info.subSysType)
                {
                    case (int)EnumClass.SubSystem.丛文报警子系统:
                        //TODO
                        CowinBLL cowinBll = new CowinBLL();
                        cowinBll.HandleCowinData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.停车子系统:
                        //TODO
                        VehicleBLL vehicleBll = new VehicleBLL();
                        vehicleBll.HandleVehicleData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.动力环境检测:
                        //TODO
                        PowerEnvironmentBLL pwEnvirBll = new PowerEnvironmentBLL();
                        pwEnvirBll.HandlePowerEnvironmentData(info.dataType, info.data, info.mark);
                        break;
                    //case (int)EnumClass.SubSystem.北理巡更子系统:
                    //    //TODO
                    //    BITPatrolBLL bitPatrolBll = new BITPatrolBLL();
                    //    bitPatrolBll.HandleBITPatrolData(info.dataType, info.data, info.mark);
                    //    break;
                    case (int)EnumClass.SubSystem.周界子系统:
                        //TODO
                        PerimeterBLL perimeterBll = new PerimeterBLL();
                        perimeterBll.HandlePerimeterData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.巡更子系统:
                        //TODO
                        PatrolBLL patrolBll = new PatrolBLL();
                        patrolBll.HandlePatrolData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.智能视频分析子系统:
                        //TODO
                        IntelligentBLL intelligentBll = new IntelligentBLL();
                        intelligentBll.HandleIntelligentData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.消防子系统:
                        //TODO
                        FireBLL fireBll = new FireBLL();

                        fireBll.HandleFireData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.视频子系统:
                        //TODO
                        VideoBLL videoBll = new VideoBLL();
                        videoBll.HandleVideoData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.门禁子系统:
                        //TODO
                        EntranceBLL entranceBll = new EntranceBLL();
                        entranceBll.HandleEntranceData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.霍尼韦尔报警子系统:
                        //TODO
                        HoneywellBLL honeywellBll = new HoneywellBLL();
                        honeywellBll.HandleHoneywellData(info.dataType, info.data, info.mark);
                        break;
                    case (int)EnumClass.SubSystem.传感器:
                        //TODO
                        SensorBLL sensorBll = new SensorBLL();
                        sensorBll.HandleSensorData(info.dataType, info.data, info.mark);
                        break;
                    default:
                        //TODO
                        break;
                }
                return true;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("数据过滤处理失败！"+ex.Message);
                return false;
            }
        }
    }
}
