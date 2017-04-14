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
    public class ServDefinedDeviceDAL : MapContext, IDataFactory<CSM.Model.ServDefinedDeviceModel, ServDefinedDeviceQuery>
    {
        public int AddEntity(ServDefinedDeviceModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertDeviceDefined", entity);
                return id;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 根据id删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteDeviceDefinedById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteDeviceDefinedById", id);

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
        /// <summary>
        /// 根据pid删除
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public int DeleteDefinedDeviceByPid(int pid)
        {
            try
            {
                int result = mapContext.Delete("DeleteDeviceDefinedByPid", pid);

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改子节点显示或隐藏
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateChildDeviceEnable(ServDefinedDeviceModel model)
        {
            try
            {
                return mapContext.Update("UpdateChildDeviceEnable", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateDeviceDefinedById(ServDefinedDeviceModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateDeviceDefined", model);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 根据id删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            try
            {
                int num = mapContext.Delete("DeleteDeviceDefinedById", id);
                bool result = false;
                if (num != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetEntities(ServDefinedDeviceQuery query)
        {
            try
            {
                List<ServDefinedDeviceModel> list = mapContext.QueryForList<ServDefinedDeviceModel>("GetServDeviceDefined", query).ToList();
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetEntities(ServDefinedDeviceQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                totalNumber = mapContext.QueryForObject<int>("ServDeviceDefinedCount", query);
                List<ServDefinedDeviceModel> list = mapContext.QueryForList<ServDefinedDeviceModel>("DeviceDefinedPage", query).ToList();

                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 分页获取自定义设备类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetDefinedDevicePage(ServDefinedDeviceQuery query,out int total)
        {
            try
            {
                total = mapContext.QueryForObject<int>("ServDeviceDefinedCount", query);
                List<ServDefinedDeviceModel> list = mapContext.QueryForList<ServDefinedDeviceModel>("DeviceDefinedPage", query).ToList();

                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id获取自定义设备类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDefinedDeviceModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServDefinedDeviceModel>("GetDeviceDefinedById", id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        /// <summary>
        /// 根据pid查询自定义设备类型
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetDefinedDeviceByPid(int pid)
        {
            try
            {
                return mapContext.QueryForList<ServDefinedDeviceModel>("GetDefinedDeviceByPid", pid).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        /// <summary>
        /// 根据id删除父级本身和下面的子级
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int DeleteDefinedDeviceAndChildByBaseId(int id)
        {
            try
            {
                return mapContext.Delete("DeleteDefinedDeviceAndChildByBaseId", id);
            }
            catch (Exception ex)
            {

                throw ex; 
            }
        }
        /// <summary>
        /// 根据行业获取地图左侧设备工具条
        /// </summary>
        /// <param name="industry_id">行业id</param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetDefinedDeviceTool(int industry_id)
        {
            try
            {
                return mapContext.QueryForList<ServDefinedDeviceModel>("GetDefinedDeviceTool", industry_id).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool UpdateEntity(int id, ServDefinedDeviceModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据行业id和基础设备类型id获取设备图标路径
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public ServDefinedDeviceModel GetDefinedDeviceByIndusryIdAndBaseDeviceTypeId(DefinedDeviceToolCustom query)
        {
            try
            {
                return mapContext.QueryForObject<ServDefinedDeviceModel>("GetDefinedDeviceByIndusryIdAndBaseDeviceTypeId", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id和基础设备类型id验证该基础设备类型是否被绑定（添加）
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int VerificationBaseDeviceTypeByTypeIdAndIndustryId(ServDefinedDeviceModel query)
        {
            try
            {
                return mapContext.QueryForObject<int>("VerificationBaseDeviceTypeByTypeIdAndIndustryId", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id和基础设备类型id验证该基础设备类型是否被绑定(修改）
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int VerificationBaseDeviceTypeByTypeIdAndIndustryIdAndDefinedId(ServDefinedDeviceModel query)
        {
            try
            {
                return mapContext.QueryForObject<int>("VerificationBaseDeviceTypeByTypeIdAndIndustryIdAndDefinedId", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
