import React, { ReactNode } from 'react';

// 内联Sidebar组件
interface SidebarProps {
  activeTab: 'assets' | 'files' | 'settings';
  onTabChange: (tab: 'assets' | 'files' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-60 bg-gray-100 h-full flex flex-col">
      {/* 系统标题 */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">资产管理系统</h1>
      </div>
      
      {/* 导航菜单 */}
      <nav className="flex-1 pt-5">
        <button
          onClick={() => onTabChange('assets')}
          className={`w-full px-6 py-3 text-left border-0 ${
            activeTab === 'assets' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          资产管理
        </button>
        <button
          onClick={() => onTabChange('files')}
          className={`w-full px-6 py-3 text-left border-0 ${
            activeTab === 'files' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          文件管理
        </button>
        <button
          onClick={() => onTabChange('settings')}
          className={`w-full px-6 py-3 text-left border-0 ${
            activeTab === 'settings' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          系统设置
        </button>
      </nav>
    </div>
  );
};

// Layout组件
interface LayoutProps {
  children: ReactNode;
  activeTab: 'assets' | 'files' | 'settings';
  onTabChange: (tab: 'assets' | 'files' | 'settings') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 标题栏 */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">资产管理系统 v2.2.0</div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 