import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    username: '张经理',
    email: 'manager@example.com',
    notifications: true,
    darkMode: false,
    autoSave: true,
    language: 'zh-CN'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSwitchToggle = (name: string) => {
    setSettings({
      ...settings,
      [name]: !settings[name as keyof typeof settings]
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">系统设置</h2>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">用户设置</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input
                type="text"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">界面设置</h3>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">深色模式</span>
              <button
                onClick={() => handleSwitchToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">通知提醒</span>
              <button
                onClick={() => handleSwitchToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">自动保存</span>
              <button
                onClick={() => handleSwitchToggle('autoSave')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">语言</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">系统信息</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">应用版本</span>
              <span className="font-medium">2.2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">操作系统</span>
              <span className="font-medium">Windows</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">最后更新时间</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 mr-2">
            取消
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 