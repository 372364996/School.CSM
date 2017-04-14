using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServPurviewManageBLL
    {
        ServPurviewInfoDAL servPurviewInfoDAL = new ServPurviewInfoDAL();
        ServRoleInfoDAL servRoleInfoDAL = new ServRoleInfoDAL();
        ServRolePurviewDAL servRolePurviewDAL = new ServRolePurviewDAL();
        BaseRegionConfigDAL baseRegionConfigDAL = new BaseRegionConfigDAL();
        ServPersonInfoDAL servPersonInfoDAL = new ServPersonInfoDAL();
        //ServPersonRoleDAL servPersonRoleDAL = new ServPersonRoleDAL();
        #region 权限管理
        /// <summary>
        /// 获取权限树
        /// </summary>
        /// <returns></returns>
        public List<ServPurviewInfoModel> GetPurviewTree()
        {
            try
            {
                ServPurviewInfoQuery query = new ServPurviewInfoQuery();
                List<ServPurviewInfoModel> purviewList = servPurviewInfoDAL.GetEntities(query);
                return purviewList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 验证权限编码是否已存在
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        //public ServPurviewInfoModel GetPurviewByPurviewCode(string code)
        //{
        //    try
        //    {
        //        return servPurviewInfoDAL.GetPurviewByPurviewCode(code);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        ///// <summary>
        ///// 添加权限
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //public bool AddPurviewInfo(ServPurviewInfoModel model)
        //{
        //    try
        //    {
        //        bool result = false;
        //        int id = servPurviewInfoDAL.AddEntity(model);
        //        if (id != 0)
        //        {
        //            result = true;
        //        }
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        ///// <summary>
        ///// 修改权限
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //public bool UpdatePurviewInfo(ServPurviewInfoModel model)
        //{
        //    try
        //    {
        //        bool result = false;
        //        int num = servPurviewInfoDAL.UpdatePurviewInfo(model);
        //        if (num != 0)
        //        {
        //            result = true;
        //        }
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        ///// <summary>
        ///// 根据id删除权限和子集权限
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //public bool DeletePurviewById(int id)
        //{
        //    try
        //    {
        //        bool result = false;
        //        int num = servPurviewInfoDAL.DeletePurviewAndChildById(id);
        //        if (num != 0)
        //        {
        //            result = true;
        //        }
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        ///// <summary>
        ///// 根据id分页查询权限
        ///// </summary>
        ///// <param name="pageIndex"></param>
        ///// <param name="pageSize"></param>
        ///// <param name="id"></param>
        ///// <param name="total"></param>
        ///// <returns></returns>
        //public List<ServPurviewInfoModel> GetPurviewDataById(int pageIndex, int pageSize, int id, out int total)
        //{
        //    try
        //    {
        //        ServPurviewInfoQuery query = new ServPurviewInfoQuery();
        //        query.id = id;
        //        query.pageIndex = pageIndex;
        //        query.pageSize = pageSize;
        //        List<ServPurviewInfoModel> purviewList = servPurviewInfoDAL.GetPurviewInfoPageById(query, out total);
        //        return purviewList;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        #endregion

        #region 角色管理
        /// <summary>
        /// 根据角色名称分页查询角色列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public List<ServRoleInfoModel> GetRoleInfoPage(int pageIndex, int pageSize, out int total, string roleName)
        {
            try
            {
                ServRoleInfoQuery query = new ServRoleInfoQuery();
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.role_name = roleName;
                List<ServRoleInfoModel> roleList = servRoleInfoDAL.GetRoleInfoPage(query, out total);
                return roleList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddRoleInfo(ServRoleInfoModel model)
        {
            try
            {
                bool result = false;
                int id = servRoleInfoDAL.AddEntity(model);
                if (id != 0)
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
        /// 添加角色返回角色id
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddRoleInfo2(ServRoleInfoModel model)
        {
            try
            {
                int id = servRoleInfoDAL.AddEntity(model);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateRoleInfo(ServRoleInfoModel model)
        {
            try
            {
                bool result = false;
                int num = servRoleInfoDAL.UpdateRoleInfoById(model);
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
        /// 根据角色id删除角色和角色绑定
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteRoleInfoById(int id)
        {
            try
            {
                //根据id删除角色人员绑定
                servPersonInfoDAL.UpdatePersonRoleByRoleId(id);
                //根据id删除角色权限绑定
                int num = servRolePurviewDAL.DeleteRolePurviewByRoleId(id);
                //根据id删除角色
                num = servRoleInfoDAL.DeleteRoleInfoById(id);
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
        /// 根据角色id获取角色权限绑定Ztree展示
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<ServPurviewInfoCustom> GetPurviewInfoByRoleId(int roleId)
        {
            try
            {
                //查询角色权限绑定
                List<ServRolePurviewModel> rolePurviewList = servRolePurviewDAL.GetRolePurviewByRoleId(roleId);
                //查询所有的园区
                List<BaseRegionConfigModel> regionList = baseRegionConfigDAL.GetAllRegionConfig();
                //查询所有的权限
                ServPurviewInfoQuery query = new ServPurviewInfoQuery();
                List<ServPurviewInfoModel> purviewList = servPurviewInfoDAL.GetEntities(query);
                //List<EnumModel> purviewList = EnumClass.GetEnumModelList<EnumClass.PurviewEnum>();
                ServPurviewInfoCustom purviewCustom;
                List<ServPurviewInfoCustom> purviewCustomList = new List<ServPurviewInfoCustom>();
                for (int j = 0; j < regionList.Count; j++)
                {
                    purviewCustom = new ServPurviewInfoCustom();
                    purviewCustom.id = regionList[j].id;
                    purviewCustom.pid = -1;
                    purviewCustom.sid = regionList[j].id;
                    purviewCustom.purview_code = 0;
                    purviewCustom.purview_name = regionList[j].region_name;
                    purviewCustomList.Add(purviewCustom);
                    for (int i = 0; i < purviewList.Count; i++)
                    {
                        purviewCustom = new ServPurviewInfoCustom();
                        purviewCustom.id = purviewList[i].id;
                        //如果权限的pid=-1则pid绑定为园区id
                        if (purviewList[i].pid == -1)
                        {
                            purviewCustom.pid = regionList[j].id;
                        }
                        else
                        {
                            purviewCustom.pid = Convert.ToInt32(purviewList[i].pid + "" + regionList[j].id); ;
                        }
                        purviewCustom.sid = Convert.ToInt32(purviewList[i].purview_code + "" + regionList[j].id);
                        purviewCustom.purview_code = purviewList[i].purview_code;
                        purviewCustom.purview_name = purviewList[i].purview_name;
                        ServRolePurviewModel rolePurviewModel = rolePurviewList.FirstOrDefault(n => n.purview_id == purviewList[i].purview_code && n.region_id == regionList[j].id);
                        if (rolePurviewModel != null)
                        {
                            purviewCustom.@checked = true;
                        }
                        else
                        {
                            purviewCustom.@checked = false;
                        }
                        purviewCustomList.Add(purviewCustom);
                    }
                }

                return purviewCustomList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id和权限id删除或新增角色权限绑定
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="purviewId"></param>
        /// <param name="checkFlag">true:新增。false:删除</param>
        /// <returns></returns>
        public bool RolePurviewBindByCheck(int roleId, int regionId, string purviewCode, bool checkFlag)
        {
            try
            {
                bool result = false;
                string[] codeArray = purviewCode.Split(',');
                for (int i = 0; i < codeArray.Length; i++)
                {
                    ServRolePurviewModel model = new ServRolePurviewModel();
                    model.role_id = roleId;
                    model.purview_id = Convert.ToInt32(codeArray[i]);
                    model.region_id = regionId;
                    //根据角色id和权限id查看数据库中是否已有绑定
                    ServRolePurviewModel rolePurview = servRolePurviewDAL.GetRolePurviewByRoleIdAndPurviewId(model);
                    if (checkFlag)//被勾选上，添加
                    {
                        //判断数据库中没有绑定才添加如有绑定则不添加
                        if (rolePurview == null)
                        {
                            int id = servRolePurviewDAL.AddEntity(model);
                        }
                        result = true;
                    }
                    else//取消勾选，删除
                    {
                        //有绑定才删除
                        if (rolePurview != null)
                        {
                            int num = servRolePurviewDAL.DeleteRolePurviewByRoleIdAndPurviewId(model);
                        }
                        result = true;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public bool RolePurviewBindByCheckEX(int roleId, int regionId, string purviewCode)
        //{
        //    try
        //    {
        //        bool result = false;
        //        string[] codeArray = purviewCode.Split(',');
        //        //根据角色id和园区id删除
        //        for (int i = 0; i < codeArray.Length; i++)
        //        {

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        #endregion

        #region  
        /// <summary>
        /// 根据角色判断是否拥有园区以及地图页面的权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public bool GetPersonMapAndRegionPurviewByRole(int roleId, int regionId)
        {
            try
            {
                bool res = false;
                ServRolePurviewQuery query = new ServRolePurviewQuery();
                query.region_id = regionId;
                query.role_id = roleId;
                List<ServRolePurviewModel> list = servRolePurviewDAL.GetRolePurviewByRoleIdAndRegionId(query);
                for (int i = 0; i < list.Count; i++)
                {
                    if (list[i].purview_id == (int)EnumClass.PurviewEnum.地图模块)
                    {
                        res = true;
                        return res;
                    }
                }
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
