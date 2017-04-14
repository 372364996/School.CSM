using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
using static CSM.Common.EnumClass;
using CSM.Common;
using CSM.DAL;
using System.Collections;
using System.Xml;

namespace CSM.BLL
{
    public class BaseMapConfigBLL
    {
        OperationXML xmlclass = new OperationXML();
        private BaseMapConfigDAL baseMapConfigDAL = new BaseMapConfigDAL();//地图配置
        private BaseIndustryDAL baseIndustryDAL = new BaseIndustryDAL();//行业配置
        private BaseAreaTypeDAL baseAreaTypeDAL = new BaseAreaTypeDAL();//区域类型
        private ServDefinedDeviceDAL servDeviceDefinedDAL = new ServDefinedDeviceDAL();//自定义设备类型
        ServFileInfoBLL servFileInfoBLL = new ServFileInfoBLL();//文件表
        private BaseRegionConfigDAL baseRegionConfigDAL = new BaseRegionConfigDAL();//园区配置
        private BaseNewMapConfigDAL baseNewMapConfigDAL = new BaseNewMapConfigDAL();//新的地图配置
        ServRolePurviewDAL servRolePurviewDAL = new ServRolePurviewDAL();
        BaseRegionExtendConfigDAL baseRegionExtendConfigDAL = new BaseRegionExtendConfigDAL();//园区扩展
        /*#region 地图配置
        /// <summary>
        /// 根据ID获取地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns>地图配置数据</returns>
        public CSM.Model.BaseMapConfigModel GetModelByID(int id)
        {
            BaseMapConfigModel model = new BaseMapConfigModel();
            try
            {
                model = baseMapConfigDAL.GetEntity(id);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return model;
        }
        /// <summary>
        /// 获取所有的地图配置数据 2016.12.01 张丰刚
        /// </summary>
        /// <returns>地图配置集合</returns>
        public List<BaseMapConfigModel> GetMapConfig()
        {
            List<BaseMapConfigModel> list = new List<BaseMapConfigModel>();
            try
            {
                BaseMapConfigQuery baseMapConfigQuery = new BaseMapConfigQuery();
                list = baseMapConfigDAL.GetEntities(baseMapConfigQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        /// <summary>
        /// 新增地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="configModel"></param>
        /// <returns></returns>
        public int AddMapConfig(BaseMapConfigModel configModel)
        {
            int id = 0;
            try
            {
                id = baseMapConfigDAL.AddEntity(configModel);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return id;
        }
        /// <summary>
        /// 修改地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="configModel"></param>
        /// <returns></returns>
        public bool UpdateMapConfig(BaseMapConfigModel configModel)
        {
            bool result = false;
            try
            {
                result = baseMapConfigDAL.UpdateEntity(configModel.id, configModel);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }
        /// <summary>
        /// 删除地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public bool DelteMapConfig(int id)
        {
            bool result = false;
            try
            {
                result = baseMapConfigDAL.DelEntity(id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }
        /// <summary>
        /// 根据地图引擎和园区类型获取地图配置
        /// </summary>
        /// <param name="mapEngine">地图引擎</param>
        /// <param name="regionType">园区类别(主园区、副园区)</param>
        /// <param name="mapType">园区类别(主园区、副园区)</param>
        /// <returns></returns>
        public BaseMapConfigModel GetMapConfigByMapType(int mapEngine, int regionType, int mapType)
        {
            BaseMapConfigQuery model = new BaseMapConfigQuery();
            model.map_engine = mapEngine;
            model.region_type = regionType;
            model.map_type = mapType;
            BaseMapConfigModel configModel = new BaseMapConfigModel();
            //实现代码
            try
            {
                configModel = baseMapConfigDAL.GetMapConfigByQuery(model).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return configModel;
        }
        /// <summary>
        /// 根据地图引擎和园区编码、2.5D类型获取地图配置
        /// </summary>
        /// <param name="mapEngine">地图引擎</param>
        /// <param name="regionCode">园区编号</param>
        /// <param name="mapType">园区类别(25D)</param>
        /// <returns></returns>
        public BaseMapConfigModel GetMapConfigByRegionCode(int mapEngine, string region_code, int mapType, int region_type)
        {
            BaseMapConfigQuery model = new BaseMapConfigQuery();
            model.map_engine = mapEngine;
            model.region_code = region_code;
            model.map_type = mapType;
            model.region_type = region_type;
            BaseMapConfigModel configModel = new BaseMapConfigModel();
            //实现代码
            try
            {
                configModel = baseMapConfigDAL.GetMapConfigByQuery(model).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return configModel;
        }

        /// <summary>
        /// 获取当前地图引擎  读取XML
        /// </summary>
        /// <returns></returns>
        public int GetMapEngine(string path)
        {
            int type = 0;
            try
            {
                string mapengine = xmlclass.ReadXml(path, "MapEngine");
                if (mapengine != "")
                {
                    type = Convert.ToInt32(mapengine);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return type;
        }
        /// <summary>
        /// 修改当前地图引擎配置 写XML文件
        /// </summary>
        /// <param name="path">文件地址</param>
        /// <param name="value">修改值</param>
        /// <returns></returns>
        public bool SetMapEngine(string path, string value)
        {
            bool result = false;
            try
            {
                result = xmlclass.WriteXml(path, "MapEngine", value);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }
        /// <summary>
        /// 获取当前地图配置
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public BaseMapConfigModel GetNowMapConfig(string path, int mapType)
        {
            try
            {
                int mapEngine = GetMapEngine(path);
                return GetMapConfigByMapEngineTypeRegion(mapEngine, mapType, (int)RegionType.主园区);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据地图引擎、类别、园区类别获取当期地图配置
        /// </summary>
        /// <param name="mapEngine"></param>
        /// <param name="mapType"></param>
        /// <param name="regionType"></param>
        /// <returns></returns>
        public BaseMapConfigModel GetMapConfigByMapEngineTypeRegion(int mapEngine, int mapType, int regionType)
        {
            try
            {
                //如果注册的地图类型为2（2.5D）
                if (mapType == 2)
                {
                    //首先查询出2.5D对应的code
                    BaseMapConfigQuery query2D = new BaseMapConfigQuery();
                    query2D.map_engine = mapEngine;
                    query2D.map_type = 1;
                    query2D.region_type = regionType;
                    BaseMapConfigModel model2D = baseMapConfigDAL.GetNowMapConfigByQuery(query2D);
                    if (model2D != null)
                    {
                        string region_code = model2D.region_code;
                        BaseMapConfigQuery query25D = new BaseMapConfigQuery();
                        query25D.map_engine = mapEngine;
                        query25D.map_type = 2;//地图类型为2.5D
                        query25D.region_code = region_code;//园区编号
                        query25D.region_type = 2;//园区类型为副园区，2.5D在注册的时候都是默认副园区
                        BaseMapConfigModel model25D = baseMapConfigDAL.GetMapConfigByQuery(query25D).FirstOrDefault();
                        return model25D;

                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    BaseMapConfigQuery query = new BaseMapConfigQuery();
                    query.map_engine = mapEngine;
                    query.map_type = mapType;
                    query.region_type = regionType;
                    return baseMapConfigDAL.GetNowMapConfigByQuery(query);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        #endregion*/

