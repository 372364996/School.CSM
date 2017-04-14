using CSM.Model;
using CSM.DAL;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using CSM.Common;

namespace CSM.BLL
{
    public class EmergencyPhoneBLL
    {
        /// <summary>
        /// 获取全部园区配置
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllShowRegion()
        {
            try
            {
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                return baseRegionConfigDal.GetAllRegionConfig();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID和园区名称获取应急电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="regionName"></param>
        /// <returns></returns>
        public List<EmergencyPhoneTree> GetPhoneByRegionId(int regionId, string regionName)
        {
            try
            {
                List<EmergencyPhoneTree> treeList = new List<EmergencyPhoneTree>();
                BaseRegionExtendConfigDAL regionDal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                query.region_id = regionId;
                List<BaseRegionExtendConfigModel> regionConfigList = regionDal.GetRegionExtendConfigByRegionIdAndConfigType(query);
                int circle = 1;//定义循环变量起始值
                //赋值根节点
                EmergencyPhoneTree ztree = new EmergencyPhoneTree();
                ztree.id = -1;
                ztree.name = regionName;
                ztree.phone = "";
                ztree.pid = -2;
                treeList.Add(ztree);
                //添加子节点
                if (regionConfigList != null && regionConfigList.Count > 0)
                {
                    BaseRegionExtendConfigModel model = regionConfigList.FirstOrDefault();
                    List<EmergencyPhoneCustom> customList = TranXMLToObj(model.ext20);//将应急电话xml转化为对象
                    for (int i = 0; i < customList.Count; i++)
                    {
                        //将节点加入treeList集合
                        EmergencyPhoneTree tree = new EmergencyPhoneTree();
                        tree.id = circle;
                        tree.name = customList[i].groupName;
                        tree.phone = "";
                        tree.pid = -1;
                        treeList.Add(tree);
                        circle++;
                        //将子节点加入treeList集合
                        for (int j = 0; j < customList[i].phoneList.Count; j++)
                        {
                            EmergencyPhoneTree trees = new EmergencyPhoneTree();
                            trees.id = circle;
                            trees.pid = tree.id;
                            trees.name = customList[i].phoneList[j].phoneName;
                            trees.phone = customList[i].phoneList[j].phoneNum;
                            treeList.Add(trees);
                            circle++;
                        }
                    }
                }
                return treeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 更新应急电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="info"></param>
        /// <returns></returns>
        public bool UpdatePhoneByRegionId(int regionId, string info)
        {
            try
            {
                List<EmergencyPhoneCustom> list = new List<EmergencyPhoneCustom>();
                string xml = TranObjToXml(list);
                BaseRegionExtendConfigDAL regionDal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                query.region_id = regionId;
                List<BaseRegionExtendConfigModel> regionConfigList = regionDal.GetRegionExtendConfigByRegionIdAndConfigType(query);
                int res = 0;
                if (regionConfigList != null && regionConfigList.Count > 0)
                {
                    //含有该园区配置则进行修改
                    BaseRegionExtendConfigModel telePhoneConfig = regionConfigList.FirstOrDefault();
                    telePhoneConfig.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                    telePhoneConfig.ext20 = xml;
                    telePhoneConfig.region_id = regionId;
                    res = regionDal.UpdateEntity(telePhoneConfig);

                }
                else
                {
                    //未含有该园区配置进行新增
                    BaseRegionExtendConfigModel telePhoneConfig = new BaseRegionExtendConfigModel();
                    telePhoneConfig.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                    telePhoneConfig.ext20 = xml;
                    telePhoneConfig.region_id = regionId;
                    res = regionDal.AddEntity(telePhoneConfig);
                }
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        /// <summary>
        /// 新增应急电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="regionName"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public EventRet AddGroupNameByRegionId(int regionId, string groupName)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (configId != -1)
                {
                    //修改记录，新增电话组
                    var entity = list.Where(n => n.groupName == groupName).FirstOrDefault();
                    if (entity == null)
                    {
                        EmergencyPhoneCustom custom = new EmergencyPhoneCustom();
                        custom.groupName = groupName;
                        custom.phoneList = null;
                        list.Add(custom);
                        string xml = TranObjToXml(list);
                        int res = UpdateEmergencyConfig(configId, regionId, xml);
                        if (res > 0)
                        {
                            ret.message = "应急电话组新增成功！";
                            ret.state = 0;
                        }
                        else
                        {
                            ret.message = "应急电话组新增失败";
                            ret.state = 1;
                        }
                    }
                    else
                    {
                        ret.message = "应急电话组重复";
                        ret.state = 1;
                    }
                }
                else   //新增记录，新增电话组
                {
                    EmergencyPhoneCustom custom = new EmergencyPhoneCustom();
                    custom.groupName = groupName;
                    custom.phoneList = null;
                    list.Add(custom);
                    string xml = TranObjToXml(list);
                    int res = AddEmergencyConfig(regionId, xml);
                    if (res > 0)
                    {
                        ret.message = "应急电话新增成功！";
                        ret.state = 0;
                    }
                    else
                    {
                        ret.message = "应急电话组新增失败";
                        ret.state = 1;
                    }

                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改应急电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="oldGroupName"></param>
        /// <param name="newGroupName"></param>
        /// <returns></returns>
        public EventRet UpdateGroupNameByRegionId(int regionId, string oldGroupName, string newGroupName)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (list != null && list.Count > 0)
                {
                    if (list.Where(n => n.groupName == newGroupName).FirstOrDefault() != null)
                    {
                        ret.message = "修改的电话组名称重复";
                        ret.state = 1;
                    }
                    else
                    {
                        if (list.Where(n => n.groupName == oldGroupName).FirstOrDefault() != null)
                        {
                            list.Where(n => n.groupName == oldGroupName).FirstOrDefault().groupName = newGroupName;
                            string xml = TranObjToXml(list);
                            int res = UpdateEmergencyConfig(configId, regionId, xml);
                            if (res > 0)
                            {
                                ret.message = "修改电话组名称成功";
                                ret.state = 0;
                            }
                            else
                            {
                                ret.message = "修改电话组名称失败";
                                ret.state = 1;
                            }
                        }
                        else
                        {
                            ret.message = "未找到该园区应急电话组为" + oldGroupName + "的配置";
                            ret.state = 1;
                        }
                    }

                }
                else
                {
                    ret.message = "未找到该园区应急电话配置";
                    ret.state = 1;
                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除应急电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public EventRet DeleteGroupByRegionId(int regionId, string groupName)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (list != null && list.Count > 0)
                {
                    if (list.Where(n => n.groupName == groupName).FirstOrDefault() != null)
                    {
                        list.Remove(list.Where(n => n.groupName == groupName).FirstOrDefault());
                        string xml = TranObjToXml(list);
                        int res = UpdateEmergencyConfig(configId, regionId, xml);
                        if (res > 0)
                        {
                            ret.message = "删除电话组名称成功";
                            ret.state = 0;
                        }
                        else
                        {
                            ret.message = "删除电话组名称失败";
                            ret.state = 1;
                        }
                    }
                    else
                    {
                        ret.message = "未找到该园区应急电话组为" + groupName + "的配置";
                        ret.state = 1;
                    }
                }
                else
                {
                    ret.message = "未找到该园区应急电话配置";
                    ret.state = 1;
                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="telePhoneName"></param>
        /// <param name="telePhoneNum"></param>
        /// <returns></returns>
        public EventRet AddTelePhoneByGroupName(int regionId, string groupName, string telePhoneName, string telePhoneNum)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (list != null && list.Count > 0)
                {
                    var entity = list.Where(n => n.groupName == groupName).FirstOrDefault();
                    if (entity != null)
                    {
                        if (entity.phoneList != null && entity.phoneList.Count > 0)
                        {
                            #region  新增加判断
                            var phoneEntity = entity.phoneList.Where(n => n.phoneName == telePhoneName).FirstOrDefault();
                            if (phoneEntity == null)
                            {
                                PhoneGroup group = new PhoneGroup();
                                group.phoneName = telePhoneName;
                                group.phoneNum = telePhoneNum;
                                list.Where(n => n.groupName == groupName).FirstOrDefault().phoneList.Add(group);
                                string xml = TranObjToXml(list);
                                int res = UpdateEmergencyConfig(configId, regionId, xml);
                                if (res > 0)
                                {
                                    ret.message = "新增电话名称成功";
                                    ret.state = 0;
                                }
                                else
                                {
                                    ret.message = "新增电话名称失败";
                                    ret.state = 1;
                                }
                            }
                            else
                            {
                                ret.message = "电话名称重复";
                                ret.state = 1;
                            }
                            #endregion
                        }
                        else
                        {
                            List<PhoneGroup> phoneList = new List<PhoneGroup>();
                            PhoneGroup group = new PhoneGroup();
                            group.phoneName = telePhoneName;
                            group.phoneNum = telePhoneNum;
                            phoneList.Add(group);
                            list.Where(n => n.groupName == groupName).FirstOrDefault().phoneList = phoneList;
                            string xml = TranObjToXml(list);
                            int res = UpdateEmergencyConfig(configId, regionId, xml);
                            if (res > 0)
                            {
                                ret.message = "新增电话成功";
                                ret.state = 0;
                            }
                            else
                            {
                                ret.message = "新增电话失败";
                                ret.state = 1;
                            }
                        }

                    }
                    else
                    {
                        ret.message = "未找到该园区应急电话组为" + groupName + "的配置";
                        ret.state = 1;
                    }
                }
                else
                {
                    ret.message = "未找到该园区应急电话配置";
                    ret.state = 1;
                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="oldTelephoneName"></param>
        /// <param name="newTelephoneName"></param>
        /// <param name="newTelephoneNum"></param>
        /// <returns></returns>
        public EventRet UpdateTelePhoneByGroupName(int regionId, string groupName, string oldTelephoneName, string newTelephoneName, string newTelephoneNum)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (list != null && list.Count > 0)
                {
                    var entity = list.Where(n => n.groupName == groupName).FirstOrDefault();
                    if (entity != null)
                    {
                        if (entity.phoneList != null && entity.phoneList.Count > 0)
                        {
                            var phoneEntity = entity.phoneList.Where(n => n.phoneName == oldTelephoneName).FirstOrDefault();
                            if (phoneEntity != null)
                            {
                                list.Where(n => n.groupName == groupName).FirstOrDefault()
                                  .phoneList.Where(n => n.phoneName == oldTelephoneName).FirstOrDefault().phoneNum = newTelephoneNum;
                                list.Where(n => n.groupName == groupName).FirstOrDefault()
                                    .phoneList.Where(n => n.phoneName == oldTelephoneName).FirstOrDefault().phoneName = newTelephoneName;

                                string xml = TranObjToXml(list);
                                int res = UpdateEmergencyConfig(configId, regionId, xml);
                                if (res > 0)
                                {
                                    ret.message = "修改电话名称成功";
                                    ret.state = 0;
                                }
                                else
                                {
                                    ret.message = "修改电话名称失败";
                                    ret.state = 1;
                                }
                            }
                            else
                            {
                                ret.message = "未找到该园区应急电话为" + oldTelephoneName + "的配置";
                                ret.state = 1;
                            }
                        }
                        else
                        {
                            ret.message = "未找到该园区应急电话为" + oldTelephoneName + "的配置";
                            ret.state = 1;
                        }

                    }
                    else
                    {
                        ret.message = "未找到该园区应急电话组为" + groupName + "的配置";
                        ret.state = 1;
                    }
                }
                else
                {
                    ret.message = "未找到该园区应急电话配置";
                    ret.state = 1;
                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="telePhoneName"></param>
        /// <returns></returns>
        public EventRet DeleteTelephoneByGroupName(int regionId, string groupName, string telePhoneName)
        {
            try
            {
                int configId = -1;
                EventRet ret = new EventRet();
                List<EmergencyPhoneCustom> list = GetEmergencyConfig(regionId, out configId);
                if (list != null && list.Count > 0)
                {
                    var entity = list.Where(n => n.groupName == groupName).FirstOrDefault();
                    if (entity != null)
                    {
                        if (entity.phoneList != null && entity.phoneList.Count > 0)
                        {
                            var phoneEntity = entity.phoneList.Where(n => n.phoneName == telePhoneName).FirstOrDefault();
                            if (phoneEntity != null)
                            {
                                list.Where(n => n.groupName == groupName).FirstOrDefault()
                                    .phoneList.Remove(phoneEntity);
                                string xml = TranObjToXml(list);
                                int res = UpdateEmergencyConfig(configId, regionId, xml);
                                if (res > 0)
                                {
                                    ret.message = "删除电话名称成功";
                                    ret.state = 0;
                                }
                                else
                                {
                                    ret.message = "删除电话名称失败";
                                    ret.state = 1;
                                }
                            }
                            else
                            {
                                ret.message = "未找到该园区应急电话为" + telePhoneName + "的配置";
                                ret.state = 1;
                            }
                        }
                        else
                        {
                            ret.message = "未找到该园区应急电话为" + telePhoneName + "的配置";
                            ret.state = 1;
                        }

                    }
                    else
                    {
                        ret.message = "未找到该园区应急电话组为" + groupName + "的配置";
                        ret.state = 1;
                    }
                }
                else
                {
                    ret.message = "未找到该园区应急电话配置";
                    ret.state = 1;
                }
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增园区电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="xml"></param>
        /// <returns></returns>
        public int AddEmergencyConfig(int regionId, string xml)
        {
            try
            {
                BaseRegionExtendConfigDAL dal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigModel model = new BaseRegionExtendConfigModel();
                model.region_id = regionId;
                model.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                model.ext20 = xml;
                return dal.AddEntity(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区修改应急电话配置
        /// </summary>
        /// <param name="configId"></param>
        /// <param name="regionId"></param>
        /// <param name="xml"></param>
        /// <returns></returns>
        public int UpdateEmergencyConfig(int configId, int regionId, string xml)
        {
            try
            {
                BaseRegionExtendConfigDAL dal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigModel model = new BaseRegionExtendConfigModel();
                model.id = configId;
                model.region_id = regionId;
                model.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                model.ext20 = xml;
                return dal.UpdateEntity(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过园区获取园区应急电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<EmergencyPhoneCustom> GetEmergencyConfig(int regionId, out int configId)
        {

            try
            {
                List<EmergencyPhoneCustom> customList = new List<EmergencyPhoneCustom>();
                BaseRegionExtendConfigDAL regionDal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.config_type = (int)EnumClass.RegionExtendConfigType.应急电话;
                query.region_id = regionId;
                configId = -1;
                List<BaseRegionExtendConfigModel> regionConfigList = regionDal.GetRegionExtendConfigByRegionIdAndConfigType(query);
                if (regionConfigList != null && regionConfigList.Count > 0)
                {
                    BaseRegionExtendConfigModel model = regionConfigList.FirstOrDefault();
                    configId = model.id;
                    customList = TranXMLToObj(model.ext20);//将应急电话xml转化为对象
                }
                return customList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region  应急电话xml配置
        // <?xml version = "1.0" encoding="utf-8" ?>
        //<Root>
        //  <Group Name = "公用电话" >
        //    <TelePhone Name="火警电话" >119</TelePhone>
        //    <TelePhone Name="报警电话" >110</TelePhone>
        //  </Group>
        //  <Group Name = "校内电话" >
        //    <TelePhone Name="中控室" >89534606</TelePhone>
        //    <TelePhone Name="中控室" >89534606</TelePhone>
        //  </Group>
        //</Root>
        #endregion
        /// <summary>
        /// 将xml文件解析为对象
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public List<EmergencyPhoneCustom> TranXMLToObj(string xml)
        {
            try
            {
                List<EmergencyPhoneCustom> list = new List<EmergencyPhoneCustom>();
                EmergencyPhoneCustom custom = null;
                XmlDocument myXmlDoc = new XmlDocument();
                myXmlDoc.LoadXml(xml);
                XmlNodeList childNodes = myXmlDoc.SelectNodes("Root/Group");
                for (int i = 0; i < childNodes.Count; i++)
                {
                    custom = new EmergencyPhoneCustom();
                    custom.phoneList = new List<PhoneGroup>();
                    PhoneGroup phone = null;
                    custom.groupName = ((XmlElement)childNodes[i]).GetAttribute("Name");
                    XmlNodeList nodes = childNodes[i].SelectNodes("TelePhone");
                    for (int j = 0; j < nodes.Count; j++)
                    {
                        phone = new PhoneGroup();
                        phone.phoneName = ((XmlElement)nodes[j]).GetAttribute("Name");
                        phone.phoneNum = nodes[j].InnerText;
                        custom.phoneList.Add(phone);
                    }
                    list.Add(custom);
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 将list集合转xml文件
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public string TranObjToXml(List<EmergencyPhoneCustom> list)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<?xml version = '1.0' encoding='utf-8'?><Root>");
                if (list != null && list.Count > 0)
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        sb.Append("<Group Name='");
                        sb.Append(list[i].groupName);
                        sb.Append("'>");
                        if (list[i].phoneList != null && list[i].phoneList.Count > 0)
                        {
                            for (int j = 0; j < list[i].phoneList.Count; j++)
                            {
                                sb.Append("<TelePhone Name='");
                                sb.Append(list[i].phoneList[j].phoneName);
                                sb.Append("'>");
                                sb.Append(list[i].phoneList[j].phoneNum);
                                sb.Append("</TelePhone>");
                            }
                        }
                        sb.Append("</Group>");
                    }
                }
                sb.Append("</Root>");
                return sb.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
