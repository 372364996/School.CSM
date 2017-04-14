using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//记录图片以及文件
	public class ServFileInfoDAL : MapContext, IDataFactory<CSM.Model.ServFileInfoModel, ServFileInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServFileInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertFileInfo", entity);
                return id;
            }
            catch (Exception)
            {

                throw;
            }
            
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteFileInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteFileInfoById", id);

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
        public int UpdateFileInfoById(ServFileInfoModel model)
        {

            int result = mapContext.Update("UpdateFileInfo", model);
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
        public List<ServFileInfoModel> GetEntities(ServFileInfoQuery query)
        {
            List<ServFileInfoModel> list = mapContext.QueryForList<ServFileInfoModel>("GetFileInfo", query).ToList();
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
        public List<ServFileInfoModel> GetEntities(ServFileInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServFileInfoModel> list = mapContext.QueryForList<ServFileInfoModel>("FileInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 根据id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServFileInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServFileInfoModel>("GetFileInfoById", id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool UpdateEntity(int id, ServFileInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}