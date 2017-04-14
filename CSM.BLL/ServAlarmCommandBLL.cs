using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using System.Web.Script.Serialization;
using CSM.DAL;

namespace CSM.BLL
{
    //*******2016.12.12*****王林
    public class ServAlarmCommandBLL
    {
        private CSM.DAL.ServAlarmCommandDAL _servAlarmCommandDAL = new DAL.ServAlarmCommandDAL();
        /// <summary>
        /// 根据事件ID查询对应的预案
        /// </summary>
        /// <param name="eventId">事件ID</param>
        /// <returns>预案列表</returns>
        public List<CSM.Model.ServAlarmCommandModel> GetAlarmCommandByEventId(int eventId)
        {
            return _servAlarmCommandDAL.GetAlarmCommandByEventId(eventId);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        public int UpdateAlarmCommandById(CSM.Model.ServAlarmCommandModel model)
        {
            return _servAlarmCommandDAL.UpdateAlarmCommandById(model);
        }
        /// <summary>
        /// 添加一条数据
        /// </summary>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        public int AddEntity(CSM.Model.ServAlarmCommandModel entity)
        {
            return _servAlarmCommandDAL.AddEntity(entity);
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id">ID</param>
        /// <returns></returns>
        public int DeleteAlarmCommandById(int id)
        {
            return _servAlarmCommandDAL.DeleteAlarmCommandById(id);
        }

        /// <summary>
        /// 更新中间表
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        //public int AddEvent_AlarmCommand(CSM.Model.ServEventAlarmCommandModel model)
        //{
        //    return _servAlarmCommandDAL.AddEvent_AlarmCommand(model);
        //}

        /// <summary>
        /// 根据事件ID删除对应的预案流程
        /// </summary>
        /// <param name="id"></param>
        public int DeleteAlarmCommandByEventId(int eventid)
        {
            return _servAlarmCommandDAL.DeleteAlarmCommandByEventId(eventid);
        }
        /// <summary>
        /// 根据事件ID删除EventAlarmCommand中间表
        /// </summary>
        /// <param name="eventid"></param>
        /// <returns></returns>
        //public int DeleteEventAlarmCommand(int eventid)
        //{
        //    return _servAlarmCommandDAL.DeleteEventAlarmCommand(eventid);
        //}

        /// <summary>
        /// 分页获取事件
        /// </summary>
        /// <returns></returns>
        public List<CSM.Model.BaseEventTypeModel> GetEventtype(long startRowNum, long endRowNum)
        {
            return _servAlarmCommandDAL.GetEventtype(startRowNum, endRowNum);
        }
        /// <summary>
        /// 展示流程图
        /// </summary>
        /// <param name="eventId">事件的ID</param>
        /// <returns></returns>
        public CSM.Model.ServAlarmCommandModel ShowFlowchart(int eventId)
        {
            var list = this.GetAlarmCommandByEventId(eventId);//根据事件ID获取对应的应急指挥

            //列表的JSON
            Dictionary<string, string> dictNode;//数据
            Dictionary<string, string> dictLink; //线条

            List<object> listnode = new List<object>();
            List<object> listlink = new List<object>();
            foreach (var item in list)
            {
                dictNode = new Dictionary<string, string>();
                dictNode["key"] = item.child_node.ToString();
                dictNode["text"] = item.content;
                dictNode["color"] = item.color;

                listnode.Add(dictNode);//数据

                dictLink = new Dictionary<string, string>();
                dictLink["from"] = item.parent_node.ToString();
                dictLink["to"] = item.child_node.ToString();

                listlink.Add(dictLink);//线条
            }

            ServAlarmCommandModel acModel = new ServAlarmCommandModel();
            JavaScriptSerializer js = new JavaScriptSerializer();
            acModel.nodeJson= js.Serialize(listnode);//序列化列表
            acModel.linkJson = js.Serialize(listlink);//序列化线条
            return acModel;
        }
        /// <summary>
        /// 通过事件名称展示预案流程图
        /// </summary>
        /// <param name="eventName"></param>
        /// <returns></returns>
        public CSM.Model.ServAlarmCommandModel ShowFlowchartByName(string eventName)
        {
            BaseEventTypeDAL baseEventTypeDal = new BaseEventTypeDAL();
            try
            {
                BaseEventTypeModel model = baseEventTypeDal.GetEntityByEventName(eventName);
                var list = this.GetAlarmCommandByEventId(model.id);//根据事件ID获取对应的应急指挥
                Dictionary<string, string> dictNode;//数据
                Dictionary<string, string> dictLink; //线条

                List<object> listnode = new List<object>();
                List<object> listlink = new List<object>();
                foreach (var item in list)
                {
                    dictNode = new Dictionary<string, string>();
                    dictNode["key"] = item.child_node.ToString();
                    dictNode["text"] = item.content;
                    dictNode["color"] = item.color;

                    listnode.Add(dictNode);//数据

                    dictLink = new Dictionary<string, string>();
                    dictLink["from"] = item.parent_node.ToString();
                    dictLink["to"] = item.child_node.ToString();

                    listlink.Add(dictLink);//线条
                }

                ServAlarmCommandModel acModel = new ServAlarmCommandModel();
                JavaScriptSerializer js = new JavaScriptSerializer();
                acModel.nodeJson = js.Serialize(listnode);//序列化列表
                acModel.linkJson = js.Serialize(listlink);//序列化线条
                return acModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
            
        }
        /// <summary>
        /// 是否保存成功
        /// </summary>
        /// <param name="ModelJson">数据</param>
        /// <param name="eventId">事件ID（保存的是哪个事件对应的流程图）</param>
        /// <returns></returns>
        public bool IsSaveSuccess(string ModelJson, string eventId)
        {
            try
            {
                //用户点击保存按钮的时候，首先去判断是新增保存还是修改保存，
                //所以根据事件的ID 查询一下是否有对应的预案，如果没有，则是新增的保存
                var list = this.GetAlarmCommandByEventId(Convert.ToInt32(eventId));
                //不管是添加还是修改，先把之前先删除了，
                //删除之前的
                this.DeleteAlarmCommandByEventId(Convert.ToInt32(eventId));
                ServAlarmCommandModel model;
                // ServEventAlarmCommandModel eventModel;
                Dictionary<string, object> dicModel = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(ModelJson);//将model反序列化
                object[] nodeObj = (object[])dicModel["nodeDataArray"];//读取文本信息
                object[] linkObj = (object[])dicModel["linkDataArray"];//读取线条信息
                Dictionary<string, object> linkDic = (Dictionary<string, object>)nodeObj[0];
                int startKey = Convert.ToInt32(linkDic["key"]);
                object[] link = new object[linkObj.Length + 1];
                if (list.Count <= 0)//表示新增
                {

                    Dictionary<string, object> dicobj = new Dictionary<string, object>();


                    for (int i = 0; i < linkObj.Length; i++)
                    {
                        link[i + 1] = linkObj[i];//转换数组
                    }

                    dicobj.Add("from", "0");
                    dicobj.Add("to", startKey);
                    link[0] = dicobj;//为第一个索引的位置赋值
                }

                Dictionary<string, object> nodeDict;//node
                Dictionary<string, object> linkDict;//link
                for (int i = 0; i < nodeObj.Length; i++)
                {
                    model = new ServAlarmCommandModel();
                    nodeDict = (Dictionary<string, object>)nodeObj[i];//node
                    if (list.Count <= 0)
                    {
                        linkDict = (Dictionary<string, object>)link[i];
                    }
                    else
                    {
                        linkDict = (Dictionary<string, object>)linkObj[i];
                    }
                    //link
                    model.child_node = linkDict["to"].ToString();//to
                    model.content = nodeDict["text"].ToString();//text
                    model.parent_node = linkDict["from"].ToString();//from
                    model.parent_id = Convert.ToInt32(linkDict["from"]);//parent_id 
                    model.id = Convert.ToInt32(nodeDict["key"]);//id
                    model.color = "lightgreen";
                    model.create_time = DateTime.Now;//创建时间
                    model.update_time = DateTime.Now;//更新时间
                    model.event_id = Convert.ToInt32(eventId);
                    //先添加预案表
                    int id = this.AddEntity(model);

                }
                return true;
            }
            catch ( Exception ex)
            {
                return false;
            }
              
        }
    }
}
