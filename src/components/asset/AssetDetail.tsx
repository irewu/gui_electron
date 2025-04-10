import React, { useState } from 'react';
import { Asset } from '../../data/mockData';
import { ChevronLeft, Upload, Eye, Download, Trash2, Edit, Save, Files } from '../ui/icons';

interface AssetDetailProps {
  asset: Asset;
  onBack: () => void;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState(asset.note || '');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // 处理文件上传
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
    // 在实际开发中，这里应该调用上传文件的API
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const saveNote = () => {
    // 实际开发中，这里应该调用保存备注的API
    console.log('Saving note:', noteContent);
    // asset.note = noteContent;
    setIsEditingNote(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-blue-600"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">{asset.name}</h2>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">基本信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">资产编号</p>
              <p className="font-medium">{asset.id}</p>
            </div>
            <div>
              <p className="text-gray-500">资产类型</p>
              <p className="font-medium">{asset.type}</p>
            </div>
            <div>
              <p className="text-gray-500">存放位置</p>
              <p className="font-medium">{asset.location}</p>
            </div>
            <div>
              <p className="text-gray-500">使用状态</p>
              <p className="font-medium">{asset.status}</p>
            </div>
            <div>
              <p className="text-gray-500">购入日期</p>
              <p className="font-medium">{asset.purchaseDate}</p>
            </div>
            <div>
              <p className="text-gray-500">资产价值</p>
              <p className="font-medium">￥{asset.value}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">资产备注</h3>
            <button
              onClick={() => isEditingNote ? saveNote() : setIsEditingNote(true)}
              className="text-blue-600"
            >
              {isEditingNote ? <Save size={20} /> : <Edit size={20} />}
            </button>
          </div>
          {isEditingNote ? (
            <textarea
              value={noteContent}
              onChange={handleNoteChange}
              className="w-full h-32 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入资产备注信息..."
            />
          ) : (
            <p className="text-gray-700">{noteContent || '暂无备注'}</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">附件列表</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">
              {isDragging ? '释放以上传文件' : '拖拽文件到此处或点击上传'}
            </p>
            <button 
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              onClick={() => {
                // 触发隐藏的文件上传input
                document.getElementById('file-upload')?.click();
              }}
            >
              选择文件
            </button>
            <input 
              id="file-upload"
              type="file" 
              className="hidden" 
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  // 处理文件上传
                  console.log('Selected files:', Array.from(e.target.files));
                  // 在实际开发中，这里应该调用上传文件的API
                }
              }}
            />
          </div>

          <div className="space-y-3">
            {asset.attachments.map((file: any) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
                <div className="flex items-center">
                  <Files className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size} - {file.uploadTime}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:text-blue-600" title="查看">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-1 hover:text-blue-600" title="下载">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-1 hover:text-red-600" title="删除">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {asset.attachments.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                暂无附件，请上传
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail; 