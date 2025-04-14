import { File, FileText, Image, Video, FileSpreadsheet, FileCode } from 'lucide-react';

/**
 * 格式化文件大小
 * @param bytes 文件字节大小
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 根据文件类型获取对应的图标组件
 * @param fileType 文件类型
 * @returns 对应的图标组件
 */
export const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'word':
    case 'text':
    case 'txt':
      return FileText;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'image':
      return Image;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'flv':
    case 'mkv':
    case 'video':
      return Video;
    case 'xls':
    case 'xlsx':
    case 'csv':
    case 'excel':
      return FileSpreadsheet;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
    case 'json':
    case 'code':
      return FileCode;
    default:
      return File;
  }
}; 