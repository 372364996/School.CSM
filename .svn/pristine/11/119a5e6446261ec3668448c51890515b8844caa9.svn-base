using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
    //Serv_Archive_File
    public class ServArchiveFileDAL : MapContext, IDataFactory<CSM.Model.ServArchiveFileModel, ServArchiveFileQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServArchiveFileModel entity)
        {
            int id = (int)mapContext.Insert("InsertArchiveFile", entity);
            return id;
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteArchiveFileById(int id)
        {
            int result = mapContext.Delete("DeleteArchiveFileById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateArchiveFileById(ServArchiveFileModel model)
        {

            int result = mapContext.Update("UpdateArchiveFile", model);
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
        public List<ServArchiveFileModel> GetEntities(ServArchiveFileQuery query)
        {
            List<ServArchiveFileModel> list = mapContext.QueryForList<ServArchiveFileModel>("GetArchiveFile", query).ToList();
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
        public List<ServArchiveFileModel> GetEntities(ServArchiveFileQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServArchiveFileModel> list = mapContext.QueryForList<ServArchiveFileModel>("ArchiveFilePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServArchiveFileModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServArchiveFileModel newentity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 获取关联信息
        /// </summary>
        /// <param name="regid"></param>
        /// <returns></returns>
        public List<ServArchiveFileModel> GetArchiveFile(int id)
        {
            try
            {
                List<ServArchiveFileModel> list = mapContext.QueryForList<ServArchiveFileModel>("GetArchiveFileByRegId", id).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
