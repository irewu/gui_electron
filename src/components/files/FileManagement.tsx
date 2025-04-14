import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Upload, List, Grid, ChevronDown, X, Filter, 
  FolderOpen, File, FileText, Image, Video, FileIcon, Star, Clock, Archive,
  Tag, ExternalLink, Download, Edit, Trash
} from 'lucide-react';
import FileList from './FileList';
import UploadDialog from './UploadDialog';
import { 
  FileItem, FileViewMode, FileSort, FileCategory, FileTag,
  SortField, SortDirection
} from '../../types/file';

// 模拟资产数据
const mockAssets = [
  { id: 'A001', name: '服务器主机' },
  { id: 'A002', name: '办公打印机' },
  { id: 'A003', name: '会议室投影仪' },
  { id: 'A004', name: '办公桌椅套装' }
];

// 模拟文件数据
const mockFiles: FileItem[] = [
  {
    id: 'f001',
    name: '资产清单-2023Q4.xlsx',
    type: 'excel',
    size: 1258291,
    modified: '2023-12-10T15:30:00',
    path: '/documents/资产清单-2023Q4.xlsx',
    tags: ['important'],
    linkedAssetId: 'A001',
    linkedAssetName: '服务器主机'
  },
  {
    id: 'f002',
    name: '服务器说明书.pdf',
    type: 'pdf',
    size: 2621440,
    modified: '2023-05-20T10:15:20',
    path: '/documents/服务器说明书.pdf',
    tags: ['archived'],
    linkedAssetId: 'A001',
    linkedAssetName: '服务器主机'
  },
  {
    id: 'f003',
    name: '服务器照片.jpg',
    type: 'image',
    size: 1548576,
    modified: '2023-05-18T09:30:45',
    path: '/images/服务器照片.jpg',
    tags: [],
    linkedAssetId: 'A001',
    linkedAssetName: '服务器主机',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 'f004',
    name: '采购协议.docx',
    type: 'word',
    size: 845926,
    modified: '2023-01-15T14:22:10',
    path: '/documents/采购协议.docx',
    tags: ['pending'],
    linkedAssetId: 'A002',
    linkedAssetName: '办公打印机'
  },
  {
    id: 'f005',
    name: '打印机使用指南.pdf',
    type: 'pdf',
    size: 1258291,
    modified: '2024-01-12T16:45:30',
    path: '/documents/打印机使用指南.pdf',
    tags: [],
    linkedAssetId: 'A002',
    linkedAssetName: '办公打印机'
  },
  {
    id: 'f006',
    name: '设备验收视频.mp4',
    type: 'video',
    size: 52428800,
    modified: '2024-01-10T11:20:15',
    path: '/videos/设备验收视频.mp4',
    tags: ['important', 'pending'],
    linkedAssetId: 'A002',
    linkedAssetName: '办公打印机'
  },
  {
    id: 'f007',
    name: '会议纪要-设备使用培训.docx',
    type: 'word',
    size: 524288,
    modified: '2024-01-22T09:15:00',
    path: '/documents/会议纪要-设备使用培训.docx',
    tags: [],
  },
  {
    id: 'f008',
    name: '维修记录表.xlsx',
    type: 'excel',
    size: 983040,
    modified: '2023-10-05T13:40:20',
    path: '/documents/维修记录表.xlsx',
    tags: ['archived'],
    linkedAssetId: 'A003',
    linkedAssetName: '会议室投影仪'
  }
];

