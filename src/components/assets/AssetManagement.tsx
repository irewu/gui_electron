import React, { useState } from 'react';
import { Search, Download, Plus, Filter } from 'lucide-react';
import AssetList from './AssetList';
import AssetDetail from './AssetDetail';
import { Asset } from '../../types/asset';

// 模拟数据
const mockAssets: Asset[] = [
  {
    id: 'A001',
    name: '服务器主机',
    type: '电子设备',
    location: '数据中心A区',
    status: '使用中',
    purchaseDate: '2023-05-15',
    price: 150000.00,
    note: '该服务器用于运行核心业务系统，需要定期维护。'
  },
  {
    id: 'A002',
    name: '办公打印机',
    type: '办公设备',
    location: '行政办公室',
    status: '使用中',
    purchaseDate: '2024-01-10',
    price: 12000.00,
    note: '高性能彩色激光打印机，供行政部门使用。'
  },
  {
    id: 'A003',
    name: '会议室投影仪',
    type: '电子设备',
    location: '大会议室',
    status: '维修中',
    purchaseDate: '2022-08-23',
    price: 8500.00,
    note: '图像模块存在问题，已送修，预计两周后恢复。'
  },
  {
    id: 'A004',
    name: '办公桌椅套装',
    type: '家具',
    location: '研发部',
    status: '使用中',
    purchaseDate: '2023-11-05',
    price: 3200.00,
    note: '人体工学设计，配备升降功能。'
  }
];

const AssetManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('全部类型');
  const [statusFilter, setStatusFilter] = useState<string>('全部状态');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // 筛选资产列表
  const filteredAssets = mockAssets.filter(asset => {
    const matchSearch = searchQuery === '' || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchType = typeFilter === '全部类型' || asset.type === typeFilter;
    const matchStatus = statusFilter === '全部状态' || asset.status === statusFilter;
    
    return matchSearch && matchType && matchStatus;
  });

  // 处理资产选择
  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  // 处理返回到列表
  const handleBackToList = () => {
    setSelectedAsset(null);
  };

  // 导出为CSV
  const handleExportCSV = () => {
    // 构建CSV内容
    const headers = ['ID', '名称', '类型', '位置', '状态', '购入日期', '价值', '备注'];
    const csvContent = [
      headers.join(','),
      ...filteredAssets.map(asset => [
        asset.id,
        asset.name,
        asset.type,
        asset.location,
        asset.status,
        asset.purchaseDate,
        asset.price.toFixed(2),
        `"${asset.note.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    // 创建下载链接
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `资产列表_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {selectedAsset ? (
        <AssetDetail asset={selectedAsset} onBack={handleBackToList} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">资产列表</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => alert('添加资产功能将在后续实现')}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加资产
              </button>
              <button
                onClick={handleExportCSV}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                导出CSV
              </button>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div className="card p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* 搜索框 */}
              <div className="relative flex-1 min-w-[250px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索资产ID或名称..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  typeFilter !== '全部类型' || statusFilter !== '全部状态' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {
                    (typeFilter !== '全部类型' && statusFilter !== '全部状态') 
                      ? '2' 
                      : (typeFilter !== '全部类型' || statusFilter !== '全部状态') 
                        ? '1' 
                        : '0'
                  }
                </span>
              </button>
            </div>
            
            {/* 筛选选项 */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">资产类型</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="全部类型">全部类型</option>
                    <option value="电子设备">电子设备</option>
                    <option value="办公设备">办公设备</option>
                    <option value="家具">家具</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">资产状态</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="全部状态">全部状态</option>
                    <option value="使用中">使用中</option>
                    <option value="闲置">闲置</option>
                    <option value="维修中">维修中</option>
                    <option value="已报废">已报废</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 资产列表 */}
          <AssetList assets={filteredAssets} onSelectAsset={handleSelectAsset} />
          
          {/* 资产统计 */}
          <div className="mt-4 text-sm text-gray-500">
            共 {filteredAssets.length} 条资产记录
            {filteredAssets.length < mockAssets.length && 
              ` (筛选自 ${mockAssets.length} 条)`
            }
          </div>
        </>
      )}
    </div>
  );
};

export default AssetManagement; 