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
	 	//卷宗信息表
	public class ServArchiveInfoDAL : MapContext, IDataFactory<CSM.Model.ServArchiveInfoModel, ServArchiveInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServArchiveInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertArchiveInfo", entity);
                return id;
            }
            catch(Exception ex)
            {
                throw ex;
            }
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteArchiveInfoById(int id)
        {
            int result = mapContext.Delete("DeleteArchiveInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateArchiveInfoById(ServArchiveInfoModel model)
        {

            int result = mapContext.Update("UpdateArchiveInfo", model);
            return result;
        }
		
		
		
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServArchiveInfoModel> GetEntities(ServArchiveInfoQuery query)
        {
            List<ServArchiveInfoModel> list = mapContext.QueryForList<ServArchiveInfoModel>("GetArchiveInfo", query).ToList();
            return list;
        }
        /// <summary>
        /// 查看卷宗符合条件的信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServArchiveInfoModel> GetAllArchive(ServArchiveInfoQuery query)
        {
            List<ServArchiveInfoModel> list = mapContext.QueryForList<ServArchiveInfoModel>("GetAllArchiveInfo", query).ToList();
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
        public List<ServArchiveInfoModel> GetEntities(ServArchiveInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "ArchiveInfoCount", query);
                totalNumber = mapContext.QueryForObject<int>("ArchiveInfoCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                string sql1 = IBatisHelper.GetRuntimeSql(this.mapContext, "ArchiveInfoPage", query);
                List<ServArchiveInfoModel> list = mapContext.QueryForList<ServArchiveInfoModel>("ArchiveInfoPage", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 根据id 获取卷宗信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServArchiveInfoModel GetEntity(int id)
        {
            try
            {
                ServArchiveInfoModel ArchiveInfo = mapContext.QueryForObject<ServArchiveInfoModel>("GetArchiveInfoById", id);
                return ArchiveInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 查看最后一条卷宗信息
        /// </summary>
        /// <returns></returns>
        public ServArchiveInfoModel GetLastArchiveInfo()
        {
            try
            {
                ServArchiveInfoQuery query = new ServArchiveInfoQuery();

                ServArchiveInfoModel entity = mapContext.QueryForObject<ServArchiveInfoModel>("GetLastArchiveInfo", query);
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServArchiveInfoModel newentity)
        {
            throw new NotImplementedException();
        }



        /// <summary>
        /// 添加卷宗条例
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="fileInfo"></param>
        /// <returns></returns>
        public bool AddservArchiveInfo(ServArchiveInfoModel entity, List<ServFileInfoModel> fileInfo)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向卷宗信息表中添加信息
                int regId = (int)mapContext.Insert("InsertArchiveInfo", entity);
                if (regId > 0)
                {
                    result = true;
                    //向文件表中添加数据
                    for (var i = 0; i < fileInfo.Count(); i++)
                    {
                        int fileId = (int)mapContext.Insert("InsertFileInfo", fileInfo[i]);
                        if (fileId > 0)
                        {
                            //向关联表中添加信息
                            ServArchiveFileModel archiveFile = new ServArchiveFileModel();
                            archiveFile.archive_id = regId;
                            archiveFile.relate_id = fileId;
                            archiveFile.type = fileInfo[i].file_type;
                            int relationId = (int)mapContext.Insert("InsertArchiveFile", archiveFile);
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
        /// 修改卷宗状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="archiveStatus"></param>
        /// <returns></returns>
        public  bool modifyArchiveState(ServArchiveInfoQuery entity)
        {
            try
            {
                    ServArchiveInfoModel devicePlanModel = new ServArchiveInfoModel();
                    devicePlanModel.id = entity.id;
                    devicePlanModel.archive_status = entity.archive_status;
                    int result = mapContext.Update("ModifyArchiveState", devicePlanModel);
                    
                    if (result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 删除所有废止卷宗
        /// </summary>
        /// <returns></returns>
        public bool DeleteArchive()
        {
            try
            {
                int StateId = (int)CSM.Common.EnumClass.ArchiveStatus.废止;
                int result = mapContext.Update("DeleteArchiveInfoById", StateId);
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 修改卷宗
        /// </summary>
        /// <param name="servArchiveInfoModel"></param>
        /// <param name="ServFileInfoList"></param>
        /// <param name="servArhiveUpdateLog"></param>
        /// <returns></returns>
        public  bool UpdateservArchiveInfo(ServArchiveInfoModel servArchiveInfoModel, List<ServFileInfoModel> ServFileInfoList, ServArhiveUpdateLogModel servArhiveUpdateLog)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向卷宗信息表中添加信息
                int regId = (int)mapContext.Update("UpdateArchiveInfo", servArchiveInfoModel);
                if (regId > 0)
                {
                        result = true;
                        List<ServArchiveFileModel> servArchiveFileModel = mapContext.QueryForList<ServArchiveFileModel>("GetArchiveFileByRegId", servArchiveInfoModel.id).ToList();
                        for (var i = 0; i < servArchiveFileModel.Count(); i++)
                        {
                            int fileId = (int)mapContext.Delete("DeleteFileInfoById", servArchiveFileModel[i].relate_id);
                            if (fileId > -1)
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
                    if (result == true)
                    {
                        int Id = (int)mapContext.Delete("DeleteArchiveFileInfoById", servArchiveInfoModel.id);
                        if (Id > -1)
                        {
                            //向文件表中添加数据
                            for (var i = 0; i < ServFileInfoList.Count(); i++)
                            {
                                int fileId = (int)mapContext.Insert("InsertFileInfo", ServFileInfoList[i]);
                                if (fileId > 0)
                                {
                                    //向关联表中添加信息
                                    ServArchiveFileModel archiveFile = new ServArchiveFileModel();
                                    archiveFile.archive_id = servArchiveInfoModel.id;
                                    archiveFile.relate_id = fileId;
                                    archiveFile.type = ServFileInfoList[i].file_type;
                                    int relationId = (int)mapContext.Insert("InsertArchiveFile", archiveFile);
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
                            }
                        }
                        if (result == true)
                        {
                            //向日志表里添加信息
                            int fileId = (int)mapContext.Insert("InsertArhiveUpdateLog", servArhiveUpdateLog);
                            if (fileId > 0)
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
        /// 根据卷宗编号获取文件名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServFileInfoModel> GetFileinfo(int id)
        {
            try
            {
                List<ServFileInfoModel> ServFileInfo = mapContext.QueryForList<ServFileInfoModel>("GetFileInfoByArchiveId", id).ToList();
                return ServFileInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id获取
        /// </summary>
        /// <param name="resultId"></param>
        /// <returns></returns>
        public List<ServArchiveInfoModel> GetArchiveInfo(string resultId)
        {
            try
            {
                List<ServArchiveInfoModel> list = new List<ServArchiveInfoModel>();
                string[] array = resultId.Split(',');
                for (int i = 0; i < array.Length; i++)
                {
                    ServArchiveInfoModel ArchiveInfo = mapContext.QueryForObject<ServArchiveInfoModel>("GetArchiveInfoById", array[i]);
                    list.Add(ArchiveInfo);
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 导入卷宗
        /// </summary>
        /// <param name="servArchiveInfoModel"></param>
        /// <returns></returns>
        public bool TheImportFile(List<ServArchiveInfoModel> servArchiveInfoModel)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                foreach (ServArchiveInfoModel archivebl in servArchiveInfoModel)
                {
                    ServArchiveInfoModel aresult = mapContext.QueryForObject<ServArchiveInfoModel>("IsDuplicate", archivebl.archive_num);
                    if (aresult!=null)
                    {
                        int regId=(int)mapContext.Update("UpdateArchiveInfoByNum", archivebl);
                        if (regId < 0)
                        {
                            result = false;
                            break;
                        }
                        else
                        {
                            result = true;
                        }
                    }
                    else
                    {
                        int regId = (int)mapContext.Insert("InsertArchiveInfo", archivebl);
                        if(regId<0)
                        {
                            result = false;
                            break;
                        }
                        else
                        {
                            result = true;
                        }
                    }
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