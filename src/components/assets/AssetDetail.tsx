import React, { useState, useRef } from 'react';
import { Asset } from '../../types/asset';
import { 
  X, Edit, Trash, Download, Calendar, MapPin, 
  Tag, DollarSign, AlertTriangle, Upload, Eye, FileText 
} from 'lucide-react';

interface AssetDetailProps {
  asset: Asset | null;
  onBack: () => void;
}

interface AttachmentFile {
  name: string;
  size: string;
  type: string;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onBack }) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [attachments, setAttachments] = useState<AttachmentFile[]>([
    { name: '采购合同.pdf', size: '1.2 MB', type: 'application/pdf' },
    { name: '设备说明书.pdf', size: '2.5 MB', type: 'application/pdf' }
  ]);
  
  // 添加预览文件状态
  const [previewFile, setPreviewFile] = useState<AttachmentFile | null>(null);
  
  // 创建文件上传引用
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!asset) return null;

  // 初始化备注内容
  React.useEffect(() => {
    if (asset.note) {
      setNoteContent(asset.note);
    }
  }, [asset.note]);

  // 处理备注编辑
  const handleEditNote = () => {
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    // 这里应该调用API保存备注内容
    setIsEditingNote(false);
  };
  
  // 触发文件选择对话框
  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type
      }));
      setAttachments(prev => [...prev, ...newFiles]);
      
      // 清空文件输入，使同一文件可以再次上传
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 处理文件拖放上传
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 模拟文件上传，实际应用中应当调用文件上传API
    if (e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type
      }));
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 处理文件删除
  const handleDeleteFile = (index: number) => {
    // 实际应用中应当调用删除文件的API
    if (confirm(`确定要删除文件 "${attachments[index].name}" 吗?`)) {
      setAttachments(prev => prev.filter((_, i) => i !== index));
    }
  };
  
  // 处理文件预览
  const handlePreviewFile = (file: AttachmentFile) => {
    setPreviewFile(file);
    
    // 根据文件类型选择不同的预览方式
    if (file.type.startsWith('image/')) {
      // 图片预览，真实环境中应该有图片URL
      alert(`预览图片: ${file.name}`);
    } else if (file.type === 'application/pdf') {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>预览: ${file.name}</title>
              <style>
                body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
              </style>
            </head>
            <body>
              <div style="text-align: center;">
                <h2>PDF预览: ${file.name}</h2>
                <p>实际应用中，这里会嵌入PDF查看器</p>
              </div>
            </body>
          </html>
        `);
      }
    } else {
      // 其他文件类型
      alert(`文件预览: ${file.name}\n类型: ${file.type}\n大小: ${file.size}`);
    }
  };
  
  // 处理文件下载
  const handleDownloadFile = (file: AttachmentFile) => {
    // 模拟文件下载
    const dummyContent = `这是${file.name}的模拟内容`;
    const blob = new Blob([dummyContent], { type: file.type || 'text/plain' });
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
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">资产详情</h2>
          <button 
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {/* 基本信息区域 */}
        <div className="p-5 bg-gray-50 rounded-lg mx-5 mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">基本信息</h3>
          
          <div className="grid grid-cols-2 gap-5">
            {/* 左侧信息组 */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">资产编号</p>
                <p className="text-base font-medium">{asset.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">存放位置</p>
                <p className="text-base font-medium">{asset.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">购入日期</p>
                <p className="text-base font-medium">{asset.purchaseDate}</p>
              </div>
            </div>
            
            {/* 右侧信息组 */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">资产类型</p>
                <p className="text-base font-medium">{asset.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">使用状态</p>
                <p className="text-base font-medium">
                  <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full 
                    ${asset.status === '使用中' ? 'bg-green-100 text-green-800' : 
                      asset.status === '维修中' ? 'bg-yellow-100 text-yellow-800' : 
                      asset.status === '闲置' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {asset.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">资产价值</p>
                <p className="text-base font-medium">¥ {asset.price.toLocaleString('zh-CN')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 资产备注区域 */}
        <div className="p-5 bg-gray-50 rounded-lg mx-5 mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">资产备注</h3>
            <button 
              onClick={handleEditNote}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors border-0"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {isEditingNote ? (
            <div className="space-y-3">
              <textarea 
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full p-3 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="输入资产备注信息..."
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsEditingNote(false)}
                  className="px-3 py-1.5 mr-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border-0"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 border-0"
                >
                  保存
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{noteContent || "该服务器用于运行核心业务系统，需要定期维护。"}</p>
          )}
        </div>
        
        {/* 附件列表区域 */}
        <div className="p-5 bg-gray-50 rounded-lg mx-5 mt-5 mb-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">附件列表</h3>
          
          {/* 文件上传区域 */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer hover:bg-gray-50"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onClick={handleClickUpload}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileSelect} 
            />
            <div className="flex justify-center mb-2">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500">拖拽文件到此处或点击上传</p>
          </div>
          
          {/* 文件列表 */}
          <div className="space-y-3">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-0 bg-white rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-1.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded border-0"
                    onClick={() => handlePreviewFile(file)}
                    title="预览"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1.5 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded border-0"
                    onClick={() => handleDownloadFile(file)}
                    title="下载"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded border-0"
                    onClick={() => handleDeleteFile(index)}
                    title="删除"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 底部操作栏 */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded mr-2 hover:bg-gray-200 border-0"
          >
            关闭
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 border-0">
            更新资产
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail; 