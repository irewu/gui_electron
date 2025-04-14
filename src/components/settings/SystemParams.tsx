import React, { useState } from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';

interface SystemParamsData {
  systemName: string;
  language: 'zh_CN' | 'en_US';
  assetCodePrefix: string;
  assetCodeDigits: number;
  notifyBeforeDays: number;
  enableEmailNotification: boolean;
  emailServer: string;
  emailPort: number;
  emailUsername: string;
  emailPassword: string;
}

const SystemParams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'notification'>('basic');
  
  const [paramsData, setParamsData] = useState<SystemParamsData>({
    systemName: '资产管理系统',
    language: 'zh_CN',
    assetCodePrefix: 'AST',
    assetCodeDigits: 6,
    notifyBeforeDays: 30,
    enableEmailNotification: false,
    emailServer: '',
    emailPort: 587,
    emailUsername: '',
    emailPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setParamsData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setParamsData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setParamsData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该实现保存配置到后端的逻辑
    alert('系统设置已保存');
  };
  
  const handleTestEmailConnection = () => {
    // 这里应该实现测试邮件服务器连接的逻辑
    alert('邮件服务器连接测试中，请稍候...');
    
    // 模拟测试结果
    setTimeout(() => {
      alert('邮件服务器连接成功！');
    }, 1500);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">系统参数设置</h1>
        <div className="flex items-center text-blue-600">
          <Settings className="w-5 h-5 mr-2" />
          <span>v1.0.0</span>
        </div>
      </div>
      
      {/* 参数类别选项卡 */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-2 font-medium border-b-2 -mb-px ${
              activeTab === 'basic' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            基本设置
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`px-4 py-2 font-medium border-b-2 -mb-px ${
              activeTab === 'notification' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            通知设置
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSave}>
          {/* 基本设置 */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">系统名称</label>
                <input
                  type="text"
                  name="systemName"
                  value={paramsData.systemName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">系统语言</label>
                <select
                  name="language"
                  value={paramsData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="zh_CN">简体中文</option>
                  <option value="en_US">English (US)</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">资产编号前缀</label>
                  <input
                    type="text"
                    name="assetCodePrefix"
                    value={paramsData.assetCodePrefix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                  />
                  <p className="mt-1 text-sm text-gray-500">最多5个字符</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">资产编号位数</label>
                  <input
                    type="number"
                    name="assetCodeDigits"
                    value={paramsData.assetCodeDigits}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={3}
                    max={10}
                  />
                  <p className="mt-1 text-sm text-gray-500">3-10位数字</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md flex items-start mt-6">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">资产编号示例</p>
                  <p>使用当前配置，资产编号格式为：{paramsData.assetCodePrefix}-000001 至 {paramsData.assetCodePrefix}-{Array(paramsData.assetCodeDigits).fill('9').join('')}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 通知设置 */}
          {activeTab === 'notification' && (
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableEmailNotification"
                  name="enableEmailNotification"
                  checked={paramsData.enableEmailNotification}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableEmailNotification" className="ml-2 block text-sm text-gray-700">
                  启用邮件通知
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">提前通知天数</label>
                <input
                  type="number"
                  name="notifyBeforeDays"
                  value={paramsData.notifyBeforeDays}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={1}
                  max={90}
                />
                <p className="mt-1 text-sm text-gray-500">资产即将过期/维保到期前的提醒天数</p>
              </div>
              
              {paramsData.enableEmailNotification && (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <h3 className="text-lg font-medium">邮件服务器配置</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP服务器</label>
                      <input
                        type="text"
                        name="emailServer"
                        value={paramsData.emailServer}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="如：smtp.example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP端口</label>
                      <input
                        type="number"
                        name="emailPort"
                        value={paramsData.emailPort}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="如：587"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">账号</label>
                      <input
                        type="text"
                        name="emailUsername"
                        value={paramsData.emailUsername}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="邮箱账号"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                      <input
                        type="password"
                        name="emailPassword"
                        value={paramsData.emailPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="邮箱密码或授权码"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      onClick={handleTestEmailConnection}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
                      disabled={!paramsData.emailServer || !paramsData.emailUsername || !paramsData.emailPassword}
                    >
                      测试连接
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemParams; 