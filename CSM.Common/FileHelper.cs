using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CSM.Common
{
    public class FileHelper
    {
        /// <summary>
        /// 保存文件
        /// </summary>
        /// <param name="fileFullName"></param>
        /// <param name="fileBytes"></param>
        public static void Save(string fileFullName, byte[] fileBytes)
        {
            try
            {
                string dir = Path.GetDirectoryName(fileFullName);
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }
                using (FileStream fs = new FileStream(fileFullName, FileMode.OpenOrCreate))
                {
                    fs.Write(fileBytes, 0, fileBytes.Length);
                }
            }
            catch
            { }
        }
        /// <summary>
        /// 安全删除文件
        /// </summary>
        /// <param name="fileFullName"></param>
        /// <param name="RootPath"></param>
        public static void DeleteFile(string fileFullName, string RootPath)
        {
            try
            {
                if (File.Exists(fileFullName))
                    File.Delete(fileFullName);
            }
            catch
            {
            }
        }
        /// <summary>
        /// 删除目录
        /// </summary>
        /// <param name="DirName"></param>
        public static void DeleteDirectory(string DirName)
        {
            try
            {
                if (Directory.Exists(DirName))
                    DeleteDir(DirName);
            }
            catch { }
        }
        /// <summary>
        /// 递归删除目录及文件
        /// </summary>
        /// <param name="FileName"></param>
        public static void DeleteDir(string FileName)
        {
            if (Directory.Exists(FileName))
            {
                string[] saFileName = Directory.GetFiles(FileName);
                foreach (string item in saFileName)
                {
                    File.Delete(item);
                }
                string[] saDirectory = Directory.GetDirectories(FileName);
                foreach (string sDirectory in saDirectory)
                {
                    DeleteDir(sDirectory);
                }
                Directory.Delete(FileName);
            }
        }
        
        /// <summary>
        /// 检查文件是否存在，不存在则创建
        /// </summary>
        /// <param name="filePath">绝对路径</param>
        public static void CheckDirectory(string filePath)
        {
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
        }
        /// <summary>
        /// 文件下载
        /// </summary>
        /// <param name="oldPath"></param>
        /// <param name="newPath"></param>
        public static void DownLoadFile(string oldPath, string newPath)
        {
            if (!IsHttpOrHttps(oldPath))
            {
                File.Copy(oldPath, newPath, true);
            }
            else
            {
                WebClient wc = new WebClient();
                oldPath = oldPath.Replace(@"\\", "/").Replace(@"\", "/");
                wc.DownloadFile(oldPath, Path.GetFullPath(newPath));
            }
        }
        /// <summary>
        /// 是否为HTTP或HTTPS
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool IsHttpOrHttps(string path)
        {
            return path.StartsWith("http://", false, null) || path.StartsWith("https://", false, null);
        }

        public static void CreatePage(string html, string pagePath, string pageName, bool isWeb)
        {
            StringBuilder sbHtml = new StringBuilder();
            if (isWeb)
            {
                sbHtml.Append("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
                sbHtml.Append("<head>");
                sbHtml.Append("</head>");
                sbHtml.Append("<body>");
                sbHtml.Append(html);
                sbHtml.Append("</body>");
                sbHtml.Append("</html>");
            }
            else
            {
                sbHtml.Append(html);
            }
            File.WriteAllText(pagePath + "/" + pageName + ".html", sbHtml.ToString(), Encoding.UTF8);
        }

        public static string FilterHtml(string localPath, string htmlPath, string html, string webURL, bool isWebPorject)
        {
            string pattern = @"(<link.*?href=[""|'])(.*?)([""|'].*?>)";
            Regex r = new Regex(pattern, RegexOptions.IgnoreCase);
            MatchCollection mc = r.Matches(html);
            foreach (Match m in mc)
            {
                string path = m.Groups[2].Value;
                string fileExtension = Path.GetExtension(path);
                string guid = Guid.NewGuid().ToString();
                string fileName = guid + "." + fileExtension;
                string newPath = Regex.Replace(m.Groups[0].Value, pattern, "$1 " + htmlPath + "/" + fileName + "$3", RegexOptions.IgnoreCase);
                html = html.Replace(m.Groups[0].Value, newPath);
                path = FileHelper.IsHttpOrHttps(path) ? path : webURL + path;
                FileHelper.DownLoadFile(path, localPath + "/" + fileName);
            }
            pattern = @"(<img.*?src=[""|'])(.*?)([""|'].*?>)";
            r = new Regex(pattern, RegexOptions.IgnoreCase);
            mc = r.Matches(html);
            foreach (Match m in mc)
            {
                string path = m.Groups[2].Value;
                string fileExtension = Path.GetExtension(path);
                if (!imgExtension.Contains(fileExtension))
                {
                    fileExtension = ".jpg";
                }
                string guid = Guid.NewGuid().ToString();
                string fileName = guid + fileExtension;
                string newPath = Regex.Replace(m.Groups[0].Value, pattern, "$1 " + htmlPath + "/" + fileName + "$3", RegexOptions.IgnoreCase);
                html = html.Replace(m.Groups[0].Value, newPath);
                path = FileHelper.IsHttpOrHttps(path) ? path : webURL + path;
                FileHelper.DownLoadFile(path, localPath + "/" + fileName);
            }
            if (!isWebPorject)
            {
                pattern = @"(<a.*?href=[""|'])" + webURL + @"(.*?)([""|'].*?>)";
                r = new Regex(pattern, RegexOptions.IgnoreCase);
                mc = r.Matches(html);
                foreach (Match m in mc)
                {
                    string path = m.Groups[2].Value;
                    string newPath = Regex.Replace(m.Groups[0].Value, pattern, "$1 " + path + "$3", RegexOptions.IgnoreCase);
                    html = html.Replace(m.Groups[0].Value, newPath);
                }
            }
            return html;
        }

        public static string[] imgExtension = { ".jpeg", ".jpg", ".png", ".bmp", ".gif", ".emf" };

        public static string CreateFileName(string sourceFilePath)
        {
            int fileIndex = 0;
            string filePath = sourceFilePath;
            string ext = filePath.Substring(filePath.LastIndexOf('.'));
            while (File.Exists(filePath))
            {
                filePath = filePath.Substring(0, filePath.LastIndexOf('.')) + "副本" + (++fileIndex) + ext;
            }
            return filePath;
        }

        /// <summary>
        /// 安全删除文件
        /// </summary>
        /// <param name="fileFullName"></param>
        /// <param name="RootPath"></param>
        public static bool DeleteFile(string fileFullName)
        {
            bool res = false;
            try
            {
                if (File.Exists(fileFullName))
                {
                    File.Delete(fileFullName);
                    res = true;
                }
            }
            catch
            {
            }
            return res;
        }
        /// <summary>
        /// 获取文件夹下的所有文件
        /// </summary>
        /// <param name="path">文件夹路径</param>
        /// <param name="returnFilePath">返回的文件路径带文件名</param>
        /// <returns></returns>
        public static List<FileOperationCustom> GetFolderFileName(string path,string returnFilePath)
        {
            try
            {
                List<FileOperationCustom> fileList = new List<FileOperationCustom>();
                DirectoryInfo folder = new DirectoryInfo(path);
                FileOperationCustom fileModel;
                foreach (FileInfo file in folder.GetFiles("*"))
                {
                    fileModel = new FileOperationCustom();
                    string filename = file.Name;
                    fileModel.fileName = filename;
                    fileModel.filePath = returnFilePath + filename;
                    fileList.Add(fileModel);
                }
                return fileList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
