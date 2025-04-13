import React, { ReactNode } from 'react';
import { Clipboard, FileText, Settings, Minimize2, X, Square } from 'lucide-react';

// 内联Sidebar组件
interface SidebarProps {
  activeTab: 'assets' | 'files' | 'settings';
  onTabChange: (tab: 'assets' | 'files' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-60 bg-white h-full flex flex-col shadow-md">
      {/* 系统标题 */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">资产管理系统</h1>
      </div>
      
      {/* 导航菜单 */}
      <nav className="flex-1 pt-5">
        <ul>
          <li>
            <button
              onClick={() => onTabChange('assets')}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === 'assets' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clipboard className="w-5 h-5 mr-3" />
              <span>资产管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('files')}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === 'files' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>文件管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('settings')}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === 'settings' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>系统设置</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// 窗口操作按钮组件
const WindowControls: React.FC = () => {
  // Electron应用窗口操作
  const handleMinimize = () => {
    if (window.electron) {
      window.electron.minimizeWindow();
    } else {
      console.log('最小化窗口');
    }
  };

  const handleMaximize = () => {
    if (window.electron) {
      window.electron.maximizeWindow();
    } else {
      console.log('最大化窗口');
    }
  };

  const handleClose = () => {
    if (window.electron) {
      window.electron.closeWindow();
    } else {
      console.log('关闭窗口');
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleMinimize}
        className="p-2 text-gray-500 hover:bg-gray-200 rounded-md"
        title="最小化"
      >
        <Minimize2 size={16} />
      </button>
      <button
        onClick={handleMaximize}
        className="p-2 text-gray-500 hover:bg-gray-200 rounded-md"
        title="最大化"
      >
        <Square size={16} />
      </button>
      <button
        onClick={handleClose}
        className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-md"
        title="关闭"
      >
        <X size={16} />
      </button>
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
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow-sm">
        <div className="text-sm text-gray-500">资产管理系统 v2.2.0</div>
        <WindowControls />
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