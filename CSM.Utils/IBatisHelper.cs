using System;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Scope;
using IBatisNet.DataMapper.MappedStatements;

namespace CSM.Utils
{
    public class IBatisHelper
    {
        /// <summary>  
        /// 得到运行时ibatis.net动态生成的SQL  
        /// </summary>  
        /// <param name="sqlMapper"></param>  
        /// <param name="statementName"></param>  
        /// <param name="paramObject"></param>  
        /// <returns></returns>  
        public static string GetRuntimeSql(ISqlMapper sqlMapper, string statementName, object paramObject)
        {
            string result = string.Empty;
            try
            {
                IMappedStatement statement = sqlMapper.GetMappedStatement(statementName);
                if (!sqlMapper.IsSessionStarted)
                {
                    sqlMapper.OpenConnection();
                }
                RequestScope scope = statement.Statement.Sql.GetRequestScope(statement, paramObject, sqlMapper.LocalSession);
                result = scope.PreparedStatement.PreparedSql;
            }
            catch (Exception ex)
            {
                result = "获取SQL语句出现异常:" + ex.Message;
            }
            return result;
        }
    }
}
