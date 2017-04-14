using CSM.DAL;
using CSM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServFileInfoBLL
    {
        ServFileInfoDAL servFileInfoDAL = new ServFileInfoDAL();

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddFileInfo(ServFileInfoModel model)
        {
            try
            {
                int id = servFileInfoDAL.AddEntity(model);
                return id;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 根据id获取文件数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServFileInfoModel GetServFileInfoByID(int id)
        {
            try
            {
                ServFileInfoModel fileInfo = servFileInfoDAL.GetEntity(id);
                return fileInfo;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 根据id删除文件表数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteServFileInfoByID(int id)
        {
            try
            {
                int num = servFileInfoDAL.DeleteFileInfoById(id);
                return num;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ServFileInfoModel> getAllFileInfo()
        {
            try
            {
                Model.QueryModel.ServFileInfoQuery query = new Model.QueryModel.ServFileInfoQuery();
                List<ServFileInfoModel> fileList = servFileInfoDAL.GetEntities(query);
                return fileList;
            }
            catch (Exception)
            {

                throw;
            }
          
        }
    }
}
