using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
    //Serv_Regulation_File
    public class ServRegulationFileDAL : MapContext, IDataFactory<CSM.Model.ServRegulationFileModel, ServRegulationFileQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServRegulationFileModel entity)
        {
            int id = (int)mapContext.Insert("InsertRegulationFile", entity);
            return id;
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteRegulationFileById(int id)
        {
            int result = mapContext.Delete("DeleteRegulationFileById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateRegulationFileById(ServRegulationFileModel model)
        {

            int result = mapContext.Update("UpdateRegulationFileById", model);
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
        public List<ServRegulationFileModel> GetEntities(ServRegulationFileQuery query)
        {
            List<ServRegulationFileModel> list = mapContext.QueryForList<ServRegulationFileModel>("GetRegulationFile", query).ToList();
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
        public List<ServRegulationFileModel> GetEntities(ServRegulationFileQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServRegulationFileModel> list = mapContext.QueryForList<ServRegulationFileModel>("RegulationFilePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServRegulationFileModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServRegulationFileModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取关联信息
        /// </summary>
        /// <param name="regid"></param>
        /// <returns></returns>
        public List<ServRegulationFileModel> GetRegulationFile(int id)
        {
            try
            {
                List<ServRegulationFileModel> list = mapContext.QueryForList<ServRegulationFileModel>("GetRegulationFileByRegId", id).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}