import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, Trash, Plus, Search } from 'lucide-react';
import { formatFileSize } from '../../utils/fileUtils';

interface Asset {
  id: string;
  name: string;
}

interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], linkedAssets: string[]) => Promise<void>;
  assets: Asset[];
}

const UploadDialog: React.FC<UploadDialogProps> = ({ 
  isOpen, 
  onClose, 
  onUpload,
  assets 
}) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [linkedAssets, setLinkedAssets] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [searchAsset, setSearchAsset] = useState('');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const assetSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assetSearchRef.current && !assetSearchRef.current.contains(event.target as Node)) {
        setShowAssetDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 点击"选择文件"按钮时触发
  const handleSelectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 文件选择或拖拽后处理
  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  // 处理文件输入变化
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelected(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 重置文件输入，允许重复选择相同文件
    }
  };

  // 处理拖放
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('border-blue-500', 'bg-blue-50');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-blue-500', 'bg-blue-50');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-blue-500', 'bg-blue-50');
    }
    handleFilesSelected(e.dataTransfer.files);
  };

  // 移除已选文件
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 添加关联资产
  const handleAddAsset = (asset: Asset) => {
    if (!linkedAssets.find(a => a.id === asset.id)) {
      setLinkedAssets(prev => [...prev, asset]);
    }
    setSearchAsset('');
    setShowAssetDropdown(false);
  };

  // 移除关联资产
  const handleRemoveAsset = (assetId: string) => {
    setLinkedAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  // 搜索过滤资产
  const filteredAssets = assets.filter(asset => 
    asset.id.toLowerCase().includes(searchAsset.toLowerCase()) || 
    asset.name.toLowerCase().includes(searchAsset.toLowerCase())
  );

  // 处理上传
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    try {
      setUploading(true);
      
      // 准备上传的文件和资产ID
      const files = selectedFiles.map(item => item.file);
      const assetIds = linkedAssets.map(asset => asset.id);
      
      // 这里调用父组件传入的上传函数
      await onUpload(files, assetIds);
      
      // 上传成功后关闭对话框
      onClose();
    } catch (error) {
      console.error('上传失败', error);
      // 实际应用中可以在此处理上传错误
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* 标题栏 */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">上传文件</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={uploading}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {/* 文件选择/拖放区域 */}
        <div className="p-6">
          <div 
            ref={dropAreaRef}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center transition-colors"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              className="hidden"
            />
            <div className="flex justify-center mb-4">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">将文件拖放到此处，或</p>
            <button
              onClick={handleSelectFiles}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={uploading}
            >
              选择文件
            </button>
          </div>
          
          {/* 已选文件列表 */}
          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">已选文件 ({selectedFiles.length})</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-48 overflow-y-auto">
                  {selectedFiles.map((item, index) => (
                    <div 
                      key={`${item.file.name}-${index}`}
                      className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-xs">{item.file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(item.file.size)}</p>
                        </div>
                      </div>
                      {item.status === 'uploading' ? (
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                          disabled={uploading}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 资产关联区域 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">关联资产</h3>
            <div className="relative" ref={assetSearchRef}>
              <div className="flex items-center mb-2 border rounded-lg p-2">
                {/* 已选资产标签显示 */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {linkedAssets.map(asset => (
                    <span 
                      key={asset.id}
                      className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {asset.name} ({asset.id})
                      <button 
                        onClick={() => handleRemoveAsset(asset.id)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={searchAsset}
                    onChange={(e) => {
                      setSearchAsset(e.target.value);
                      setShowAssetDropdown(true);
                    }}
                    onFocus={() => setShowAssetDropdown(true)}
                    placeholder={linkedAssets.length ? "" : "搜索并选择资产..."}
                    className="flex-1 min-w-[120px] border-none focus:ring-0 p-0 text-sm"
                  />
                </div>
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              
              {/* 资产下拉列表 */}
              {showAssetDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map(asset => (
                      <div
                        key={asset.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                        onClick={() => handleAddAsset(asset)}
                      >
                        <span>{asset.name} ({asset.id})</span>
                        <Plus className="h-4 w-4 text-gray-500" />
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500 text-center">未找到匹配的资产</div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">将文件关联到特定资产（可选）</p>
          </div>
        </div>
        
        {/* 底部按钮区 */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded mr-2 hover:bg-gray-200"
            disabled={uploading}
          >
            取消
          </button>
          <button 
            onClick={handleUpload}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center ${
              uploading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                上传中...
              </>
            ) : (
              '确认上传'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDialog; 