        #region 地图配置新
        /// <summary>
        /// 通过园区的id得到园区
        /// </summary>
        /// <returns></returns>
        public int GetRegionConfigModelByID(int regionID)
        {
            int regionDefaultEngine = -1;
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = baseRegionConfigDAL.GetEntity(regionID);
                if (baseRegionConfigModel == null)
                {
                    regionDefaultEngine = -1;

                }

                else
                {
                    regionDefaultEngine = baseRegionConfigModel.map_engine;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return regionDefaultEngine;

        }
        /// <summary>
        /// 得到初始加载的地图类型2D/2.5
        /// </summary>
        /// <param name="regionID"></param>
        /// <returns></returns>
        public int GetRegionInitMapTypeByID(int regionID)
        {
            int InitMapType = -1;
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = baseRegionConfigDAL.GetEntity(regionID);
                if (baseRegionConfigModel == null)
                {
                    InitMapType = -1;

                }

                else
                {
                    InitMapType = baseRegionConfigModel.initial_map_type;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return InitMapType;

        }
        public List<BaseNewMapConfigModel> GetDefalutNewMapConfigByRegionID(int regionID)
        {
            List<BaseNewMapConfigModel> defalutNewMapConfigModelList = new List<BaseNewMapConfigModel>();
            try
            {
                int regionMapType = GetRegionConfigModelByID(regionID);

                List<BaseNewMapConfigModel> baseNewMapConfigModelList = GetAllNewMapConfigByRegionID(regionID);
                if (baseNewMapConfigModelList.Count > 0)
                {
                    for (int i = 0; i < baseNewMapConfigModelList.Count; i++)
                    {
                        if (baseNewMapConfigModelList[i].map_engine == regionMapType)
                        {
                            defalutNewMapConfigModelList.Add(baseNewMapConfigModelList[i]);
                        }
                    }
                }

                return defalutNewMapConfigModelList;

            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 园区与地图配置的联表查询
        /// </summary>
        /// <returns></returns>
        public List<RegionConfigJoinMapConfig> GetRegionAndMapConfig()
        {
            try
            {
                List<RegionConfigJoinMapConfig> regionAndMapConfigList = baseRegionConfigDAL.getRegionAndMapConfig();
                return regionAndMapConfigList;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 添加园区
        /// </summary>
        /// <param name="baseRegionConfigModel"></param>
        /// <returns></returns>
        public int AddRegion(BaseRegionConfigModel baseRegionConfigModel)
        {
            int id = 0;
            try
            {
                //对园区的园区编号进行验证
                BaseRegionConfigModel modelRegionCode = GetRegionByRegionCode(baseRegionConfigModel.region_code);
                //对园区的园区名称进行验证
                BaseRegionConfigModel modelRegionName = GetRegionByRegionName(baseRegionConfigModel.region_name);
                if (modelRegionCode != null)
                {
                    if (modelRegionCode.is_show == 0)
                    {
                        id = -2; return id;//删除的中有添加的这个code
                    }
                    else
                    {
                        id = 0; return id;
                    }

                }

                if (modelRegionName != null)
                {
                    if (modelRegionName.is_show == 0)
                    {
                        id = -3; return id;
                    }
                    else
                    {
                        id = -1; return id;
                    }

                }
                else if (modelRegionCode == null && modelRegionName == null)
                {
                    id = baseRegionConfigDAL.AddEntity(baseRegionConfigModel);
                    return id;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return id;
        }
        /// <summary>
        /// 删除园区，软删，将园区的is_show更改为0
        /// </summary>
        /// <param name="regionID"></param>
        /// <returns></returns>
        public bool DeleteRegionConfig(int regionID)
        {
            bool result = false;
            try
            {
                result = baseRegionConfigDAL.DeleteRegionConfig(regionID);
                //根据园区id删除角色权限绑定
                servRolePurviewDAL.DeleteRolePurviewByRegionId(regionID);
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 回收已删除的园区
        /// </summary>
        /// <param name="regionIdArray"></param>
        /// <returns></returns>
        public int recycleRegion(string regionIdArray)
        {
            int deleteNum = 0;
            try
            {
                regionIdArray = regionIdArray.Substring(0, regionIdArray.Length - 1);
                string[] idArray = regionIdArray.Split(',');
                for (int i = 0; i < idArray.Length; i++)
                {
                    int id = int.Parse(idArray[i].ToString());
                    bool result = baseRegionConfigDAL.recycleRegion(id);
                    if (result == true)
                    {
                        deleteNum++;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return deleteNum;
        }
        /// <summary>
        /// 更新园区信息
        /// </summary>
        /// <param name="regionID"></param>
        /// <param name="regionName"></param>
        /// <param name="regionCode"></param>
        /// <param name="regionImage"></param>
        /// <returns></returns>
        public bool UpdateRegionInfo(int regionID, string regionName, string regionCode, string regionImage, string logoImage)
        {
            bool result = false;
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
                baseRegionConfigModel.id = regionID;
                baseRegionConfigModel.region_name = regionName;
                baseRegionConfigModel.region_code = regionCode;
                baseRegionConfigModel.region_image = regionImage;
                baseRegionConfigModel.logo_image = logoImage;
                result = baseRegionConfigDAL.UpdateRegionInfo(baseRegionConfigModel);
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 添加地图配置
        /// </summary>
        /// <param name="baseNewMapConfigModel"></param>
        /// <returns></returns>
        public int AddNewMapConfig(BaseNewMapConfigModel baseNewMapConfigModel)
        {
            int id = 0;
            try
            {
                //对添加地图配置园区的地图引擎、地图类型2D/25D进行验证
                BaseNewMapConfigModel Model = GetByRegionIdEngineType(baseNewMapConfigModel.region_id, baseNewMapConfigModel.map_engine, baseNewMapConfigModel.map_type);
                if (Model != null)
                {
                    id = 0; return id;
                }
                else
                {
                    id = baseNewMapConfigDAL.AddEntity(baseNewMapConfigModel);
                    return id;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return id;
        }
        /// <summary>
        /// 更新地图配置信息
        /// </summary>
        /// <returns></returns>
        public bool UpdateNewMapConfigInfo(int mapConfigID, string mapName, string mapCenter, string mapBounds, string mapSrc)
        {
            bool result = false;
            try
            {
                BaseNewMapConfigModel baseNewMapConfigModel = new BaseNewMapConfigModel();
                baseNewMapConfigModel.id = mapConfigID;
                baseNewMapConfigModel.map_name = mapName;
                baseNewMapConfigModel.map_center = mapCenter;
                baseNewMapConfigModel.map_bounds = mapBounds;
                baseNewMapConfigModel.map_src = mapSrc;
                result = baseNewMapConfigDAL.UpdateNewMapConfigInfo(baseNewMapConfigModel);
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 根据园区id、地图引擎类型、地图类型获取当前地图配置，添加地图引擎的时候后端当前园区是否添加过此配置
        /// </summary>
        /// <returns></returns>
        public BaseNewMapConfigModel GetByRegionIdEngineType(int regionID, int mapEngine, int mapType)
        {
            BaseNewMapConfigModel baseNewMapConfigModel = new BaseNewMapConfigModel();
            try
            {
                BaseNewMapConfigQuery baseNewMapConfigQuery = new BaseNewMapConfigQuery();
                baseNewMapConfigQuery.region_id = regionID;
                baseNewMapConfigQuery.map_engine = mapEngine;
                baseNewMapConfigQuery.map_type = mapType;
                baseNewMapConfigModel = baseNewMapConfigDAL.GetQueryMapConfigByQuery(baseNewMapConfigQuery);

            }
            catch (Exception)
            {

                throw;
            }
            return baseNewMapConfigModel;
        }
        /// <summary>
        /// 根据园区的id获取园区对应的所有的地图配置
        /// </summary>
        /// <param name="regionID">园区的id，根据此来查询地图的配置</param>
        /// <returns></returns>
        public List<BaseNewMapConfigModel> GetAllNewMapConfigByRegionID(int regionID)
        {
            List<BaseNewMapConfigModel> baseNewMapConfigModelList = new List<BaseNewMapConfigModel>();
            try
            {
                baseNewMapConfigModelList = baseNewMapConfigDAL.GetAllNewMapConfigByRegionID(regionID);

            }
            catch (Exception)
            {

                throw;
            }
            return baseNewMapConfigModelList;
        }
        /// <summary>
        /// 读取全部的园区，配置地图页面加载时候循环的显示出来
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllRegionConfig()
        {
            List<BaseRegionConfigModel> baseRegionConfigModelList = new List<BaseRegionConfigModel>();
            try
            {
                BaseRegionConfigQuery baseRegionConfigQuery = new BaseRegionConfigQuery();
                baseRegionConfigModelList = baseRegionConfigDAL.GetEntities(baseRegionConfigQuery);

            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModelList;
        }
        /// <summary>
        ///得到已经删除的园区
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetDeleteRegion()
        {
            List<BaseRegionConfigModel> baseRegionConfigModelList = new List<BaseRegionConfigModel>();
            try
            {
                BaseRegionConfigQuery baseRegionConfigQuery = new BaseRegionConfigQuery();
                baseRegionConfigModelList = baseRegionConfigDAL.GetDeleteRegion(baseRegionConfigQuery);

            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModelList;
        }
        /// <summary>
        /// 读取全部的地图配置
        /// </summary>
        /// <returns></returns>
        public List<BaseNewMapConfigModel> GetAllNewMapConfig()
        {
            List<BaseNewMapConfigModel> baseNewMapConfigModelList = new List<BaseNewMapConfigModel>();
            try
            {
                BaseNewMapConfigQuery baseNewMapConfigQuery = new BaseNewMapConfigQuery();
                baseNewMapConfigModelList = baseNewMapConfigDAL.GetEntities(baseNewMapConfigQuery);

            }
            catch (Exception)
            {

                throw;
            }
            return baseNewMapConfigModelList;
        }
        /// <summary>
        ///  对园区的园区编号进行验证
        /// </summary>
        /// <param name="regionCode"></param>
        /// <returns></returns>

        public BaseRegionConfigModel GetRegionByRegionCode(string regionCode)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                BaseRegionConfigQuery query = new BaseRegionConfigQuery();
                query.region_code = regionCode;
                baseRegionConfigModel = baseRegionConfigDAL.GetQueryRegionConfig(query);
            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }
        /// <summary>
        /// 对园区的园区名称进行验证
        /// </summary>
        /// <param name="regionName"></param>
        /// <returns></returns>
        public BaseRegionConfigModel GetRegionByRegionName(string regionName)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                BaseRegionConfigQuery query = new BaseRegionConfigQuery();
                query.region_name = regionName;
                baseRegionConfigModel = baseRegionConfigDAL.GetQueryRegionConfig(query);
            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }

        /// <summary>
        /// 更新园区默认地图引擎、地图类型
        /// </summary>
        /// <param name="regionID"></param>
        /// <param name="mapEngine"></param>
        /// <param name="mapType"></param>
        public bool UpdateRegionEngineAndType(int regionID, int mapEngine, int mapType)
        {
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
                baseRegionConfigModel.id = regionID;
                baseRegionConfigModel.map_engine = mapEngine;
                baseRegionConfigModel.initial_map_type = mapType;
                bool result = baseRegionConfigDAL.UpdateRegionEngineAndType(baseRegionConfigModel);
                if (result == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }



        }
        #endregion

        #region 行业配置
        /// <summary>
        /// 获取所有行业配置信息
        /// </summary>
        /// <param name="pageIndex">当前页码</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="total">总条数</param>
        /// <returns></returns>
        public List<BaseIndustryModel> GetAllIndustry(int pageIndex, int pageSize, out int total)
        {
            //具体实现
            try
            {
                BaseIndustryQuery query = new BaseIndustryQuery();
                int startNum = (pageIndex - 1) * pageSize + 1;
                int endNum = pageIndex * pageSize;
                List<BaseIndustryModel> modellist = new List<BaseIndustryModel>();
                modellist = baseIndustryDAL.GetEntities(query, startNum, endNum, out total);
                return modellist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取所有行业配置
        /// </summary>
        /// <returns></returns>
        public List<BaseIndustryModel> GetAllIndustry()
        {
            try
            {
                BaseIndustryQuery query = new BaseIndustryQuery();
                List<BaseIndustryModel> modellist = new List<BaseIndustryModel>();
                modellist = baseIndustryDAL.GetEntities(query);
                return modellist;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        
        /// <summary>
        /// 获取当前默认行业配置
        /// </summary>
        /// <param name="path">xml路径</param>
        /// <returns></returns>
        public BaseIndustryModel GetDefaultIndustry(string path)
        {
            try
            {
                int industryID = GetDefaultIndustryXML(path);
                BaseIndustryModel industryModel = new BaseIndustryModel();
                industryModel = baseIndustryDAL.GetEntity(industryID);
                if (industryModel == null)
                {
                    industryModel = new BaseIndustryModel();
                    industryModel.id = industryID;
                }
                return industryModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        /// <summary>
        /// 获取当前默认行业id
        /// </summary>
        /// <param name="path">xml路径</param>
        /// <returns></returns>
        public int GetDefaultIndustryXML(string path)
        {
            try
            {
                int industryID = 0;
                string mapengine = xmlclass.ReadXml(path, "Industry");
                if (mapengine != "")
                {
                    industryID = Convert.ToInt32(mapengine);
                }
                return industryID;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 设置默认行业配置
        /// </summary>
        /// <param name="path"></param>
        /// <param name="IndustryID"></param>
        /// <returns></returns>
        public bool SetDefaultIndustry(string path, int IndustryID)
        {
            try
            {
                bool result = false;
                result = xmlclass.WriteXml(path, "Industry", IndustryID.ToString());
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改行业配置
        /// </summary>
        /// <param name="industry">行业model</param>
        /// <returns></returns>
        public bool UpdateIndustry(BaseIndustryModel industry)
        {
            try
            {
                bool result = false;
                //具体实现
                //修改行业配置表
                BaseIndustryModel industryModel = new BaseIndustryModel();
                industryModel.id = industry.id;
                industryModel.industry_code = industry.industry_code;
                industryModel.industry_name = industry.industry_name;
                industryModel.content = industry.content;
                int num = baseIndustryDAL.UpdateEntity(industryModel);
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
        /// 新增行业配置
        /// </summary>
        /// <param name="industry">行业model</param>
        /// <returns></returns>
        public bool AddIndustry(BaseIndustryModel industry)
        {
            try
            {
                bool result = false;
                //写入行业表
                BaseIndustryModel industryModel = new BaseIndustryModel();
                industryModel.industry_name = industry.industry_name;
                industryModel.industry_code = industry.industry_code;
                industryModel.content = industry.content;
                int industryID = baseIndustryDAL.AddEntity(industryModel);
                if (industryID != 0)
                {
                    result = true;
                }
                //具体实现
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 删除行业配置
        /// </summary>
        /// <param name="industryID"></param>
        /// <returns></returns>
        public bool DeleteIndustry(int industryID)
        {
            try
            {
                bool result = false;
                //删除行业表
                result = baseIndustryDAL.DelEntity(industryID);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        #endregion

        #region 自定义设备类型配置
        /// <summary>
        /// 获取所有的基础设备类型
        /// </summary>
        /// <returns></returns>
        public List<EnumModel> GetAllBaseDeviceType()
        {
            try
            {
                List<EnumModel> deviceTypeList = EnumClass.GetEnumModelList<BaseDeviceType>();
                return deviceTypeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业id获取行业下所有的基础设备类型
        /// </summary>
        /// <param name="industryId">行业id</param>
        /// <returns></returns>
        public List<BaseDeviceTypeModel> GetBaseDeviceTypeByIndustryId(int industryId)
        {
            try
            {
                //获取绑定了基本设备类型的自定义设备类型
                List<ServDefinedDeviceModel> definedList = servDeviceDefinedDAL.GetDefinedDeviceTool(industryId);
                List<ServDefinedDeviceModel> definedList1 = definedList.Where(n => n.base_device_type_id != 0).ToList();
                BaseDeviceTypeModel model;
                List<BaseDeviceTypeModel> list = new List<BaseDeviceTypeModel>();
                for (int i = 0; i < definedList1.Count; i++)
                {
                    model = new BaseDeviceTypeModel();
                    model.id = definedList1[i].base_device_type_id;
                    model.type_name = Enum.GetName(typeof(BaseDeviceType), definedList1[i].base_device_type_id);
                    list.Add(model);
                }
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 获取所有的基础设备类型
        /// </summary>
        /// <returns></returns>
        public List<BaseDeviceTypeModel> GetAllBaseDeviceTypeModel()
        {
            try
            {
                BaseDeviceTypeModel model;
                List<BaseDeviceTypeModel> list = new List<BaseDeviceTypeModel>();
                List<EnumModel> modellist = EnumClass.GetEnumModelList<BaseDeviceType>();
                for (int i = 0; i < modellist.Count; i++)
                {
                    model = new BaseDeviceTypeModel();
                    model.id = modellist[i].key;
                    model.type_name = modellist[i].value;
                    list.Add(model);
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        /// <summary>
        /// 获取地图左侧设备工具条
        /// </summary>
        /// <param name="path">xml文件路径</param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetDefinedDeviceTypeTool(int industryID)
        {
            try
            {
                List<ServDefinedDeviceModel> definedList = servDeviceDefinedDAL.GetDefinedDeviceTool(industryID);
                return definedList;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
       
        /// <summary>
        /// 根据id获取自定义设备类型
        /// </summary>
        /// <param name="deviceDefinedID"></param>
        /// <returns></returns>
        public ServDefinedDeviceModel GetDeviceDefinedByID(int deviceDefinedID)
        {
            try
            {
                ServDefinedDeviceModel DefinedCustomModel = servDeviceDefinedDAL.GetEntity(deviceDefinedID);
                return DefinedCustomModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据行业获取所有自定义设备类型，所有pid为0的，只取父级
        /// </summary>
        /// <param name="industry">行业id</param>
        /// <returns></returns>
        public List<ServDefinedDeviceModel> GetAllDeviceDefinedCustom(int industry, int pageIndex, int pageSize, out int total)
        {
            try
            {
                ServDefinedDeviceQuery query = new ServDefinedDeviceQuery();
                query.industry_id = industry;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                List<ServDefinedDeviceModel> definedModellist = servDeviceDefinedDAL.GetDefinedDevicePage(query,  out total);
                return definedModellist;
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
        public List<ServDefinedDeviceModel> GetChildDeviceDefinedByPid(int pid)
        {
            try
            {
                return servDeviceDefinedDAL.GetDefinedDeviceByPid(pid);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
       
        /// <summary>
        /// 新增自定义设备类型
        /// </summary>
        /// <param name="deviceDefined"></param>
        /// <returns></returns>
        public int AddDeviceDefined(ServDefinedDeviceModel deviceDefined)
        {
            try
            {
                //判断所选的基础设备类型是否被绑定
                int num = servDeviceDefinedDAL.VerificationBaseDeviceTypeByTypeIdAndIndustryId(deviceDefined);
                if (num != 0)
                {
                    return 2;//基础设备类型已被绑定
                }
                //添加自定义设备类型
                int definedID = servDeviceDefinedDAL.AddEntity(deviceDefined);
                if (definedID != 0)
                {
                    return 1;//添加成功
                }
                else
                {
                    return 3;//添加失败
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改自定义设备类型
        /// </summary>
        /// <param name="deviceDefined"></param>
        /// <returns></returns>
        public int UpdateDeviceDefined(ServDefinedDeviceModel deviceDefined)
        {
            try
            {
                //判断所选的基础设备类型是否被绑定
                int num = servDeviceDefinedDAL.VerificationBaseDeviceTypeByTypeIdAndIndustryIdAndDefinedId(deviceDefined);
                if (num != 0)
                {
                    return 2;//基础设备类型已被绑定
                }
                //判断节点下是否有子节点如果有则不能绑定基础设备类型
                List<ServDefinedDeviceModel> deviceList = servDeviceDefinedDAL.GetDefinedDeviceByPid(deviceDefined.id);
                if (deviceList.Count != 0)
                {
                    if (deviceDefined.base_device_type_id != 0)
                    {
                        return 4;//有子节点无法绑定基础设备类型
                    }
                }
                //如果隐藏的是父节点则顺带隐藏父节点下的子节点
                if (deviceDefined.pid == 0)
                {
                    num = servDeviceDefinedDAL.UpdateChildDeviceEnable(deviceDefined);
                }
                num = servDeviceDefinedDAL.UpdateDeviceDefinedById(deviceDefined);
                if (num != 0)
                {
                    return 1;//修改成功
                }
                else
                {
                    return 3;//修改失败
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除自定义设备类型
        /// </summary>
        /// <param name="deviceDefinedID">设备类型id</param>
        /// <param name="flag">父级子级表示</param>
        /// <param name="industryTypeID">行业id</param>
        /// <returns></returns>
        public bool DeleteDeviceDefined(int deviceDefinedID)
        {
            try
            {
                bool result = false;
                //根据id获取自定义设备类型和下属子级
                int num = servDeviceDefinedDAL.DeleteDefinedDeviceAndChildByBaseId(deviceDefinedID);
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
        #endregion

        #region 区域类型配置
        /// <summary>
        /// 获取区域类型配置
        /// </summary>
        /// <param name="industryID">行业id</param>
        /// <param name="pageIndex">起始页码</param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="total">总条数</param>
        /// <returns></returns>
        public List<BaseAreaTypeModel> GetAllAreaType(int industryID, int pageIndex, int pageSize, out int total)
        {
            try
            {
                BaseAreaTypeQuery query = new BaseAreaTypeQuery();
                query.industryId = industryID;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                List<BaseAreaTypeModel> areaList = baseAreaTypeDAL.GetPageBaseAreaLevel(query, out total);
                return areaList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 获取地图右侧区域工具栏
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public List<BaseAreaTypeModel> GetAreaTypeTool(string path)
        {
            try
            {
                //获取当前默认行业
                int industryID = GetDefaultIndustryXML(path);
                List<BaseAreaTypeModel> areaList = baseAreaTypeDAL.GetAreaTypeTool(industryID);
                return areaList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 新增区域类型
        /// </summary>
        /// <param name="areaTypeModel"></param>
        /// <returns></returns>
        public bool AddAreaType(BaseAreaTypeModel areaTypeModel)
        {
            try
            {
                bool result = false;
                //具体实现
                int areaID = baseAreaTypeDAL.AddEntity(areaTypeModel);
                
                if (areaID != 0) { result = true; }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 修改区域类型
        /// </summary>
        /// <param name="areaTypeModel"></param>
        /// <returns></returns>
        public bool UpdateAreaType(BaseAreaTypeModel areaTypeModel)
        {
            try
            {
                bool result = false;
                int num = baseAreaTypeDAL.UpdateAreaType(areaTypeModel);
                result = true;
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        /// 删除区域类型
        /// </summary>
        /// <param name="areaTypeID"></param>
        /// <returns></returns>
        public bool DeleteAreaType(BaseAreaTypeModel model)
        {
            try
            {
                bool result = false;
                //删除区域类型
                int num = baseAreaTypeDAL.DeleteAreaTypeById(model);
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
        #endregion

        #region 视频配置
        /// <summary>
        /// 获取视频配置
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public VideoConfigCustom GetVideoConfig(string path)
        {
            try
            {
                VideoConfigCustom videoConfig = new VideoConfigCustom();
                videoConfig.videoPlatform = Convert.ToInt32(xmlclass.ReadXml(path, "videoPlateform"));
                videoConfig.serverIP = xmlclass.ReadXml(path, "serverIP");
                videoConfig.userName = xmlclass.ReadXml(path, "userName");
                videoConfig.userPwd = xmlclass.ReadXml(path, "userPwd");
                return videoConfig;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据园区id获取视频配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public VideoConfigCustom GetVideoConfigByRegionId(int regionId)
        {
            try
            {
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.region_id = regionId;
                query.config_type = (int)RegionExtendConfigType.视频配置;
                List<BaseRegionExtendConfigModel> extList = baseRegionExtendConfigDAL.GetRegionExtendConfigByRegionIdAndConfigType(query);
                VideoConfigCustom custom = new VideoConfigCustom();
                if (extList.Count > 0)
                {
                    custom.regionId = regionId;
                    string str = extList[0].ext1;
                    XmlDocument myXmlDoc = new XmlDocument();
                    myXmlDoc.LoadXml(str);
                    custom.videoPlatform = Convert.ToInt32(myXmlDoc.SelectSingleNode("root/videoPlatform").InnerText);
                    custom.serverIP = myXmlDoc.SelectSingleNode("root/serverIP").InnerText;
                    custom.userName = myXmlDoc.SelectSingleNode("root/userName").InnerText;
                    custom.userPwd = myXmlDoc.SelectSingleNode("root/userPwd").InnerText;
                }
                return custom;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改地图配置
        /// </summary>
        /// <param name="videoConfig">地图配置</param>
        /// <param name="path"></param>
        /// <returns></returns>
        public bool UpdateVideoConfig(VideoConfigCustom videoConfig)
        {
            try
            {
                bool result = false;
                StringBuilder builder = new StringBuilder();
                builder.Append("<?xml version = '1.0' encoding='utf-8'?><root><videoPlatform>" + videoConfig.videoPlatform + "</videoPlatform><serverIP>" + videoConfig.serverIP + "</serverIP><userName>" + videoConfig.userName + "</userName><userPwd>" + videoConfig.userPwd + "</userPwd></root>");
                string videoStr = builder.ToString();
                BaseRegionExtendConfigModel model = new BaseRegionExtendConfigModel();
                model.region_id = videoConfig.regionId;
                model.config_type = (int)RegionExtendConfigType.视频配置;
                model.ext1 = videoStr;
                //根据园区id和配置类型查找配置
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.region_id = videoConfig.regionId;
                query.config_type = (int)RegionExtendConfigType.视频配置;
                List<BaseRegionExtendConfigModel> extlist = baseRegionExtendConfigDAL.GetRegionExtendConfigByRegionIdAndConfigType(query);
                int num = 0;
                //修改
                if (extlist.Count > 0)
                {
                    num = baseRegionExtendConfigDAL.UpdateRegionExtendConfigByRegionIdAndConfigType(model);
                }
                else
                {
                    //新增
                    num = baseRegionExtendConfigDAL.AddEntity(model);
                }

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
        /// 获取当前默认视频配置
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public string GetDefaulstVideoPlatform(string path)
        {
            try
            {
                string videoPlatform = xmlclass.ReadXml(path, "videoPlateform");
                return videoPlatform;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改默认视频配置
        /// </summary>
        /// <param name="videoPlate"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public bool UpdateVideoPlatformDefault(int videoPlate, string path)
        {
            try
            {
                bool result = xmlclass.WriteXml(path, "videoPlateform", videoPlate.ToString());
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

    }
}
