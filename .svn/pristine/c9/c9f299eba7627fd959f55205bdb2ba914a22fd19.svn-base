using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Temp_Device
	public class ServTempDeviceDAL : MapContext, IDataFactory<CSM.Model.ServTempDeviceModel, ServTempDeviceQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServTempDeviceModel entity)  
		{
            int id = (int)mapContext.Insert("InsertTempDevice", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteTempDeviceById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteTempDeviceById", id);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
            
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateTempDeviceById(ServTempDeviceModel model)
        {

            int result = mapContext.Update("UpdateTempDevice", model);
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
        public List<ServTempDeviceModel> GetEntities(ServTempDeviceQuery query)
        {
            try
            {
                List<ServTempDeviceModel> list = mapContext.QueryForList<ServTempDeviceModel>("GetTempDevice", query).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
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
        public List<ServTempDeviceModel> GetEntities(ServTempDeviceQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServTempDeviceModel> list = mapContext.QueryForList<ServTempDeviceModel>("TempDevicePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServTempDeviceModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServTempDeviceModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据设备code查询设备临时表
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public int GetTempDeviceByCode(string code)
        {
            try
            {
               return mapContext.QueryForObject<int>("GetTempDeviceByCode", code);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 通过设备code查找临时表设备记录
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <returns></returns>
        public ServTempDeviceModel GetTempDeviceByDeviceCode(string deviceCode)
        {
            try
            {
                return mapContext.QueryForObject<ServTempDeviceModel>("GetTempDeviceByDeviceCode", deviceCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}