const FileManagement: React.FC = () => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<FileViewMode>('list');
  const [sort, setSort] = useState<FileSort>({ field: 'modified', direction: 'desc' });
  const [selectedCategory, setSelectedCategory] = useState<FileCategory>('all');
  const [selectedTag, setSelectedTag] = useState<FileTag | ''>('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>(mockFiles);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  // 处理文件筛选和排序
  useEffect(() => {
    let result = [...files];
    
    // 按分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(file => {
        if (selectedCategory === 'documents') {
          return ['word', 'pdf', 'excel', 'text'].includes(file.type);
        } else if (selectedCategory === 'images') {
          return file.type === 'image';
        } else if (selectedCategory === 'videos') {
          return file.type === 'video';
        } else if (selectedCategory === 'others') {
          return !['word', 'pdf', 'excel', 'text', 'image', 'video'].includes(file.type);
        }
        return true;
      });
    }
    
    // 按标签筛选
    if (selectedTag) {
      result = result.filter(file => file.tags.includes(selectedTag));
    }
    
    // 按搜索词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(file => 
        file.name.toLowerCase().includes(query) || 
        (file.linkedAssetName && file.linkedAssetName.toLowerCase().includes(query))
      );
    }
    
    // 排序
    result.sort((a, b) => {
      if (sort.field === 'name') {
        return sort.direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sort.field === 'modified') {
        return sort.direction === 'asc' 
          ? new Date(a.modified).getTime() - new Date(b.modified).getTime()
          : new Date(b.modified).getTime() - new Date(a.modified).getTime();
      } else if (sort.field === 'size') {
        return sort.direction === 'asc' 
          ? a.size - b.size 
          : b.size - a.size;
      } else if (sort.field === 'type') {
        return sort.direction === 'asc' 
          ? a.type.localeCompare(b.type) 
          : b.type.localeCompare(a.type);
      }
      return 0;
    });
    
    setFilteredFiles(result);
  }, [files, searchQuery, selectedCategory, selectedTag, sort]);

  // 监听点击事件关闭右键菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理排序变更
  const handleSortChange = (field: SortField) => {
    if (sort.field === field) {
      setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, direction: 'asc' });
    }
    setIsSortMenuOpen(false);
  };

  // 处理文件选择
  const handleSelectFile = (id: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      // 如果按住Ctrl键，则切换所选文件的选择状态
      setSelectedFiles(prev => 
        prev.includes(id) 
          ? prev.filter(fileId => fileId !== id) 
          : [...prev, id]
      );
    } else {
      // 否则，只选择点击的文件
      setSelectedFiles([id]);
    }
  };

  // 处理文件双击
  const handleDoubleClickFile = (file: FileItem) => {
    // 模拟文件预览
    alert(`预览文件: ${file.name}`);
  };

  // 处理右键菜单
  const handleContextMenu = (event: React.MouseEvent, file: FileItem) => {
    event.preventDefault();
    setActiveFile(file);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setShowContextMenu(true);
  };

  // 处理文件删除
  const handleFileDelete = (fileId: string) => {
    // 从文件列表中删除文件
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setSelectedFiles(prev => prev.filter(id => id !== fileId));
  };

  // 处理右键菜单操作
  const handleContextMenuAction = (action: string) => {
    if (!activeFile) return;
    
    switch(action) {
      case 'preview':
        alert(`预览文件: ${activeFile.name}`);
        break;
      case 'download':
        alert(`下载文件: ${activeFile.name}`);
        break;
      case 'rename':
        const newName = prompt('请输入新文件名:', activeFile.name);
        if (newName && newName !== activeFile.name) {
          // 模拟重命名操作
          setFiles(prev => prev.map(file => 
            file.id === activeFile.id ? { ...file, name: newName } : file
          ));
        }
        break;
      case 'delete':
        if (confirm(`确定要删除文件 "${activeFile.name}" 吗?`)) {
          // 模拟删除操作
          handleFileDelete(activeFile.id);
        }
        break;
      default:
        break;
    }
    
    setShowContextMenu(false);
  };

  // 处理文件上传
  const handleUpload = async (files: File[], linkedAssetIds: string[]) => {
    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 生成随机ID
    const generateId = () => 'f' + Math.floor(Math.random() * 10000).toString().padStart(3, '0');
    
    // 创建新文件记录
    const newFiles: FileItem[] = files.map(file => {
      // 获取文件类型
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType = 'other';
      
      if (['pdf', 'doc', 'docx'].includes(fileExtension)) fileType = fileExtension === 'pdf' ? 'pdf' : 'word';
      else if (['xls', 'xlsx', 'csv'].includes(fileExtension)) fileType = 'excel';
      else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension)) fileType = 'image';
      else if (['mp4', 'avi', 'mov', 'flv', 'mkv'].includes(fileExtension)) fileType = 'video';
      else if (['txt', 'text'].includes(fileExtension)) fileType = 'text';
      
      // 查找关联的资产
      const linkedAsset = linkedAssetIds.length > 0 ? 
        mockAssets.find(asset => asset.id === linkedAssetIds[0]) : 
        undefined;
      
      return {
        id: generateId(),
        name: file.name,
        type: fileType,
        size: file.size,
        modified: new Date().toISOString(),
        path: `/uploads/${file.name}`,
        tags: [],
        linkedAssetId: linkedAsset?.id,
        linkedAssetName: linkedAsset?.name
      };
    });
    
    // 添加到文件列表
    setFiles(prev => [...newFiles, ...prev]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 顶部操作区 */}
      <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-[60%] max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文件..."
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button 
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* 视图切换 */}
            <div className="flex bg-gray-200 rounded-lg">
              <button
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('list')}
                title="列表视图"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600'}`}
                onClick={() => setViewMode('grid')}
                title="网格视图"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
            
            {/* 排序选项 */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition shadow-sm"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <span className="mr-1">排序</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isSortMenuOpen && (
                <div 
                  ref={sortMenuRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    {[
                      { id: 'name', label: '名称' },
                      { id: 'modified', label: '修改日期' },
                      { id: 'size', label: '大小' },
                      { id: 'type', label: '类型' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                          sort.field === option.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => handleSortChange(option.id as SortField)}
                      >
                        <span>{option.label}</span>
                        {sort.field === option.id && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              sort.direction === 'desc' ? 'transform rotate-180' : ''
                            }`} 
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 上传按钮 */}
            <button 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
              onClick={() => setIsUploadDialogOpen(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </button>
          </div>
        </div>
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 overflow-auto">
        {/* 文件列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <FileList 
            files={filteredFiles}
            viewMode={viewMode}
            selectedFiles={selectedFiles}
            onSelectFile={handleSelectFile}
            onDoubleClickFile={handleDoubleClickFile}
            onContextMenu={handleContextMenu}
            onFileDelete={handleFileDelete}
          />
        </div>
        
        {/* 文件统计信息 */}
        <div className="mt-4 text-sm text-gray-500">
          共 {filteredFiles.length} 个文件
          {filteredFiles.length < files.length && 
            ` (筛选自 ${files.length} 个文件)`
          }
        </div>
      </div>
      
      {/* 上传文件对话框 */}
      <UploadDialog 
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleUpload}
        assets={mockAssets}
      />
      
      {/* 右键菜单 */}
      {showContextMenu && activeFile && (
        <div 
          ref={contextMenuRef}
          className="fixed bg-white rounded-md shadow-lg z-50 w-48 py-1"
          style={{ 
            left: `${contextMenuPosition.x}px`, 
            top: `${contextMenuPosition.y}px`,
            maxHeight: '90vh',
            overflow: 'auto'
          }}
        >
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleContextMenuAction('preview')}
          >
            <ExternalLink className="w-4 h-4 mr-3 text-gray-500" />
            预览
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleContextMenuAction('download')}
          >
            <Download className="w-4 h-4 mr-3 text-gray-500" />
            下载
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleContextMenuAction('rename')}
          >
            <Edit className="w-4 h-4 mr-3 text-gray-500" />
            重命名
          </button>
          <div className="my-1 h-px bg-gray-100"></div>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={() => handleContextMenuAction('delete')}
          >
            <Trash className="w-4 h-4 mr-3" />
            删除
          </button>
        </div>
      )}
    </div>
  );
};

export default FileManagement; 