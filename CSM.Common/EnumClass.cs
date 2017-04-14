using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Common
{
    public class EnumClass
    {
        /// <summary>
        /// 根据key范围获取枚举键值对
        /// </summary>
        /// <typeparam name="T">枚举类型</typeparam>
        /// <param name="min">最小值(类型为int)</param>
        /// <param name="max">最大值(类型为int)</param>
        /// <returns>枚举键值对</returns>
        public static List<EnumModel> GetEnumModelList<T>(int min, int max) where T : struct
        {
            List<EnumModel> enumList = new List<EnumModel>();
            if (!typeof(T).IsEnum)
            {
                throw new Exception("类型参数不合法，当前泛型类的类型参数必须为枚举类型");
            }
            else
            {
                string[] keys = Enum.GetNames(typeof(T));
                Array values = Enum.GetValues(typeof(T));
                System.Collections.ArrayList arrList = new System.Collections.ArrayList();
                foreach (var val in values)
                {
                    int entity = Convert.ToInt32(val);
                    if (entity >= min && entity <= max)
                    {
                        arrList.Add(entity);
                    }
                }
                foreach (var n in arrList)
                {
                    EnumModel model = new EnumModel();
                    model.key = (int)n;
                    model.value = Enum.GetName(typeof(T), n);
                    enumList.Add(model);
                }

            }
            return enumList;
        }
        /// <summary>
        /// 重载获取枚举键值对
        /// </summary>
        /// <typeparam name="T">枚举类型</typeparam>
        /// <returns>枚举键值对</returns>
        public static List<EnumModel> GetEnumModelList<T>() where T : struct
        {
            List<EnumModel> enumList = new List<EnumModel>();
            if (!typeof(T).IsEnum)
            {
                throw new Exception("类型参数不合法，当前泛型类的类型参数必须为枚举类型");
            }
            else
            {
                Array arr = Enum.GetValues(typeof(T));
                Array.Sort(arr);
                int min = Convert.ToInt32(arr.GetValue(0));
                int max = Convert.ToInt32(arr.GetValue(arr.Length - 1));
                enumList = GetEnumModelList<T>(min, max);
            }
            return enumList;
        }

        /// <summary>
        /// 地图引擎
        /// </summary>
        public enum MapEngine
        {
            超图 = 1,
            DGIS
        }
        public enum MapType
        {
            二维 = 1,
            二点五维
        }
        /// <summary>
        /// 园区类型
        /// </summary>
        public enum RegionType
        {
            主园区 = 1,
            副园区
        }
        /// <summary>
        /// 本地园区非本地园区（李昕_20170225加,本地园区非本地园区）
        /// </summary>
        public enum regionIsLocal
        {
            本地园区 = 0,
            非本地园区
        }

        public enum RegionExtendConfigType
        {
            主控IP = 1,
            四色灯 = 2,
            LED = 3,
            websocket = 4,
            大屏 = 5,
            应急电话 = 6,
            视频配置 = 7
        }
        #region 视频平台
        /// <summary>
        /// 视频平台
        /// </summary>
        public enum VideoPlatform
        {
            宇视 = 1,
            海康,
            博世
        }
        #endregion
        //文件类型
        public enum FileType
        {
            图片 = 1,
            视频 = 2,
            Excel = 3,
            压缩文件 = 4,
            文档 = 5,
            音频 = 6,
            文件
        }

        //文件表所有者枚举
        public enum PersonID
        {
            视频监控 = 1,
            综合告警 = 2,
            预案管理 = 3,
            接处警 = 4,
            卷宗管理 = 5,
            计划任务 = 6,
            人员架构 = 7,
            地图 = 8
        }


        #region  报警相关枚举
        /// <summary>
        /// 报警类型
        /// </summary>
        public enum AlarmType
        {
            设备报警 = 1,
            设备告警 = 2
        }
        /// <summary>
        /// 报警级别
        /// </summary>
        public enum AlarmLevel
        {
            紧急 = 1,
            高,
            中,
            低
        }
        /// <summary>
        /// 确警结果
        /// </summary>
        public enum ConfirmAlarmResult
        {
            真警执行预案 = 1,
            真警不执行预案,
            虚警
        }
        /// <summary>
        /// 确警状态
        /// </summary>
        public enum ConfirmAlarmState
        {
            确警 = 1,
            未确警
        }

        /// <summary>
        /// websocket数据类型
        /// </summary>
        public enum WebSocketMsgType
        {
            设备预案 = 1,
            事件预案 = 2,
            实时数据 = 3,
            计划任务 = 4
        }
        /// <summary>
        /// 设备告警状态枚举
        /// </summary>
        public enum InformAlarmStatus
        {
            未处理 = 1,
            处理中 = 2,
            已处理
        }
        /// <summary>
        /// 设备告警类型
        /// </summary>
        public enum DeviceInformAlarmType
        {
            设备损坏 = 1,
            设备丢失 = 2,
            设备移位 = 3,
            设备断电 = 4,
            设备无连接 = 5,
            视频图像错误 = 6,
            其他 = 7
        }
        #endregion

        #region  子系统相关枚举

        /// <summary>
        /// 基本子系统枚举
        /// </summary>
        public enum SubSystem
        {
            视频子系统 = 1,
            丛文报警子系统 = 2,
            消防子系统 = 3,
            停车子系统 = 4,
            门禁子系统 = 5,
            周界子系统 = 6,
            智能视频分析子系统 = 7,
            巡更子系统 = 8,
            动力环境检测 = 9,
            霍尼韦尔报警子系统 = 10,
            传感器 = 11
        }

        public enum HoneywellData
        {
            报警数据 = 1,
        }

        public enum FireData
        {
            报警数据 = 1,
        }

        public enum CowinData
        {
            报警数据 = 1,
            设备数据
        }

        public enum VehicleData
        {
            报警数据 = 1,
        }
        public enum PowerEnvironmentData
        {
            报警数据 = 1,
        }

        public enum EntranceData
        {
            报警数据 = 1,
        }
        public enum PatrolData
        {
            报警数据 = 1,
        }

        public enum VideoData
        {
            报警数据 = 1,
        }
        public enum SensorData
        {
            报警数据 = 1,
        }

        public enum PerimeterData
        {
            报警数据 = 1,
        }
        public enum IntelligentData
        {
            报警数据 = 1,
        }
        #endregion

        #region 设备相关
        public enum DeviceStates
        {
            在线 = 1,
            离线,
            不可用,
            设备损坏,
            设备丢失,
            设备移位,
            设备断电,
            设备无连接,
            视频图像错误,
            其他
        }
        /// <summary>
        /// 设备分组类型
        /// </summary>
        public enum GroupType
        {
            设备分组 = 1,
            视频轮播
        }
        /// <summary>
        /// 设备分组的设备类型
        /// </summary>
        public enum GroupDeviceType
        {
            视频 = 1,
            巡更
        }
        /// <summary>
        /// 摄像头覆盖角度
        /// </summary>
        public enum CameraCoverRange
        {
            三十度 = 30,
            六十度 = 60,
            九十度 = 90,
            三百六十度 = 360
        }
        /// <summary>
        /// 设备朝向
        /// </summary>
        public enum CameraTowards
        {
            东 = 1,
            西,
            南,
            北,
            东北,
            西北,
            东南,
            西南
        }
        /// <summary>
        /// 覆盖半径
        /// </summary>
        public enum CameraVisualRange
        {
            五米 = 5,
            十米 = 10,
            三十米 = 30,
            五十米 = 50
        }
        #endregion

        #region 预案相关枚举

        public enum PlanType
        {
            设备预案 = 1,
            事件预案


        }
        /// <summary>
        /// 预案条例等级
        /// </summary>
        public enum PlanRegulation
        {
            紧急 = 1,
            一般,
            非紧急
        }
        /// <summary>
        /// 设备预案默认处置选项
        /// </summary>
        public enum DevicePlanDefaultOptions
        {
            控制中心声光蜂鸣器开启 = 1,
            中控室LED信息显示,
            打开告警设备附近视频,
            相关摄像头上大屏,
            告警视频下载,
            关联摄像头,
            通知设备网格第一负责人,
            通知其他负责人
        }
        /// <summary>
        /// 事件预案打开周围摄像头的位置
        /// </summary>
        public enum CameraPosition
        {
            楼外 = 1,
            楼内
        }


        /// <summary>
        /// 设备预案确认处置选项
        /// </summary>
        public enum DevicePlanConfirmOptions
        {
            启动户外LED信息提示系统 = 1,
            是否转到卷宗,
            通知设备网格第一负责人,
            通知其他负责人

        }


        /// <summary>
        /// 事件预案默认处置选项
        /// </summary>
        public enum EventPlanDefaultOptions
        {
            控制中心声光蜂鸣器开启 = 1,
            中控室LED信息显示,
            相关摄像头上大屏,
            告警视频下载,
            通知设备网格第一负责人,
            打开周围摄像头,
            通知其他负责人
        }
        /// <summary>
        /// 事件预案确认处置选项
        /// </summary>
        public enum EventPlanConfirmOptions
        {
            启动户外LED信息提示系统 = 1,
            是否转到卷宗,
            通知设备网格第一负责人,
            通知其他负责人

        }
        /// <summary>
        /// 预案处置项执行结果
        /// </summary>
        public enum PlanItemResult
        {
            成功 = 1,
            失败,
            其他
        }
        /// <summary>
        /// 预案处置时间点
        /// </summary>
        public enum PlanHandleTime
        {
            确警前 = 1,
            确警后
        }

        public enum PlanLevel
        {
            高 = 1,
            中,
            低
        }


        #endregion

        /// <summary>
        /// 视频下载状态
        /// </summary>
        public enum VideoDownLoadStatus
        {
            下载失败 = -2,
            未开始下载 = -1,
            下载中 = 0,
            已下载 = 1
        }
        /// <summary>
        /// 视频下载类型
        /// </summary>
        public enum VideoDownLoadType
        {
            报警 = 1,
            自定义下载
        }
        public enum PlanStatus
        {
            废止 = -1,
            未启用 = 0,
            待审核 = 1,
            启用 = 2,
        }

        public enum ArchiveStatus
        {
            废止 = -2,
            新建 = 0,
            补录 = 1,
            结案 = 2,
        }
        /// <summary>
        /// 基本操作类型（打开/关闭）
        /// </summary>
        public enum Operation
        {
            关闭 = 0,
            打开 = 1,

        }
        public enum RelayType
        {
            四色灯 = 1,
        }

        /// <summary>
        /// 时间段枚举
        /// </summary>
        public enum PeriodType
        {
            Day,
            Week,
            Month,
            Quarter,
            FHalfYear,
            SHalfYear,
            Year
        }
        /// <summary>
        /// 执行周期关联类型
        /// </summary>
        public enum RelateType
        {
            设备预案 = 1,
            事件预案
        }


        #region  接处警枚举


        public enum IncidentStatus
        {
            接警 = 1,
            处警 = 2,
            结案 = 3
        }

        #endregion

        #region  计划任务相关枚举
        /// <summary>
        /// 计划任务类型
        /// </summary>
        public enum ScheduleType
        {
            视频轮播 = 1,
            质保期巡检 = 2,
            离线设备巡检 = 3,
            大事记 = 4
        }
        /// <summary>
        /// 计划任务状态
        /// </summary>
        public enum ScheduleState
        {
            废止 = -1,
            禁用 = 0,
            启用 = 1,

        }

        /// <summary>
        /// 时间频率类型
        /// </summary>
        public enum TimeFrequencyType
        {
            无 = -1,
            小时 = 1,
            天 = 2,
            月 = 3,
            周 = 4,
            年 = 5
        }
        #endregion

        #region 人员相关枚举
        /// <summary>
        /// 人员类型
        /// </summary>
        public enum PersonType
        {
            教师 = 1,
            学生,
            职工
        }
        /// <summary>
        /// 人员状态
        /// </summary>
        public enum PersonState
        {
            在职 = 1,
            离职
        }
        /// <summary>
        /// 工作职员类型
        /// </summary>
        public enum PersonStaffType
        {
            正式工 = 1,
            合约工,
            临时工
        }
        /// <summary>
        /// 职工状态
        /// </summary>
        public enum PersonStaffStatus
        {
            正常 = 1,
            删除
        }
        /// <summary>
        /// 学生类型
        /// </summary>
        public enum StudentType
        {
            全日制 = 1,
            非全日制
        }
        /// <summary>
        /// 学生状态
        /// </summary>
        public enum StudentStatus
        {
            未毕业 = 1,
            已毕业
        }
        /// <summary>
        /// 教师状态
        /// </summary>
        public enum TeachStatus
        {
            在职 = 1,
            退休
        }
        /// <summary>
        /// 教师等级
        /// </summary>
        public enum TeacherLevel
        {
            讲师 = 1,
            高级讲师,
            副教授,
            教授
        }
        #endregion

        /// <summary>
        /// 配置文件类型
        /// </summary>
        public enum ConfigurationFile
        {
            AppConfig = 1,
            WebConfig = 2
        }

        /// <summary>
        /// 屏类型
        /// </summary>
        public enum GalleryType
        {
            默认 = 0,
            快速上大屏 = 1,
            不可更换 = 2
        }

        #region 权限枚举
        /// <summary>
        /// 权限枚举
        /// </summary>
        public enum PurviewEnum
        {
            //母版页
            其他配置 = 1000,
            LED控制 = 1100,
            报警灯控制 = 1200,
            全部控制 = 1300,
            设置 = 1400,
            //地图模块
            地图模块 = 2000,
            //视频监控模块
            视频监控 = 3000,
            监控页面 = 3100,
            视频下载 = 3200,
            轮播分组 = 3300,
            //综合告警模块
            综合告警 = 4000,
            事件报警 = 4100,
            事件报警控制 = 4110,
            设备告警 = 4200,
            设备告警控制 = 4210,
            应急指挥 = 4300,
            应急指挥控制 = 4310,
            //预案模块
            预案管理 = 5000,
            设备预案列表 = 5100,
            设备预案列表控制 = 5110,
            设备预案注册 = 5200,
            事件预案列表 = 5300,
            事件预案列表控制 = 5310,
            事件预案注册 = 5400,
            预案条例 = 5500,
            预案条例控制 = 5510,
            执行结果列表 = 5600,
            设备预案批量注册 = 5700,
            //接处警模块
            接处警 = 6000,
            接处警列表 = 6100,
            接处警列表控制 = 6110,
            接处警登记 = 6200,
            // 案件类型=7300,
            //卷宗模块
            卷宗管理 = 7000,
            卷宗列表 = 7100,
            卷宗列表控制 = 7110,
            卷宗生成 = 7200,
            //计划任务模块
            计划任务 = 8000,
            视频轮播 = 8100,
            视频轮播控制 = 8110,
            设备巡检 = 8200,
            设备巡检控制 = 8210,
            记录查询 = 8300,
            //人员模块
            人员模块 = 9000,
            组织架构 = 9100,
            组织架构控制 = 9110,
            人员管理 = 9200,
            人员管理控制 = 9210,
            //权限模块
            权限管理 = 10000,
            角色管理 = 10100,
            角色管理控制 = 10110,
            //基本配置模块
            基本设置 = 11000,
            基础配置 = 11100,
            行业配置 = 11200,
            行业配置控制 = 11210,
            设备类型 = 11300,
            设备类型控制 = 11310,
            区域类型 = 11400,
            区域类型控制 = 11410,
            事件配置 = 11500,
            事件配置控制 = 11510,
            //设备管理
            设备管理 = 12000,
            设备注册 = 12100,
            设备列表 = 12200,
            设备列表控制 = 12210,
            //地图管理
            地图管理 = 13000,
            地图配置 = 13100,
            区域管理 = 13200,
            楼内图管理 = 13300,
            //大屏配置
            系统配置 = 14000,
            大屏配置 = 14100,
            LED显示配置 = 14200,
            报警灯 = 14300,
            系统日志 = 14400
        }
        #endregion

        #region 自定义设备类型相关
        /// <summary>
        /// 基础设备类型
        /// </summary>
        public enum BaseDeviceType
        {
            标清固定摄像机 = 1,
            标清云台摄像机 = 2,
            高清固定摄像机 = 3,
            高清云台摄像机 = 4,
            监视器 = 5,
            门禁 = 6,
            报警手册 = 7,
            单向卡口 = 8,
            事件手报 = 9,
            室内消火栓 = 10,
            室外消防栓 = 11,
            双向卡口 = 12,
            水表 = 13,
            消防手报 = 14,
            巡更点 = 15,
            烟感 = 16,
            广播 = 17,
            红外对射探测器 = 18,
            离线巡更点 = 19
        }
        #endregion
    }
}
