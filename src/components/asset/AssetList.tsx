import React, { useState } from 'react';
import { mockAssets, Asset } from '../../data/mockData';
import { Search, FileText, ChevronRight } from '../ui/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AssetListProps {
  onSelectAsset: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ onSelectAsset }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchSearch = !searchQuery || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'all' || asset.type === filterType;
    const matchStatus = filterStatus === 'all' || asset.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

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

    const rows = mockAssets.map(asset => [
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
        <div className="flex flex-col md:flex-row gap-4">
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
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="全部类型">{filterType === 'all' ? '全部类型' : filterType}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="电子设备">电子设备</SelectItem>
              <SelectItem value="办公设备">办公设备</SelectItem>
              <SelectItem value="网络设备">网络设备</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="全部状态">{filterStatus === 'all' ? '全部状态' : filterStatus}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="使用中">使用中</SelectItem>
              <SelectItem value="闲置">闲置</SelectItem>
              <SelectItem value="维修中">维修中</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => onSelectAsset(asset)}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{asset.name}</h3>
                <p className="text-gray-500">ID: {asset.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full ${
                asset.status === '使用中' ? 'bg-green-100 text-green-800' : 
                asset.status === '闲置' ? 'bg-gray-100 text-gray-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
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
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="mr-2">附件数量: {asset.attachments.length}</span>
              </div>
              <button 
                className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAsset(asset);
                }}
              >
                查看详情
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}

        {filteredAssets.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">没有找到匹配的资产</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList; 