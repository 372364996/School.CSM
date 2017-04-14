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
using System.Xml;

namespace CSM.BLL
{
    public class LargeScreenBLL
    {
        private BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
        private BaseRegionExtendConfigDAL regionExtendConfigDal = new BaseRegionExtendConfigDAL();
        /// <summary>
        /// 获取全部园区配置
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllShowRegion()
        {
            try
            {
                return baseRegionConfigDal.GetAllRegionConfig();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 初始化获取大屏配置
        /// </summary>
        /// <returns></returns>
        public LargeScreenCustom GetInitLargeScreenConfig()
        {
            try
            {

                BaseRegionConfigModel region = baseRegionConfigDal.GetAllRegionConfig().FirstOrDefault(); //获取第一个配置显示的园区
                if (region != null)
                {
                    return GetLargeScreenConfig(region.id);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public LargeScreenCustom GetLargeScreenConfig(int regionId)
        {
            try
            {
                BaseRegionExtendConfigBLL regionConfigbll = new BaseRegionExtendConfigBLL();
                //BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                //query.config_type = (int)EnumClass.RegionExtendConfigType.大屏;
                //query.region_id = regionId;
                //  BaseRegionExtendConfigModel regionExtendConfig = regionExtendConfigDal.GetRegionExtendConfigByRegionIdAndConfigType(query).FirstOrDefault();
                BaseRegionExtendConfigModel regionExtendConfig = regionConfigbll.GetFirstRegionExtendConfigByRegionIdAndType(regionId, (int)EnumClass.RegionExtendConfigType.大屏);
                if (regionExtendConfig != null)
                {
                    LargeScreenCustom screen = new LargeScreenCustom();
                    screen.id = regionExtendConfig.id;
                    screen.column = int.Parse(regionExtendConfig.ext1);
                    screen.row = int.Parse(regionExtendConfig.ext2);
                    screen.width = int.Parse(regionExtendConfig.ext3);
                    screen.height = int.Parse(regionExtendConfig.ext4);
                    screen.screenList = GetScreenListFromXML(regionExtendConfig.ext20);
                    screen.galleryList = GetGalleryList(regionId);
                    return screen;
                }
                else
                {
                    LargeScreenCustom screen = new LargeScreenCustom();
                    screen.id = 0;
                    screen.column = 0;
                    screen.row = 0;
                    screen.width = 0;
                    screen.height = 0;
                    screen.screenList = null;
                    screen.galleryList = GetGalleryList(regionId);
                    return screen;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="column"></param>
        /// <param name="row"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="code"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int AddGalleryConfig(int regionId, int column, int row, int width, int height, string code, string galleryCode, string galleryName, string type)
        {
            try
            {
                BaseRegionExtendConfigModel model = new BaseRegionExtendConfigModel();
                List<ScreenConfig> screenConfigList = new List<ScreenConfig>();
                ScreenConfig screen = null;
                //判断是否是单一屏配置
                if (code.Contains(','))
                {
                    string[] codeArr = code.Split(',');
                    string[] galleryCodeArr = galleryCode.Split(',');
                    string[] galleryNameArr = galleryName.Split(',');
                    string[] typeArr = type.Split(',');
                    for (int i = 0; i < codeArr.Length; i++)
                    {
                        screen = new ScreenConfig();
                        screen.galleryCode = galleryCodeArr[i];
                        // screen.galleryName = galleryNameArr[i];
                        screen.galleryName = galleryNameArr[i] == "无绑定" ? "" : galleryNameArr[i];
                        screen.galleryType = int.Parse(typeArr[i]);
                        screen.screenCode = codeArr[i];
                        screenConfigList.Add(screen);
                    }
                }
                else
                {
                    screen = new ScreenConfig();
                    screen.galleryCode = galleryCode;
                    // screen.galleryName = galleryName;
                    screen.galleryName = galleryName == "无绑定" ? "" : galleryName;
                    screen.galleryType = int.Parse(type);
                    screen.screenCode = code;
                    screenConfigList.Add(screen);
                }
                string xml = GetConfigXmlByScreenList(screenConfigList);  //将大屏配置转成xml文件
                model.region_id = regionId;
                model.config_type = (int)EnumClass.RegionExtendConfigType.大屏;
                model.ext1 = column.ToString();
                model.ext2 = row.ToString();
                model.ext3 = width.ToString();
                model.ext4 = height.ToString();
                model.ext20 = xml;
                //if (regionExtendConfigDal.AddEntity(model) > 0)  //新增并获得返回值
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
                return regionExtendConfigDal.AddEntity(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改大屏配置
        /// </summary>
        /// <param name="configId"></param>
        /// <param name="column"></param>
        /// <param name="row"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="code"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public bool UpdateGalleryConfig(int configId, int regionId, int column, int row, int width, int height, string code, string galleryCode, string galleryName, string type)
        {
            try
            {
                BaseRegionExtendConfigModel model = new BaseRegionExtendConfigModel();
                List<ScreenConfig> screenConfigList = new List<ScreenConfig>();
                ScreenConfig screen = null;
                //判断是否是单一屏配置
                if (code.Contains(','))
                {
                    string[] codeArr = code.Split(',');
                    string[] galleryCodeArr = galleryCode.Split(',');
                    string[] galleryNameArr = galleryName.Split(',');
                    string[] typeArr = type.Split(',');
                    for (int i = 0; i < codeArr.Length; i++)
                    {
                        screen = new ScreenConfig();
                        screen.galleryCode = galleryCodeArr[i];
                        // screen.galleryName = galleryNameArr[i];
                        screen.galleryName = galleryNameArr[i] == "无绑定" ? "" : galleryNameArr[i];
                        screen.galleryType = int.Parse(typeArr[i]);
                        screen.screenCode = codeArr[i];
                        screenConfigList.Add(screen);
                    }
                }
                else
                {
                    screen = new ScreenConfig();
                    screen.galleryCode = galleryCode;
                    // screen.galleryName = galleryName;
                    screen.galleryName = galleryName == "无绑定" ? "" : galleryName;
                    screen.galleryType = int.Parse(type);
                    screen.screenCode = code;
                    screenConfigList.Add(screen);
                }
                string xml = GetConfigXmlByScreenList(screenConfigList);  //将大屏配置转成xml文件
                model.id = configId;
                model.region_id = regionId;
                model.config_type = (int)EnumClass.RegionExtendConfigType.大屏;
                model.ext1 = column.ToString();
                model.ext2 = row.ToString();
                model.ext3 = width.ToString();
                model.ext4 = height.ToString();
                model.ext20 = xml;
                if (regionExtendConfigDal.UpdateEntity(model) > 0)  //修改并获得返回值
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 通过园区ID获取快速上大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<ScreenConfig> GetFastGalleryConfigByRegionId(int regionId)
        {
            try
            {
                BaseRegionExtendConfigBLL regionConfigbll = new BaseRegionExtendConfigBLL();
                BaseRegionExtendConfigModel regionExtendConfig = regionConfigbll.GetFirstRegionExtendConfigByRegionIdAndType(regionId, (int)EnumClass.RegionExtendConfigType.大屏); //获取大屏配置
                if (regionExtendConfig != null)
                {
                    List<ScreenConfig> screenList = GetScreenListFromXML(regionExtendConfig.ext20);//解析大屏配置
                    if (screenList != null && screenList.Count > 0)
                    {
                        var fastScreen = screenList.Where(n => n.galleryType == (int)EnumClass.GalleryType.快速上大屏);  //获取快速上大屏的屏
                        return fastScreen == null ? null : fastScreen.ToList();
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #region  xml配置文件格式
        //  <?xml version = "1.0" encoding="utf-8"?>
        //<root>
        //  <screen>
        //    <code>1-1</code>
        //    <galleryName>TV1</galleryName>
        //    <galleryCode>TV1</galleryCode>
        //    <type>1</type>
        //   </screen>
        //  <screen>
        //    <code>1-2</code>
        //    <galleryName>TV2</galleryName>
        //    <galleryCode>TV2</galleryCode>
        //    <type>1</type>
        //   </screen>
        //</root>
        #endregion
        /// <summary>
        /// 加载解析xml文件
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public List<ScreenConfig> GetScreenListFromXML(string xml)
        {
            try
            {
                List<ScreenConfig> list = new List<ScreenConfig>();
                if (!string.IsNullOrEmpty(xml))
                {
                    ScreenConfig screen = null;
                    XmlDocument myXmlDoc = new XmlDocument();
                    myXmlDoc.LoadXml(xml);
                    for (int i = 0; i < myXmlDoc.SelectNodes("root/screen").Count; i++)
                    {
                        screen = new ScreenConfig();
                        screen.galleryCode = myXmlDoc.SelectNodes("root/screen")[i].SelectSingleNode("galleryCode").InnerText;
                        screen.galleryName = myXmlDoc.SelectNodes("root/screen")[i].SelectSingleNode("galleryName").InnerText;
                        screen.screenCode = myXmlDoc.SelectNodes("root/screen")[i].SelectSingleNode("code").InnerText;
                        screen.galleryType = int.Parse(myXmlDoc.SelectNodes("root/screen")[i].SelectSingleNode("type").InnerText);
                        list.Add(screen);
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区大屏配置生成xml文件
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public string GetConfigXmlByScreenList(List<ScreenConfig> list)
        {
            try
            {
                StringBuilder builder = new StringBuilder();
                builder.Append("<?xml version = '1.0' encoding='utf-8'?><root>");
                for (int i = 0; i < list.Count; i++)
                {
                    builder.Append("<screen><code>" + list[i].screenCode + "</code><galleryName>" + list[i].galleryName + "</galleryName><galleryCode>" + list[i].galleryCode + "</galleryCode><type>" + list[i].galleryType + "</type></screen>");
                }
                builder.Append("</root>");
                return builder.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取监视器
        /// </summary>
        /// <returns></returns>
        public List<GalleryInfo> GetGalleryList(int regionId)
        {
            try
            {
                ServDeviceInfoDAL deviceInfoDal = new ServDeviceInfoDAL();
                List<GalleryInfo> retGalleryList = new List<GalleryInfo>();
                GalleryInfo gallery = null;
                List<ServDeviceInfoModel> galleryList = deviceInfoDal.GetAllDevice(5, regionId);//5代表监视器
                for (int i = 0; i < galleryList.Count; i++)
                {
                    gallery = new GalleryInfo();
                    gallery.galleryCode = galleryList[i].device_code;
                    gallery.galleryName = galleryList[i].device_name;
                    gallery.galleryStatus = galleryList[i].device_status;
                    gallery.id = galleryList[i].id;
                    retGalleryList.Add(gallery);
                }
                return retGalleryList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
