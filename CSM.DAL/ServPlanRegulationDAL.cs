using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Utils;

namespace CSM.DAL
{
    //Serv_Plan_Regulation
    public class ServPlanRegulationDAL : MapContext, IDataFactory<CSM.Model.ServPlanRegulationModel, ServPlanRegulationQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServPlanRegulationModel entity)
        {
            int id = (int)mapContext.Insert("InsertPlanRegulation", entity);
            return id;
        }
        /// <summary>
        /// 删除预案条例
        /// </summary>
        /// <param name="id"></param>
        public bool DeletePlanRegulationById(int  id)
        {
            bool result = false;
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                int aresult = mapContext.Delete("DeletePlanRegulationById", id);
                if (aresult > 0)
                {
                    ServRegulationFileModel RegulationFile = mapContext.QueryForObject<ServRegulationFileModel>("GetRegulationFileByRegId", id);
                    int bresult = mapContext.Delete("DeletePlanRegulationFileById", id);
                    if (bresult > 0)
                    {
                        int file_id = RegulationFile.file_id;
                        int cresult = mapContext.Delete("DeletePlanFileInfoById", file_id);
                        if (cresult > 0)
                        {
                            result = true;
                            mapContext.CommitTransaction();//提交事务
                            return result;

                        }
                        else
                        {
                            mapContext.RollBackTransaction();//事务回滚
                            return result;
                        }

                    }
                    else
                    {
                        mapContext.RollBackTransaction();//事务回滚
                        return result;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdatePlanRegulationById(ServPlanRegulationModel model)
        {

            int result = mapContext.Update("UpdatePlanRegulationById", model);
            return result;
        }


        /// <summary>
        /// 删除预案条例
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServPlanRegulationModel> GetEntities(ServPlanRegulationQuery query)
        {
            List<ServPlanRegulationModel> list = mapContext.QueryForList<ServPlanRegulationModel>("GetPlanRegulation", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServPlanRegulationModel> GetEntities(ServPlanRegulationQuery query,int pageSize, int pageNumber, out int totalNumber)
        {
            try
            {
               // string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "PlanRegulationCount", query);
                totalNumber = mapContext.QueryForObject<int>("PlanRegulationCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "PlanRegulationPage", query);
                List<ServPlanRegulationModel> list = mapContext.QueryForList<ServPlanRegulationModel>("PlanRegulationPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 获取条例
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServPlanRegulationModel GetEntity(int id)
        {
            try
            {

                return mapContext.QueryForObject<ServPlanRegulationModel>("GetPlanRegulationById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServPlanRegulationModel newentity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 根据条例编号获取文件名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServFileInfoModel> GetFileName(int id)
        {
            try
            {
                List<ServFileInfoModel> ServFileInfo = mapContext.QueryForList<ServFileInfoModel>("GetServFileInfoById", id).ToList();
                return ServFileInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取预案条例相关文档根据事件类型
        /// </summary>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public List<ServFileInfoModel> GetPlanDocument(int eventType)
        {
            try
            {
              
               List<ServPlanRegulationModel> ServPlanRegulation = mapContext.QueryForList<ServPlanRegulationModel>("GetRegulationFileInfoByEvent", eventType).ToList();
               List<ServRegulationFileModel> ServRegulationFileList = new List<ServRegulationFileModel>();
               List<ServFileInfoModel> ServFileInfoList = new List<ServFileInfoModel>();
               for (var i=0;i< ServPlanRegulation.Count();i++)
               {
                 List<ServRegulationFileModel> ServRegulationFile = mapContext.QueryForList<ServRegulationFileModel>("GetRegulationFileByRegId", ServPlanRegulation[i].id).ToList();
                 for(var a=0;a< ServRegulationFile.Count();a++)
                    {
                        ServRegulationFileList.Add(ServRegulationFile[a]);
                    }
               }
                for(var i=0;i< ServRegulationFileList.Count();i++)
                {
                    List<ServFileInfoModel>  ServFileInfo = mapContext.QueryForList<ServFileInfoModel>("GetFileInfoById", ServRegulationFileList[i].file_id).ToList();
                    for(var a=0;a< ServFileInfo.Count();a++)
                    {
                        ServFileInfoList.Add(ServFileInfo[a]);
                    }
                }
                return ServFileInfoList;
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
        public bool AddPlanRegulation(ServPlanRegulationModel entity, List<ServFileInfoModel> fileInfo)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向预案条例信息表中添加信息
                int regId = (int)mapContext.Insert("InsertPlanRegulation", entity);
                if (regId > 0)
                {
                    //向文件表中添加数据
                    for (var i = 0; i < fileInfo.Count(); i++)
                    {
                        int fileId = (int)mapContext.Insert("InsertFileInfo", fileInfo[i]);
                        if (fileId > 0)
                        {
                            //向关联表中添加信息
                            ServRegulationFileModel RegulationFile = new ServRegulationFileModel();
                            RegulationFile.reg_id = regId;
                            RegulationFile.file_id = fileId;
                            int relationId = (int)mapContext.Insert("InsertRegulationFile", RegulationFile);
                            if (relationId > 0)
                            {
                                result = true;
                            }
                            else
                            {
                                result = false;
                            }
                        }
                        else
                        {
                            result = false;
                        }
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    result = false;
                }
                if (result == true)
                {
                    mapContext.CommitTransaction();//提交事务
                    return result;
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }


            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }
        }

      /// <summary>
      /// 修改预案条例
      /// </summary>
      /// <param name="entity"></param>
      /// <param name="fileInfo"></param>
      /// <returns></returns>
       public bool UpdatePlanRegulation(ServPlanRegulationModel entity, List<ServFileInfoModel> fileInfo)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向预案条例信息表中添加信息
                int regId = (int)mapContext.Update("UpdatePlanRegulationById", entity);
                if (regId > 0)
                {
                    List<ServRegulationFileModel> servRegulationFileInfo = mapContext.QueryForList<ServRegulationFileModel>("GetRegulationFileByRegId", entity.id).ToList();
                    for(var i=0;i< servRegulationFileInfo.Count();i++)
                    {
                        int fileId = (int)mapContext.Delete("DeleteFileInfoById", servRegulationFileInfo[i].file_id);
                        if(fileId>-1)
                        {
                           result = true;
                        }
                        else
                        {
                            mapContext.RollBackTransaction();
                            result = false;
                            break;
                        }
                    }
                    if(result==true)
                    {
                        int Id = (int)mapContext.Delete("DeletePlanRegulationFileById", entity.id);
                        if(Id>-1)
                        {
                            //向文件表中添加数据
                            for (var i = 0; i < fileInfo.Count(); i++)
                            {
                                int fileId = (int)mapContext.Insert("InsertFileInfo", fileInfo[i]);
                                if (fileId > 0)
                                {
                                    //向关联表中添加信息
                                    ServRegulationFileModel RegulationFile = new ServRegulationFileModel();
                                    RegulationFile.reg_id = entity.id;
                                    RegulationFile.file_id = fileId;
                                    int relationId = (int)mapContext.Insert("InsertRegulationFile", RegulationFile);
                                    if (relationId > 0)
                                    {
                                        result = true;
                                    }
                                    else
                                    {
                                        result = false;
                                        break;
                                    }
                                }
                                else
                                {
                                    result = false;
                                }
                            }
                        }
                        else
                        {
                            mapContext.RollBackTransaction();
                            result = false;
                        }
                    }

                }
                else
                {
                    mapContext.RollBackTransaction();
                    result = false;
                }
                if (result == true)
                {
                    mapContext.CommitTransaction();//提交事务
                    return result;
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }


            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }

        }
    }
}