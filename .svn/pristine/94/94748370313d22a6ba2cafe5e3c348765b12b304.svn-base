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
    public class ServDeviceRelateDAL : MapContext, IDataFactory<CSM.Model.ServDeviceRelateModel, ServDeviceRelateQuery>
    {
        public int AddEntity(ServDeviceRelateModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertDeviceRelate", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public int DeleteDeviceRelateById(int id)
        {
            int result = mapContext.Delete("DeleteDeviceRelateById", id);

            return result;
        }

        public int UpdateDeviceRelateById(ServDeviceRelateModel model)
        {

            int result = mapContext.Update("UpdateDeviceRelate", model);
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
        public List<ServDeviceRelateModel> GetEntities(ServDeviceRelateQuery query)
        {
            List<ServDeviceRelateModel> list = mapContext.QueryForList<ServDeviceRelateModel>("GetServDeviceRelate", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServDeviceRelateModel> GetEntities(ServDeviceRelateQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServDeviceRelateModel> list = mapContext.QueryForList<ServDeviceRelateModel>("DeviceRelatePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServDeviceRelateModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServDeviceRelateModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据设备id删除设备和组的绑定
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public int DeleteDeviceRelateByDeviceIdAndGroupId(ServDeviceRelateModel model)
        {
            try
            {
                return mapContext.Delete("DeleteDeviceRelateByDeviceIdAndGroupId", model);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据设备组ID获取设备 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<CameraPatrolDevice> GetCameraPatrolDeviceByGroupId(int groupId)
        {
            try
            {
                return mapContext.QueryForList<CameraPatrolDevice>("GetDeviceByGroupId", groupId).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据组id删除设备组绑定
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public int DeleteDeviceRelateByGroupId(int groupId)
        {
            try
            {
                return mapContext.Delete("DeleteDeviceRelateByGroupId", groupId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改分组设备排序
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateGroupDeviceRank(ServDeviceRelateQuery model)
        {
            try
            {
                return mapContext.Update("UpdateGroupDeviceRank", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id查询分组绑定
        /// </summary>
        /// <param name="groupId">分组id</param>
        /// <returns></returns>
        public List<ServDeviceRelateModel> GetDeviceRelateByGroupId(int groupId)
        {
            try
            {
                return mapContext.QueryForList<ServDeviceRelateModel>("GetDeviceRelateByGroupId", groupId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据分组id和排序rank修改分组的排序(用于添加分组设备使用)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateGroupRankBygroupidAndRank(ServDeviceRelateModel model)
        {
            try
            {
                return mapContext.Update("UpdateGroupRankBygroupidAndRank", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
