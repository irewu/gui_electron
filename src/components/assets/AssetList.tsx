import React from 'react';
import { Asset } from '../../types/asset';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onSelectAsset }) => {
  if (assets.length === 0) {
    return (
      <div className="card p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
        <h3 className="text-xl font-medium text-gray-700 mb-1">未找到资产</h3>
        <p className="text-gray-500">没有符合当前筛选条件的资产，请尝试调整筛选条件。</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价值(¥)</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">详情</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr 
                key={asset.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => onSelectAsset(asset)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${asset.status === '使用中' ? 'bg-green-100 text-green-800' : 
                      asset.status === '维修中' ? 'bg-yellow-100 text-yellow-800' : 
                      asset.status === '闲置' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.price.toLocaleString('zh-CN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ChevronRight className="w-5 h-5 text-gray-400 inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList; 