import React, { useState, type FC } from 'react';
import { 
  Search, 
  Upload, 
  Settings, 
  Files,
  Database,
  ChevronRight,
  ChevronLeft,
  Download,
  Trash2,
  Eye,
  Save,
  Edit,
  Link,
  FileText,
  Calendar,
  Tag
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 类型定义
type NavType = 'assets' | 'files' | 'settings';

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadTime: string;
  security: string;
  assetId: string;
  assetName: string;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  purchaseDate: string;
  value: string;
  note: string;
  attachments: Array<{
    id: number;
    name: string;
    type: string;
    security: string;
    uploadTime: string;
    size: string;
  }>;
}

interface FileManagementProps {
  files: FileItem[];
  fileSearchQuery: string;
  setFileSearchQuery: (query: string) => void;
  fileTypeFilter: string;
  setFileTypeFilter: (filter: string) => void;
  securityFilter: string;
  setSecurityFilter: (filter: string) => void;
}

const FileManagement: FC<FileManagementProps> = ({
  files,
  fileSearchQuery,
  setFileSearchQuery,
  fileTypeFilter,
  setFileTypeFilter,
  securityFilter,
  setSecurityFilter
}) => {
  const filteredFiles = files.filter(file => {
    const matchSearch = !fileSearchQuery || 
      file.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      file.assetName.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      file.assetId.toLowerCase().includes(fileSearchQuery.toLowerCase());
    const matchType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
    const matchSecurity = securityFilter === 'all' || file.security === securityFilter;
    return matchSearch && matchType && matchSecurity;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">文件管理</h2>
          <p className="text-gray-500">管理所有资产相关文件</p>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            console.log('Upload file');
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          上传文件
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
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
            <SelectTrigger className="w-32">
              <SelectValue placeholder="文件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="文档">文档</SelectItem>
              <SelectItem value="图片">图片</SelectItem>
              <SelectItem value="视频">视频</SelectItem>
            </SelectContent>
          </Select>

          <Select value={securityFilter} onValueChange={setSecurityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="安全级别" />
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
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AssetManagementSystem: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavType>('assets');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [securityFilter, setSecurityFilter] = useState('all');

  // 模拟数据
  const assets: Asset[] = [
    {
      id: 'A001',
      name: '服务器主机',
      type: '电子设备',
      location: '数据中心A区',
      status: '使用中',
      purchaseDate: '2023-05-15',
      value: '150000.00',
      note: '该服务器用于运行核心业务系统，需要定期维护。',
      attachments: [
        { id: 1, name: '采购合同.pdf', type: '文档', security: 'confidential', uploadTime: '2023-05-15', size: '1.2 MB' },
        { id: 2, name: '设备说明书.pdf', type: '文档', security: 'public', uploadTime: '2023-05-15', size: '2.5 MB' }
      ]
    },
    {
      id: 'A002',
      name: '办公打印机',
      type: '办公设备',
      location: '行政办公室',
      status: '使用中',
      purchaseDate: '2024-01-10',
      value: '12000.00',
      note: '打印机耗材更换记录',
      attachments: [
        { id: 3, name: '保修卡.pdf', type: '文档', security: 'public', uploadTime: '2024-01-10', size: '524 KB' }
      ]
    }
  ];

  const files: FileItem[] = [
    {
      id: 1,
      name: '采购合同.pdf',
      type: '文档',
      size: '1.2 MB',
      uploadTime: '2023-05-15',
      security: 'confidential',
      assetId: 'A001',
      assetName: '服务器主机'
    },
    {
      id: 2,
      name: '设备说明书.pdf',
      type: '文档',
      size: '2.5 MB',
      uploadTime: '2023-05-15',
      security: 'public',
      assetId: 'A001',
      assetName: '服务器主机'
    },
    {
      id: 3,
      name: '保修卡.pdf',
      type: '文档',
      size: '524 KB',
      uploadTime: '2024-01-10',
      security: 'public',
      assetId: 'A002',
      assetName: '办公打印机'
    },
    {
      id: 4,
      name: '设备照片.jpg',
      type: '图片',
      size: '3.1 MB',
      uploadTime: '2024-01-10',
      security: 'public',
      assetId: 'A002',
      assetName: '办公打印机'
    }
  ];

  // 导出 CSV 功能
  const exportToCSV = () => {
    const headers = [
      '资产编号',
      '资产名称',
      '资产类型',
      '存放位置',
      '使用状态',
      '购入日期',
      '资产价值',
      '备注'
    ].join(',');

    const rows = assets.map(asset => [
      asset.id,
      asset.name,
      asset.type,
      asset.location,
      asset.status,
      asset.purchaseDate,
      asset.value,
      asset.note.replace(/,/g, ';')
    ].join(','));

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `资产清单_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 资产列表组件
  const AssetList: FC = () => {
    const filteredAssets = assets.filter(asset => {
      const matchSearch = !searchQuery || 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || asset.type === filterType;
      const matchStatus = filterStatus === 'all' || asset.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">资产列表</h2>
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            导出CSV
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索资产..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="资产类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="电子设备">电子设备</SelectItem>
                <SelectItem value="办公设备">办公设备</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="使用状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="使用中">使用中</SelectItem>
                <SelectItem value="闲置">闲置</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{asset.name}</h3>
                  <p className="text-gray-500">ID: {asset.id}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                  {asset.status}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">类型：</span>
                  {asset.type}
                </div>
                <div>
                  <span className="text-gray-500">位置：</span>
                  {asset.location}
                </div>
                <div>
                  <span className="text-gray-500">购入日期：</span>
                  {asset.purchaseDate}
                </div>
                <div>
                  <span className="text-gray-500">价值：</span>
                  ￥{asset.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 资产详情组件
  const AssetDetail: FC = () => {
    if (!selectedAsset) return null;

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      // 处理文件上传
      const files = Array.from(e.dataTransfer.files);
      console.log('Dropped files:', files);
    };

    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedAsset(null)}
            className="mr-4 text-blue-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">{selectedAsset.name}</h2>
        </div>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">资产编号</p>
                <p className="font-medium">{selectedAsset.id}</p>
              </div>
              <div>
                <p className="text-gray-500">资产类型</p>
                <p className="font-medium">{selectedAsset.type}</p>
              </div>
              <div>
                <p className="text-gray-500">存放位置</p>
                <p className="font-medium">{selectedAsset.location}</p>
              </div>
              <div>
                <p className="text-gray-500">使用状态</p>
                <p className="font-medium">{selectedAsset.status}</p>
              </div>
              <div>
                <p className="text-gray-500">购入日期</p>
                <p className="font-medium">{selectedAsset.purchaseDate}</p>
              </div>
              <div>
                <p className="text-gray-500">资产价值</p>
                <p className="font-medium">￥{selectedAsset.value}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">资产备注</h3>
              <button
                onClick={() => setIsEditingNote(!isEditingNote)}
                className="text-blue-600"
              >
                {isEditingNote ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
              </button>
            </div>
            {isEditingNote ? (
              <textarea
                value={noteContent || selectedAsset.note}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full h-32 p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{selectedAsset.note}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">附件列表</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">
                {isDragging ? '释放以上传文件' : '拖拽文件到此处或点击上传'}
              </p>
            </div>

            <div className="space-y-3">
              {selectedAsset.attachments.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <Files className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold">资产管理系统</h1>
        </div>
        <nav className="mt-4">
          <button
            className={`flex items-center w-full px-4 py-2 ${
              currentNav === 'assets' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => {
              setCurrentNav('assets');
              setSelectedAsset(null);
            }}
          >
            <Database className="w-5 h-5 mr-2" />
            资产管理
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 ${
              currentNav === 'files' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => {
              setCurrentNav('files');
              setSelectedAsset(null);
            }}
          >
            <Files className="w-5 h-5 mr-2" />
            文件管理
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 ${
              currentNav === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => {
              setCurrentNav('settings');
              setSelectedAsset(null);
            }}
          >
            <Settings className="w-5 h-5 mr-2" />
            系统设置
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        {currentNav === 'assets' && (
          selectedAsset ? <AssetDetail /> : <AssetList />
        )}
        {currentNav === 'files' && (
          <FileManagement
            files={files}
            fileSearchQuery={fileSearchQuery}
            setFileSearchQuery={setFileSearchQuery}
            fileTypeFilter={fileTypeFilter}
            setFileTypeFilter={setFileTypeFilter}
            securityFilter={securityFilter}
            setSecurityFilter={setSecurityFilter}
          />
        )}
        {currentNav === 'settings' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold">系统设置</h2>
            <p className="text-gray-500">管理系统配置</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagementSystem;