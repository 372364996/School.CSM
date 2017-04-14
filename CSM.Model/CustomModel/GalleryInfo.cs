using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class GalleryInfo
    {
        /// <summary>
        /// 监视器ID
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 监视器编码
        /// </summary>
        public string  galleryCode { get; set; }
        /// <summary>
        /// 监视器名称
        /// </summary>
        public string  galleryName { get; set; }
        /// <summary>
        /// 监视器状态
        /// </summary>
        public int galleryStatus { get; set; }
    }
}
