using CSM.BLL;
using CSM.Model;
using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSM.Controllers
{
    public class PurviewManageController : BaseController
    {
        ServPurviewManageBLL purviewMangeBLL = new ServPurviewManageBLL();
        // GET: PurviewManage
        public ActionResult RoleIndex()
        {
            return View();
        }
        public ActionResult PurviewIndex()
        {
            return View();
        }

        #region 权限管理
        /// <summary>
        /// 获取权限树结构
        /// </summary>
        /// <returns></returns>
        public JsonResult GetPurviewTree()
        {
            try
            {
                List<ServPurviewInfoModel> purviewList = purviewMangeBLL.GetPurviewTree();
                return Json(new { status = 0, msg = purviewList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        ///// <summary>
        ///// 添加权限
        ///// </summary>
        ///// <param name="purviewName">权限名称</param>
        ///// <param name="purviewCode">权限编码</param>
        ///// <param name="purviewUrl">权限对应页面地址</param>
        ///// <param name="purviewDescribe">权限描述</param>
        ///// <param name="pid">父id</param>
        ///// <returns></returns>
        //public JsonResult AddPurviewInfo(string purviewName,string purviewCode,string purviewUrl,string purviewDescribe,int pid)
        //{
        //    try
        //    {
        //        ServPurviewInfoModel model = new ServPurviewInfoModel();
        //        model.purview_name = purviewName;
        //        model.purview_code = purviewCode;
        //        //验证权限编码是否存在
        //        ServPurviewInfoModel purview = purviewMangeBLL.GetPurviewByPurviewCode(purviewCode);
        //        if (purview != null)
        //        {
        //            return Json(new { status = 1, msg = "该权限编码已存在请重新输入" });
        //        }
        //        model.purview_url = purviewUrl;
        //        model.purview_describe = purviewDescribe;
        //        model.pid = pid;
        //        bool result = purviewMangeBLL.AddPurviewInfo(model);
        //        return Json(new { status = 0, msg = result });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = ex.Message });
        //    }
        //}
        /// <summary>
        /// 修改权限
        /// </summary>
        /// <param name="purviewId"></param>
        /// <param name="purviewName"></param>
        /// <param name="purviewCode"></param>
        /// <param name="purviewUrl"></param>
        /// <param name="purviewDescribe"></param>
        /// <param name="pid"></param>
        /// <returns></returns>
        //public JsonResult UpdatePurviewInfo(int purviewId, string purviewName, string purviewCode, string purviewUrl, string purviewDescribe, int pid)
        //{
        //    try
        //    {
        //        ServPurviewInfoModel model = new ServPurviewInfoModel();
        //        model.id = purviewId;
        //        model.purview_name = purviewName;
        //        model.purview_code = purviewCode;
        //        //验证权限编码是否存在
        //        ServPurviewInfoModel purview = purviewMangeBLL.GetPurviewByPurviewCode(purviewCode);
        //        if (purview != null)
        //        {
        //            if (purview.id != purviewId)
        //            {
        //                return Json(new { status = 1, msg = "该权限编码已存在请重新输入" });
        //            }
        //        }
        //        model.pid = pid;
        //        bool result = purviewMangeBLL.UpdatePurviewInfo(model);
        //        return Json(new { status = 0, msg = result });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = ex.Message });
        //    }
        //}
        /// <summary>
        /// 删除权限
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //public JsonResult DeletePurviewInfo(int id)
        //{
        //    try
        //    {
        //        bool result = purviewMangeBLL.DeletePurviewById(id);
        //        return Json(new { status = 0, msg = result });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = ex.Message });
        //    }
        //}
        /// <summary>
        /// 分页获取权限
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        //public JsonResult GetPurviewDataById(int pageIndex,int pageSize,int id)
        //{
        //    try
        //    {
        //        int total = 0;
        //        List<ServPurviewInfoModel> purviewList = purviewMangeBLL.GetPurviewDataById(pageIndex, pageSize, id, out total);
        //        return Json(new { status = 0, msg = new { rows=purviewList,total=total} });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = ex.Message });
        //    }
        //}
        #endregion

        #region 角色管理
        /// <summary>
        /// 分页获取角色列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public JsonResult GetRoleInfoPage(int pageIndex,int pageSize,string roleName)
        {
            try
            {
                int total = 0;
                List<ServRoleInfoModel> roleList = purviewMangeBLL.GetRoleInfoPage(pageIndex, pageSize, out total, roleName);
                return Json(new { status = 0, msg = new { rows=roleList,total=total} });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="roleName"></param>
        /// <param name="roleCode"></param>
        /// <param name="roleDescribe"></param>
        /// <returns></returns>
        public JsonResult AddRoleInfo(string roleName,string roleCode,string roleDescribe)
        {
            try
            {
                ServRoleInfoModel model = new ServRoleInfoModel();
                model.role_name = roleName;
                model.role_code = roleCode;
                model.role_describe = roleDescribe;
                bool result = purviewMangeBLL.AddRoleInfo(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改角色信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="roleName"></param>
        /// <param name="roleCode"></param>
        /// <param name="roleDescribe"></param>
        /// <returns></returns>
        public JsonResult UpdateRoleInfo(int id, string roleName, string roleCode, string roleDescribe)
        {
            try
            {
                ServRoleInfoModel model = new ServRoleInfoModel();
                model.id = id;
                model.role_name = roleName;
                model.role_code = roleCode;
                model.role_describe = roleDescribe;
                bool result = purviewMangeBLL.UpdateRoleInfo(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据id删除角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteRoleInfoById(int id)
        {
            try
            {
                bool result = purviewMangeBLL.DeleteRoleInfoById(id);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据角色id获取绑定的权限
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetPurviewInfoByRoleId(int id)
        {
            try
            {
                List<ServPurviewInfoCustom> purviewList = purviewMangeBLL.GetPurviewInfoByRoleId(id);
                return Json(new { status = 0, msg = purviewList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 绑定或解绑权限和角色的绑定
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="purviewId"></param>
        /// <param name="checkFlag"></param>
        /// <returns></returns>
        public JsonResult RolePurviewBindByCheck(int roleId,int regionId,string purviewCode, bool checkFlag)
        {
            try
            {
                bool result = purviewMangeBLL.RolePurviewBindByCheck(roleId, regionId, purviewCode, checkFlag);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        //public JsonResult RolePurviewBindByCheckBtn(int roleId, int regionId, string purviewCode)
        //{
        //    try
        //    {
        //        purviewMangeBLL.
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = ex.Message });
        //    }
        //}
        #endregion
    }
}