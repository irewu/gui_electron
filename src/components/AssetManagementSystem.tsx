import React, { useState, useEffect } from 'react';
import { Asset } from '../data/mockData';
import { 
  Database, 
  Files,
  Settings as SettingsIcon, 
  ChevronLeft
} from './ui/icons';

// Import subcomponents for the main sections
import AssetListComponent from './asset/AssetList';
import AssetDetailComponent from './asset/AssetDetail';
import FileManagementComponent from './file/FileManagement';
import SettingsComponent from './settings/Settings';
import DashboardComponent from './dashboard/Dashboard';

interface AssetManagementSystemProps {
  onLogout: () => void;
}

// 导航类型定义
type NavType = 'dashboard' | 'assets' | 'files' | 'settings';

const AssetManagementSystem: React.FC<AssetManagementSystemProps> = ({ onLogout }) => {
  const [currentNav, setCurrentNav] = useState<NavType>('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [username, setUsername] = useState('张经理');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次时间
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  // 处理返回到资产列表的操作
  const handleBackToList = () => {
    setSelectedAsset(null);
  };

  // 处理选择资产的操作
  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 状态栏 */}
      <div className="bg-gray-800 text-white p-1 flex items-center justify-between text-xs z-50">
        <div className="flex items-center">
          <span className="px-2">{formatTime(currentTime)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      
      {/* 顶部导航栏 */}
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-800">固定资产管理</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-gray-600 focus:outline-none">
                <img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="用户头像" />
                <span className="ml-2 text-sm font-medium">{username}</span>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <button className="ml-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="ml-4 text-gray-600 hover:text-gray-800" onClick={() => setCurrentNav('settings')}>
              <SettingsIcon size={24} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边导航 */}
        <aside className="w-64 bg-white shadow-md h-full overflow-y-auto">
          <nav className="mt-5 px-2">
            <button
              className={`group flex items-center w-full px-2 py-2 text-base font-medium rounded-md ${
                currentNav === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setCurrentNav('dashboard');
                setSelectedAsset(null);
              }}
            >
              <svg className={`mr-3 w-6 h-6 ${currentNav === 'dashboard' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              仪表板
            </button>
            <button
              className={`group flex items-center w-full px-2 py-2 text-base font-medium rounded-md ${
                currentNav === 'assets' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setCurrentNav('assets');
                setSelectedAsset(null);
              }}
            >
              <Database 
                size={24}
                className={`mr-3 w-6 h-6 ${currentNav === 'assets' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              />
              资产列表
            </button>
            <button
              className={`group flex items-center w-full px-2 py-2 text-base font-medium rounded-md ${
                currentNav === 'files' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setCurrentNav('files');
                setSelectedAsset(null);
              }}
            >
              <Files 
                size={24}
                className={`mr-3 w-6 h-6 ${currentNav === 'files' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              />
              文件管理
            </button>
            <button
              className={`group flex items-center w-full px-2 py-2 text-base font-medium rounded-md ${
                currentNav === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setCurrentNav('settings');
                setSelectedAsset(null);
              }}
            >
              <SettingsIcon 
                size={24}
                className={`mr-3 w-6 h-6 ${currentNav === 'settings' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              />
              系统设置
            </button>
            <hr className="my-4 border-gray-200" />
            <button
              className="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              onClick={onLogout}
            >
              <svg className="mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </nav>
        </aside>
        
        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {currentNav === 'dashboard' && <DashboardComponent />}
          {currentNav === 'assets' && (
            selectedAsset ? 
            <AssetDetailComponent asset={selectedAsset} onBack={handleBackToList} /> : 
            <AssetListComponent onSelectAsset={handleSelectAsset} />
          )}
          {currentNav === 'files' && <FileManagementComponent />}
          {currentNav === 'settings' && <SettingsComponent />}
        </main>
      </div>
    </div>
  );
};

export default AssetManagementSystem; 