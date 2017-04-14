using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
    //Serv_Video_PlanHandleRecord
    public class ServVideoPlanHandleRecordDAL : MapContext, IDataFactory<CSM.Model.ServVideoPlanHandleRecordModel, ServVideoPlanHandleRecordQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServVideoPlanHandleRecordModel entity)
        {
            //int id = (int)mapContext.Insert("InsertVideoPlanHandleRecord", entity);
            //return id;
            try
            {
                return (int)mapContext.Insert("InsertVideoPlanHandleRecord", entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteVideoPlanHandleRecordById(int id)
        {
            int result = mapContext.Delete("DeleteVideoPlanHandleRecordById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateVideoPlanHandleRecordById(ServVideoPlanHandleRecordModel model)
        {

            int result = mapContext.Update("UpdateVideoPlanHandleRecordById", model);
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
        public List<ServVideoPlanHandleRecordModel> GetEntities(ServVideoPlanHandleRecordQuery query)
        {
            List<ServVideoPlanHandleRecordModel> list = mapContext.QueryForList<ServVideoPlanHandleRecordModel>("GetVideoPlanHandleRecord", query).ToList();
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
        public List<ServVideoPlanHandleRecordModel> GetEntities(ServVideoPlanHandleRecordQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServVideoPlanHandleRecordModel> list = mapContext.QueryForList<ServVideoPlanHandleRecordModel>("VideoPlanHandleRecordPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        /// <summary>
        /// 通过处置项ID查找下载视频
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        //public List<PlanVideoDownLoad> GetDownLoadVideoListByItemId(int itemId)
        //{
        //    try
        //    {
        //        return mapContext.QueryForList<PlanVideoDownLoad>("GetDownLoadVideoByItemId", itemId).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        /// <summary>
        /// 通过处置项ID查找下载视频
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<ServVideoInfoModel> GetDownLoadVideoListByItemId(int itemId)
        {
            try
            {
                return mapContext.QueryForList<ServVideoInfoModel>("GetDownLoadVideoByItemId", itemId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 增加预案视频下载记录
        /// </summary>
        /// <param name="handleItemId"></param>
        /// <param name="content"></param>
        /// <param name="createTime"></param>
        /// <param name="deviceCode"></param>
        /// <param name="deviceName"></param>
        /// <param name="status"></param>
        /// <param name="platformId"></param>
        /// <param name="endTime"></param>
        /// <param name="startTime"></param>
        /// <param name="downloadType"></param>
        /// <returns></returns>
        public bool AddPlanVideoDownRecord(int handleItemId, string content, DateTime createTime, string deviceCode, string deviceName, int status, int platformId, DateTime endTime, DateTime startTime, int downloadType)
        {
            
           
               // mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
                try
                {
                    ServVideoInfoDAL dal = new ServVideoInfoDAL();
                    ServVideoInfoModel video = new ServVideoInfoModel();
                    video.content = content;
                    video.create_time = createTime;
                    video.device_code = deviceCode;
                    video.device_name = deviceName;
                    video.download_status = status;
                    video.platform_id = platformId;
                    video.video_end_time = endTime;
                    video.video_start_time = startTime;
                    video.video_type = downloadType;
                    video.video_name = "";
                    video.video_path = "";
                    int videoId = dal.AddEntity(video);
                    if (videoId > 0)
                    {
                        ServVideoPlanHandleRecordModel model = new ServVideoPlanHandleRecordModel();
                        model.handle_record_id = handleItemId;
                        model.video_id = videoId;
                        if (AddEntity(model) > 0)
                        {
                           // mapContext.CommitTransaction();
                            return true;
                        }
                        else
                        {
                           // mapContext.RollBackTransaction();
                            return false;
                        }
                    }
                    else
                    {
                        //mapContext.RollBackTransaction();
                        return false;
                    }

                }
                catch (Exception ex)
                {
                   // mapContext.RollBackTransaction();
                   
                    throw ex;
                }
            
           
        }
        public ServVideoPlanHandleRecordModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServVideoPlanHandleRecordModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}