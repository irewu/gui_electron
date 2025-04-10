import React, { useState } from 'react';
import { mockFiles } from '../../data/mockData';
import { Search, Upload, Eye, Download, Trash2, Files } from '../ui/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const FileManagement: React.FC = () => {
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [securityFilter, setSecurityFilter] = useState('all');

  const filteredFiles = mockFiles.filter(file => {
    const matchSearch = !fileSearchQuery || 
      file.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      file.assetName.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      file.assetId.toLowerCase().includes(fileSearchQuery.toLowerCase());
    const matchType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
    const matchSecurity = securityFilter === 'all' || file.security === securityFilter;
    return matchSearch && matchType && matchSecurity;
  });

  const handleFileUpload = () => {
    // 触发文件上传的input元素
    document.getElementById('file-upload-input')?.click();
  };

  const processFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 处理文件上传逻辑
      console.log('Files to upload:', Array.from(e.target.files));
      // 实际应用中，这里应该调用上传API
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">文件管理</h2>
          <p className="text-gray-500">管理所有资产相关文件</p>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleFileUpload}
        >
          <Upload className="w-4 h-4 mr-2" />
          上传文件
        </button>
        <input 
          id="file-upload-input"
          type="file" 
          className="hidden"
          multiple
          onChange={processFileUpload}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={fileSearchQuery}
              onChange={(e) => setFileSearchQuery(e.target.value)}
              placeholder="搜索文件名称、资产名称或编号..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="文件类型">{fileTypeFilter === 'all' ? '全部类型' : fileTypeFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="文档">文档</SelectItem>
              <SelectItem value="图片">图片</SelectItem>
              <SelectItem value="视频">视频</SelectItem>
            </SelectContent>
          </Select>

          <Select value={securityFilter} onValueChange={setSecurityFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="安全级别">
                {securityFilter === 'all' ? '全部级别' : 
                 securityFilter === 'public' ? '公开' : 
                 securityFilter === 'confidential' ? '保密' : securityFilter}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部级别</SelectItem>
              <SelectItem value="public">公开</SelectItem>
              <SelectItem value="confidential">保密</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  文件名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所属资产
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  大小
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上传时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  安全级别
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.map(file => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Files className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{file.assetName}</div>
                    <div className="text-sm text-gray-500">{file.assetId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{file.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.uploadTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      file.security === 'confidential' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {file.security === 'confidential' ? '保密' : '公开'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="下载">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredFiles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <Files className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p>没有找到匹配的文件</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileManagement; 