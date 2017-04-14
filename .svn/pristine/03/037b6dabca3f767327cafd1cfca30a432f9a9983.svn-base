using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DevicePlanRelationInfoModel
    {   /// <summary>
        ///预案表 
        /// </summary>
        public ServDevicePlanModel entity { set; get; }

        public List<ServDevicePlanModel> entityList { set; get; }

        public ServExecutionTimeModel servExecutionTime { set; get; }
        /// <summary>
        /// 预案确警前处置项表
        /// </summary>
        public List<ServPlanHandleItemModel> defaultPlanHandleItemList { set; get; }
        /// <summary>
        /// 预案确警后处置项表
        /// </summary>
        public List<ServPlanHandleItemModel> cnfirmPlanHandleItemList { set; get; }
        /// <summary>
        /// 预案确警前责任人关联表
        /// </summary>
        public List<ServPlanPersonModel> defaultPersonList { set; get; }
        /// <summary>
        /// 预案确警后责任人关联表
        /// </summary>
        public List<ServPlanPersonModel> cnfirmPlanPersonList { set; get; }
        /// <summary>
        /// 关联摄像头信息
        /// </summary>
        public List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList { set; get; }

        //设备园区信息
        public  BaseRegionConfigModel BaseRegionConfigInfo { set; get; }

    }
}
