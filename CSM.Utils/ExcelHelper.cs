using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Utils
{
    public class ExcelHelper
    {
        //public  static System.IO.MemoryStream GetExcelStream(List<Model.CustomModel.AlarmRecordModel> list)
        //{
        //    try
        //    {
        //        NPOI.HSSF.UserModel.HSSFWorkbook book2 = new NPOI.HSSF.UserModel.HSSFWorkbook();
        //        //添加一个sheet
        //        NPOI.SS.UserModel.ISheet sheet2 = book2.CreateSheet("Sheet2");
        //        //给sheet2添加第一行的头部标题
        //        NPOI.SS.UserModel.IRow row2 = sheet2.CreateRow(0);
        //        row2.CreateCell(0).SetCellValue("告警编号");
        //        row2.CreateCell(1).SetCellValue("设备编号");
        //        row2.CreateCell(2).SetCellValue("事件类型");
        //        row2.CreateCell(3).SetCellValue("设备名称");
        //        row2.CreateCell(4).SetCellValue("子系统类型");
        //        row2.CreateCell(5).SetCellValue("报警时间");
        //        row2.CreateCell(6).SetCellValue("报警级别");
        //        row2.CreateCell(7).SetCellValue("确警人");
        //        row2.CreateCell(8).SetCellValue("确警时间");
        //        row2.CreateCell(9).SetCellValue("确警结果");
        //        row2.CreateCell(10).SetCellValue("报警位置");
        //        row2.CreateCell(11).SetCellValue("确警描述");

        //        //将数据逐步写入sheet2各个行
        //        for (int i = 0; i < list.Count; i++)
        //        {
        //            NPOI.SS.UserModel.IRow rowtemp = sheet2.CreateRow(i + 1);
        //            rowtemp.CreateCell(0).SetCellValue(list[i].id);
        //            rowtemp.CreateCell(1).SetCellValue(list[i].alarmName);
        //            rowtemp.CreateCell(2).SetCellValue(list[i].alarmEvent);
        //            rowtemp.CreateCell(3).SetCellValue(list[i].deviceName);
        //            rowtemp.CreateCell(4).SetCellValue(list[i].subSystem);
        //            rowtemp.CreateCell(5).SetCellValue(list[i].alarmTime.ToString());
        //            rowtemp.CreateCell(6).SetCellValue(list[i].alarmLevel);
        //            rowtemp.CreateCell(7).SetCellValue(list[i].confirmPersonName);
        //            rowtemp.CreateCell(8).SetCellValue(list[i].alarmTime == list[i].confirmAlarmTime ? "" : list[i].confirmAlarmTime.ToString());
        //            rowtemp.CreateCell(9).SetCellValue(list[i].confirmResult);
        //            rowtemp.CreateCell(10).SetCellValue(list[i].alarmLocation);
        //            rowtemp.CreateCell(11).SetCellValue(list[i].confirmAlarmText);
        //        }
        //        // 写入到客户端 
        //        System.IO.MemoryStream ms = new System.IO.MemoryStream();
        //        book2.Write(ms);
        //        ms.Seek(0, SeekOrigin.Begin);
        //        return ms;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        static int EXCEL03_MaxRow = 65535;

        /// <summary>
        /// 将DataTable转换为excel2003格式。
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static  System.IO.MemoryStream DataTableToExcel(DataTable dt, string sheetName)
        {
            try
            {
                IWorkbook book = new HSSFWorkbook();
                if (dt.Rows.Count < EXCEL03_MaxRow)
                    DataWriteToSheet(dt, 0, dt.Rows.Count - 1, book, sheetName);
                else
                {
                    int page = dt.Rows.Count / EXCEL03_MaxRow;
                    for (int i = 0; i < page; i++)
                    {
                        int start = i * EXCEL03_MaxRow;
                        int end = (i * EXCEL03_MaxRow) + EXCEL03_MaxRow - 1;
                        DataWriteToSheet(dt, start, end, book, sheetName + i.ToString());
                    }
                    int lastPageItemCount = dt.Rows.Count % EXCEL03_MaxRow;
                    DataWriteToSheet(dt, dt.Rows.Count - lastPageItemCount, lastPageItemCount, book, sheetName + page.ToString());
                }
                MemoryStream ms = new MemoryStream();
                book.Write(ms);

                // return ms.ToArray();

                ms.Seek(0, SeekOrigin.Begin);
                return ms;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 将DataTbale写入excel
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="startRow"></param>
        /// <param name="endRow"></param>
        /// <param name="book"></param>
        /// <param name="sheetName"></param>
        private static void    DataWriteToSheet(DataTable dt, int startRow, int endRow, IWorkbook book, string sheetName)
        {
            try
            {
                ISheet sheet = book.CreateSheet(sheetName);
                IRow header = sheet.CreateRow(0);
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    ICell cell = header.CreateCell(i);
                    string val = dt.Columns[i].Caption ?? dt.Columns[i].ColumnName;
                    cell.SetCellValue(val);
                }
                int rowIndex = 1;
                for (int i = startRow; i <= endRow; i++)
                {
                    DataRow dtRow = dt.Rows[i];
                    IRow excelRow = sheet.CreateRow(rowIndex++);
                    for (int j = 0; j < dtRow.ItemArray.Length; j++)
                    {
                        excelRow.CreateCell(j).SetCellValue(dtRow[j].ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
         

        }

        /// <summary>
        /// Convert a List{T} to a DataTable.
        /// </summary>
        public  static DataTable ToDataTable<T>(List<T> items)
        {
            try
            {
                var tb = new DataTable(typeof(T).Name);

                PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (PropertyInfo prop in props)
                {
                    Type t = GetCoreType(prop.PropertyType);
                    tb.Columns.Add(prop.Name, t);
                }

                foreach (T item in items)
                {
                    var values = new object[props.Length];

                    for (int i = 0; i < props.Length; i++)
                    {
                        values[i] = props[i].GetValue(item, null);
                    }

                    tb.Rows.Add(values);
                }

                return tb;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Determine of specified type is nullable
        /// </summary>
        public static bool IsNullable(Type t)
        {
            try
            {
                return !t.IsValueType || (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Return underlying type if type is Nullable otherwise return the type
        /// </summary>
        public static Type GetCoreType(Type t)
        {
            try
            {
                if (t != null && IsNullable(t))
                {
                    if (!t.IsValueType)
                    {
                        return t;
                    }
                    else
                    {
                        return Nullable.GetUnderlyingType(t);
                    }
                }
                else
                {
                    return t;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 将DataTable转换为List集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static IList<T> ConvertToModel<T>(DataTable dt) where T:new()
        {
            try
            {
                // 定义集合    
                IList<T> ts = new List<T>();

                // 获得此模型的类型   
                Type type = typeof(T);
                string tempName = "";

                foreach (DataRow dr in dt.Rows)
                {
                    T t = new T();
                    // 获得此模型的公共属性      
                    PropertyInfo[] propertys = t.GetType().GetProperties();
                    foreach (PropertyInfo pi in propertys)
                    {
                        tempName = pi.Name;  // 检查DataTable是否包含此列    

                        if (dt.Columns.Contains(tempName))
                        {
                            // 判断此属性是否有Setter      
                            if (!pi.CanWrite) continue;

                            object value = dr[tempName];
                            if (value != DBNull.Value)
                                pi.SetValue(t, value, null);
                        }
                    }
                    ts.Add(t);
                }
                return ts;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Excel导入
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static DataTable ImportExcelFile(string filePath)
        {
            HSSFWorkbook hssfworkbook;
            #region//初始化信息
            try
            {
                using (FileStream file = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    hssfworkbook = new HSSFWorkbook(file);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            #endregion

            using (NPOI.SS.UserModel.ISheet sheet = hssfworkbook.GetSheetAt(0))
            {
                DataTable table = new DataTable();
                IRow headerRow = sheet.GetRow(0);//第一行为标题行
                int cellCount = headerRow.LastCellNum;//LastCellNum = PhysicalNumberOfCells
                int rowCount = sheet.LastRowNum;//LastRowNum = PhysicalNumberOfRows - 1

                //handling header.
                for (int i = headerRow.FirstCellNum; i < cellCount; i++)
                {
                    DataColumn column = new DataColumn(headerRow.GetCell(i).StringCellValue);
                    table.Columns.Add(column);
                }
                for (int i = (sheet.FirstRowNum + 1); i <= rowCount; i++)
                {
                    IRow row = sheet.GetRow(i);
                    DataRow dataRow = table.NewRow();

                    if (row != null)
                    {
                        for (int j = row.FirstCellNum; j < cellCount; j++)
                        {
                            if (row.GetCell(j) != null)
                                dataRow[j] = GetCellValue(row.GetCell(j));
                        }
                    }

                    table.Rows.Add(dataRow);
                }
                return table;
            }

        }

        /// <summary>
        /// 根据Excel列类型获取列的值
        /// </summary>
        /// <param name="cell">Excel列</param>
        /// <returns></returns>
        private static string GetCellValue(ICell cell)
        {
            if (cell == null)
                return string.Empty;
            switch (cell.CellType)
            {
                case CellType.BLANK:
                    return string.Empty;
                case CellType.BOOLEAN:
                    return cell.BooleanCellValue.ToString();
                case CellType.ERROR:
                    return cell.ErrorCellValue.ToString();
                case CellType.NUMERIC:
                case CellType.Unknown:
                default:
                    return cell.ToString();//This is a trick to get the correct value of the cell. NumericCellValue will return a numeric value no matter the cell value is a date or a number
                case CellType.STRING:
                    return cell.StringCellValue;
                case CellType.FORMULA:
                    try
                    {
                        HSSFFormulaEvaluator e = new HSSFFormulaEvaluator(cell.Sheet.Workbook);
                        e.EvaluateInCell(cell);
                        return cell.ToString();
                    }
                    catch
                    {
                        return cell.NumericCellValue.ToString();
                    }
            }
        }
    }
}
