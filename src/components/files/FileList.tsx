import React, { useState } from 'react';
import { FileItem, FileViewMode } from '../../types/file';
import { 
  File, FileText, Image, Video, MoreVertical, 
  ExternalLink, Download, Edit, Trash, Tag
} from 'lucide-react';
import { formatFileSize, getFileIcon } from '../../utils/fileUtils';

interface FileListProps {
  files: FileItem[];
  viewMode: FileViewMode;
  selectedFiles: string[];
  onSelectFile: (id: string, isMultiSelect: boolean) => void;
  onDoubleClickFile: (file: FileItem) => void;
  onContextMenu: (event: React.MouseEvent, file: FileItem) => void;
  onFileDelete?: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  viewMode,
  selectedFiles,
  onSelectFile,
  onDoubleClickFile,
  onContextMenu,
  onFileDelete
}) => {
  // 预览对话框状态
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  
  // 文件操作处理函数
  const handlePreview = (e: React.MouseEvent, file: FileItem) => {
    e.stopPropagation(); // 阻止事件冒泡，防止触发选择文件
    setPreviewFile(file);
    
    // 根据文件类型选择不同的预览方式
    let previewUrl = '';
    if (file.type === 'image' && file.thumbnail) {
      // 图片预览
      previewUrl = file.thumbnail;
      const img = new window.Image();
      img.src = previewUrl;
      img.onload = () => {
        const win = window.open('', '_blank');
        if (win) {
          win.document.write(`
            <html>
              <head>
                <title>预览: ${file.name}</title>
                <style>
                  body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
                  img { max-width: 90%; max-height: 90%; object-fit: contain; }
                </style>
              </head>
              <body>
                <img src="${previewUrl}" alt="${file.name}" />
              </body>
            </html>
          `);
        }
      };
    } else {
      // 其他文件类型，显示文件信息
      const fileInfo = `
        文件名：${file.name}
        类型：${file.type}
        大小：${formatFileSize(file.size)}
        修改日期：${new Date(file.modified).toLocaleString('zh-CN')}
        路径：${file.path}
      `;
      alert(`文件预览\n${fileInfo}`);
    }
  };

  const handleDownload = (e: React.MouseEvent, file: FileItem) => {
    e.stopPropagation();
    
    // 模拟文件下载
    // 在实际应用中，这里应该使用实际的文件URL
    const dummyContent = `这是${file.name}的模拟内容`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // 创建临时下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    console.log(`下载文件: ${file.name}`);
  };

  const handleDelete = (e: React.MouseEvent, file: FileItem) => {
    e.stopPropagation();
    if (confirm(`确定要删除文件 "${file.name}" 吗?`)) {
      // 调用父组件传入的删除方法
      if (onFileDelete) {
        onFileDelete(file.id);
      }
      
      console.log(`已删除文件: ${file.name}`);
    }
  };

  const handleMoreOptions = (e: React.MouseEvent, file: FileItem) => {
    e.stopPropagation();
    // 触发原来的右键菜单
    onContextMenu(e, file);
  };

  // 预览对话框组件
  const PreviewDialog = () => {
    if (!previewFile) return null;
    
    const FileTypeIcon = getFileIcon(previewFile.type);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-medium">{previewFile.name}</h3>
            <button 
              onClick={() => setPreviewFile(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 flex items-center justify-center">
            {previewFile.type === 'image' && previewFile.thumbnail ? (
              <img 
                src={previewFile.thumbnail} 
                alt={previewFile.name} 
                className="max-w-full max-h-[70vh] object-contain"
              />
            ) : (
              <div className="text-center p-12">
                <FileTypeIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">无法预览此类型文件</p>
                <p className="text-sm text-gray-500 mt-2">
                  文件类型: {previewFile.type}, 大小: {formatFileSize(previewFile.size)}
                </p>
              </div>
            )}
          </div>
          
          <div className="px-6 py-3 bg-gray-50 flex justify-end">
            <button 
              onClick={() => handleDownload({ stopPropagation: () => {} } as React.MouseEvent, previewFile)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              下载文件
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <File className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-lg">没有找到文件</p>
        <p className="text-sm">尝试更改搜索条件或上传新文件</p>
      </div>
    );
  }

  // 列表视图
  if (viewMode === 'list') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]">
                文件名
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                大小
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                修改日期
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                关联资产
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => {
              const isSelected = selectedFiles.includes(file.id);
              const FileIcon = getFileIcon(file.type);
              
              return (
                <tr 
                  key={file.id}
                  className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                  onClick={(e) => onSelectFile(file.id, e.ctrlKey || e.metaKey)}
                  onDoubleClick={() => onDoubleClickFile(file)}
                  onContextMenu={(e) => onContextMenu(e, file)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileIcon className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" />
                      <span className="font-medium text-gray-900">{file.name}</span>
                      {file.tags && file.tags.length > 0 && (
                        <div className="flex ml-3 space-x-1">
                          {file.tags.map(tag => {
                            let tagColor = '';
                            if (tag === 'important') tagColor = 'bg-red-100 text-red-800';
                            else if (tag === 'pending') tagColor = 'bg-yellow-100 text-yellow-800';
                            else if (tag === 'archived') tagColor = 'bg-green-100 text-green-800';
                            
                            return (
                              <span 
                                key={tag} 
                                className={`px-2 py-0.5 text-xs rounded-full ${tagColor}`}
                              >
                                {tag === 'important' ? '重要' : tag === 'pending' ? '待审核' : '已归档'}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(file.modified).toLocaleString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.linkedAssetName ? (
                      <span className="inline-flex items-center">
                        {file.linkedAssetName} ({file.linkedAssetId})
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded border-0"
                        onClick={(e) => handlePreview(e, file)}
                        title="预览"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded border-0"
                        onClick={(e) => handleDownload(e, file)}
                        title="下载"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border-0"
                        onClick={(e) => handleDelete(e, file)}
                        title="删除"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded border-0"
                        onClick={(e) => handleMoreOptions(e, file)}
                        title="更多选项"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // 网格视图
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {files.map((file) => {
        const isSelected = selectedFiles.includes(file.id);
        const FileIcon = getFileIcon(file.type);
        
        return (
          <div
            key={file.id}
            className={`group relative flex flex-col items-center p-4 rounded-lg hover:shadow-md cursor-pointer 
              ${isSelected ? 'bg-blue-50 border-0' : 'bg-white border-0'}`}
            onClick={(e) => onSelectFile(file.id, e.ctrlKey || e.metaKey)}
            onDoubleClick={() => onDoubleClickFile(file)}
            onContextMenu={(e) => onContextMenu(e, file)}
          >
            <div className="mb-2 h-24 w-24 flex items-center justify-center">
              {file.thumbnail ? (
                <img 
                  src={file.thumbnail} 
                  alt={file.name} 
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <FileIcon className="h-16 w-16 text-gray-400" />
              )}
            </div>
            
            <div className="w-full text-center">
              <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatFileSize(file.size)}
              </p>
            </div>
            
            {file.tags && file.tags.length > 0 && (
              <div className="absolute top-2 right-2 flex space-x-1">
                {file.tags.map(tag => {
                  let tagColor = '';
                  if (tag === 'important') tagColor = 'bg-red-500';
                  else if (tag === 'pending') tagColor = 'bg-yellow-500';
                  else if (tag === 'archived') tagColor = 'bg-green-500';
                  
                  return (
                    <div 
                      key={tag} 
                      className={`h-2 w-2 rounded-full ${tagColor}`}
                      title={tag === 'important' ? '重要' : tag === 'pending' ? '待审核' : '已归档'}
                    />
                  );
                })}
              </div>
            )}
            
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1 bg-white bg-opacity-90 rounded p-1 shadow-sm">
              <button 
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded border-0"
                onClick={(e) => handlePreview(e, file)}
                title="预览"
              >
                <ExternalLink className="h-3 w-3" />
              </button>
              <button 
                className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded border-0"
                onClick={(e) => handleDownload(e, file)}
                title="下载"
              >
                <Download className="h-3 w-3" />
              </button>
              <button 
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border-0"
                onClick={(e) => handleDelete(e, file)}
                title="删除"
              >
                <Trash className="h-3 w-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileList; 