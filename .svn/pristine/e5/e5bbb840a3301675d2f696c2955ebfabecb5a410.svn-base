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
    public class BaseOrganizationBLL
    {
        BaseOrganizitionInfoDAL baseOrganizationDAL = new BaseOrganizitionInfoDAL();
        ServOrganizationChartDAL servOrganizationChartDAL = new ServOrganizationChartDAL();
        /// <summary>
        /// 获取组织架构树集合
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseOrganizitionInfoModel> GetOrganizationTree(BaseOrganizitionInfoQuery query)
        {
            try
            {
                List<BaseOrganizitionInfoModel> orglist = baseOrganizationDAL.GetOrganizationByOrgTypeAndRegionId(query);
                //BaseOrganizitionInfoModel model = new BaseOrganizitionInfoModel();
                //model.id = -1;
                //model.org_name = "组织架构";
                //model.pid = -2;
                //model.pcode = "root";
                //orglist.Add(model);
                return orglist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加或修改组织架构节点
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="pid"></param>
        /// <param name="pcode"></param>
        /// <returns></returns>
        public bool UpdateOrgNameOrAddOrg(int id,string name,int pid,string pcode)
        {
            try
            {
                bool result = false;
                BaseOrganizitionInfoModel model = new BaseOrganizitionInfoModel();
                model.id = id;
                model.org_name = name;
                model.pid = pid;
                //提取中文首字母
                ConvertChinese chinese = new ConvertChinese();
                string codes = chinese.GetHeadOfChs(name);
                model.org_code = codes;
                model.pcode = pcode;
                model.org_type = 1;
                model.region_id = 1;
                
                if (id == 0)//添加节点
                {
                    //往ztree表中添加一条数据
                    int num = baseOrganizationDAL.AddEntity(model);
                    if (num != 0)
                    {
                        ServOrganizationChartModel chartModel = new ServOrganizationChartModel();
                        chartModel.content = name;
                        chartModel.child_node = num.ToString();
                        chartModel.parent_node = pid.ToString();
                        chartModel.create_time = DateTime.Now;
                        chartModel.update_time = DateTime.Now;
                        //往gojs表中添加一条数据
                        num = servOrganizationChartDAL.AddEntity(chartModel);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                }
                else//修改节点名称
                {
                    //修改ztee表中数据
                    int num = baseOrganizationDAL.UpdateOrganizationName(model);
                    if (num != 0)
                    {
                        ServOrganizationChartModel chartModel = new ServOrganizationChartModel();
                        chartModel.content = name;
                        chartModel.child_node = id.ToString();
                        chartModel.update_time = DateTime.Now;
                        //修改gojs表中数据
                        num = servOrganizationChartDAL.UpdateOrgChartByChildNode(chartModel);
                        if (num != 0)
                        {
                            result = true;
                        }
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id删除组织架构以及子节点
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteOrganizationById(int id)
        {
            try
            {
                bool result = false;
                //删除Ztree表中数据
                int num = baseOrganizationDAL.DeleteOrganizationAndChildById(id);
                if (num != 0)
                {
                    //删除gojs表中数据
                    num = servOrganizationChartDAL.DeleteOrgChartByChildNode(id.ToString());
                    if (num != 0)
                    {
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
        /// <summary>
        /// 根据parent_node获取gojs展示所需数据和关联关系
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public GoJSModel GetOrganizationGoJsData(int pid)
        {
            try
            {
                ServOrganizationChartQuery query = new ServOrganizationChartQuery();
                //query.parent_node = pid.ToString();
                List<ServOrganizationChartModel> orgList = new List<ServOrganizationChartModel>();
                if (pid == -1)
                {
                    orgList= servOrganizationChartDAL.GetOrganizationChar(query);
                }
                else
                {
                    query.child_node = pid.ToString();
                    orgList = servOrganizationChartDAL.GetOrganizationCharByChildNode(query);
                }
                List<GoJSNodeDataCustom> nodeList = new List<GoJSNodeDataCustom>();
                List<GoJSLinkDataCustom> linkList = new List<GoJSLinkDataCustom>();
                for (int i = 0; i < orgList.Count; i++)
                {
                    GoJSNodeDataCustom node = new GoJSNodeDataCustom();
                    node.key = orgList[i].child_node;
                    node.name = orgList[i].content;
                    GoJSLinkDataCustom link = new GoJSLinkDataCustom();
                    link.from = orgList[i].parent_node;
                    link.to = orgList[i].child_node;
                    nodeList.Add(node);
                    linkList.Add(link);
                }
                //if (pid == -1)
                //{
                //    GoJSNodeDataCustom node1 = new GoJSNodeDataCustom();
                //    node1.key = "-1";
                //    node1.name = "组织架构";
                //    nodeList.Add(node1);
                //}
                GoJSModel goJSModel = new GoJSModel();
                goJSModel.nodeList = nodeList;
                goJSModel.linkList = linkList;
                return goJSModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
