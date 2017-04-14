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
    public class ServPlanHandleItemCameraDAL : MapContext, IDataFactory<CSM.Model.ServPlanHandleItemCameraModel, ServPlanHandleItemCameraQuery>
    {

        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServPlanHandleItemCameraModel entity)
        {
            int id = (int)mapContext.Insert("InsertPlanHandleItemCamera", entity);
            return id;
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeletePlanHandleItemCameraById(int id)
        {
            int result = mapContext.Delete("DeletePlanHandleItemCameraById", id);

            return result;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdatePlanHandleItemCameraById(ServPlanHandleItemCameraModel model)
        {

            int result = mapContext.Update("UpdatePlanHandleItemCameraById", model);
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
        public List<ServPlanHandleItemCameraModel> GetEntities(ServPlanHandleItemCameraQuery query)
        {
            List<ServPlanHandleItemCameraModel> list = mapContext.QueryForList<ServPlanHandleItemCameraModel>("GetPlanHandleItemCamera", query).ToList();
            return list;
        }
        /// <summary>
        /// 通过处置项ID查找摄像头
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetHandledCameras(int id)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceInfoModel>("GetCameraByItemId", id).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ServPlanHandleItemCameraModel> GetEntities(ServPlanHandleItemCameraQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServPlanHandleItemCameraModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPlanHandleItemCameraModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据处置项id获取摄像头信息
        /// </summary>
        /// <param name="HandleId"></param>
        /// <returns></returns>
        public List<ServPlanHandleItemCameraModel> GetPlanHandleItemCamera(int HandleId)
        {
            try
            {
                List<ServPlanHandleItemCameraModel> list = mapContext.QueryForList<ServPlanHandleItemCameraModel>("GetPlanHandleItemCameraInfo", HandleId).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
