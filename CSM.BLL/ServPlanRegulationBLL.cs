using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
   public  class ServPlanRegulationBLL
    {
        #region 预案条例管理
        private CSM.DAL.ServPlanRegulationDAL servPlanRegulationDAL = new CSM.DAL.ServPlanRegulationDAL();
        private CSM.DAL.BaseEventTypeDAL baseEventTypeDAL = new DAL.BaseEventTypeDAL();
        private CSM.DAL.ServFileInfoDAL servFileInfoDAL = new DAL.ServFileInfoDAL();
        private CSM.DAL.ServRegulationFileDAL servRegulationFileDAL = new DAL.ServRegulationFileDAL();


        /// <summary>
        /// 根据ID获取预案条例信息
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns>预案条例信息</returns>
        public CSM.Model.ServPlanRegulationModel GetModelByID(int id)
        {
            try
            {
                return servPlanRegulationDAL.GetEntity(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
        /// <summary>
        /// 获取所有的预案条例信息 2016.12.02 乔会会
        /// </summary>
        /// <returns>预案条例信息</returns>
        public List<ServPlanRegulationModel> GetDevicePlan()
        {
            ServPlanRegulationQuery servDevicePlanQuery = new ServPlanRegulationQuery();
            return servPlanRegulationDAL.GetEntities(servDevicePlanQuery);
        }
        /// <summary>
        /// 新增预案条例信息 2016.12.02 乔会会
        /// </summary>
        /// <param name="configModel"></param>
        /// <returns></returns>
        public int AddDevicePlan(ServPlanRegulationModel configModel)
        {
            int id = servPlanRegulationDAL.AddEntity(configModel);
            return id;
        }
        /// <summary>
        /// 修改预案条例信息 
        /// </summary>
        /// <param name="ServPlanRegulationModel"></param>
        /// <returns></returns>
        public bool UpdateDevicePlan(ServPlanRegulationModel ServPlanRegulationModel)
        {
            bool result = servPlanRegulationDAL.UpdateEntity(ServPlanRegulationModel.id, ServPlanRegulationModel);
            return result;
        }
        /// <summary>
        /// 删除预案条例信息
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public bool DeltePlanRegulation(int id)
        {
            try
            {
                return servPlanRegulationDAL.DeletePlanRegulationById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 分页查询获取预案条例 
        /// </summary>
        /// <param name="servDevicePlanQuery"></param>
        /// <param name="pageSize">每页记录数</param>
        /// <param name="pageNumber">当前页码</param>
        /// <param name="totalNumber">共多少条</param>
        /// <returns></returns>
        public List<PlanRegulationModel> GetEntities(ServPlanRegulationQuery servPlanRegulationQuery, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                List<ServPlanRegulationModel> ServPlanRegulationlist = new List<ServPlanRegulationModel>();
                List<PlanRegulationModel> PlanRegulationList = new List<PlanRegulationModel>();
                ServPlanRegulationlist = servPlanRegulationDAL.GetEntities(servPlanRegulationQuery, pageSize, pageNumber, out totalNumber);
                PlanRegulationModel planRegulationModel;
                foreach (ServPlanRegulationModel item in ServPlanRegulationlist)
                {
                    planRegulationModel = new PlanRegulationModel();
                    planRegulationModel.id = item.id;
                    planRegulationModel.reg_name = item.reg_name;
                    planRegulationModel.reg_levelName = Enum.GetName(typeof(EnumClass.PlanRegulation), item.reg_level);
                    planRegulationModel.create_time =item.create_time;
                    planRegulationModel.update_time =item.update_time;
                    //var u = servPlanRegulationDAL.GetFileName(item.id); 
                    //planRegulationModel.file_name = u == null ? "未知" : u.file_name;
                    planRegulationModel.keyword = item.keyword;
                    var a = baseEventTypeDAL.GetEntity(item.reg_type);
                    planRegulationModel.reg_typeName=a == null ? "未知" : a.event_name;
                    PlanRegulationList.Add(planRegulationModel);

                }
                return PlanRegulationList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取上传的文件信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<ServFileInfoModel> GetFileinfo(int Id)
        {
            try
            {
                List<ServFileInfoModel> fileInfoList = servPlanRegulationDAL.GetFileName(Id);
                return fileInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       /// <summary>
       /// 获取预案条例文档
       /// </summary>
       /// <param name="eventType"></param>
       /// <returns></returns>
       public List<ServFileInfoModel> GetPlanDocument(int eventType)
        {
            try
            {
                List<ServFileInfoModel> fileInfoList = servPlanRegulationDAL.GetPlanDocument(eventType);
                return fileInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加预案条例
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="fileInfo"></param>
        /// <returns></returns>
        public bool AddPlanRegulation(ServPlanRegulationModel entity,List<ServFileInfoModel> fileInfo)
        {
            try
            {
                bool result = servPlanRegulationDAL.AddPlanRegulation(entity, fileInfo);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取预案条例信息
        /// </summary>
        /// <param name="regId"></param>
        /// <returns></returns>
        public PlanRegulationModel GetPlanRegulations(int regId)
        {

            try
            {
                //获取预案条例信息
                ServPlanRegulationModel entity =servPlanRegulationDAL.GetEntity(regId);

                //获取关联文件
                List<ServRegulationFileModel> RegulationFile = servRegulationFileDAL.GetRegulationFile(regId);
                //获取文件信息
                List<ServFileInfoModel> FileInfoList = new List<ServFileInfoModel>();
                for (var i=0;i< RegulationFile.Count;i++)
                {
                    ServFileInfoModel fileInfo = servFileInfoDAL.GetEntity(RegulationFile[i].file_id);
                    FileInfoList.Add(fileInfo);
                }
                //获取文件信息
                PlanRegulationModel model = new PlanRegulationModel();
                model.id =entity.id;
                model.keyword =entity.keyword;
                model.person_id = entity.person_id;
                model.reg_level = entity.reg_level;
                model.reg_name = entity.reg_name;
                model.reg_type = entity.reg_type;
                var a = baseEventTypeDAL.GetEntity(entity.reg_type);
                model.reg_typeName = a == null ? "未知" : a.event_name;
                model.reg_levelName = Enum.GetName(typeof(EnumClass.PlanRegulation), entity.reg_level);
                model.create_time = entity.create_time;
                model.update_time = entity.update_time;
                model.FileInfoList = FileInfoList;
                return model;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改条例
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="fileInfo"></param>
        /// <returns></returns>
        public bool UpdatePlanRegulation(ServPlanRegulationModel entity, List<ServFileInfoModel> fileInfo)
        {

            try
            {
                bool result = servPlanRegulationDAL.UpdatePlanRegulation(entity, fileInfo);
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





        #endregion
    }
}

