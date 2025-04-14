import React, { useState } from 'react';
import { UserCircle, Camera, Save, Lock } from 'lucide-react';

interface ProfileFormData {
  username: string;
  email: string;
  fullName: string;
  phone: string;
  department: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfile: React.FC = () => {
  // 个人资料表单数据
  const [profileData, setProfileData] = useState<ProfileFormData>({
    username: 'admin',
    email: 'admin@example.com',
    fullName: '系统管理员',
    phone: '13800138000',
    department: '信息技术部'
  });

  // 密码修改表单数据
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 当前活动tab
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  
  // 个人资料表单变化处理
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  // 密码表单变化处理
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  // 保存个人资料
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该实现保存到后端的逻辑
    alert('个人资料已保存');
  };
  
  // 修改密码
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的表单验证
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('两次输入的新密码不一致');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('新密码长度不能少于6位');
      return;
    }
    
    // 这里应该实现修改密码的逻辑
    alert('密码修改成功');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">个人信息设置</h1>
      
      {/* 头像和选项卡 */}
      <div className="flex flex-col md:flex-row items-start mb-8">
        <div className="mb-6 md:mb-0 md:mr-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              <UserCircle className="w-24 h-24 text-gray-400" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium rounded-md ${
              activeTab === 'profile' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            个人资料
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 font-medium rounded-md ${
              activeTab === 'password' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            修改密码
          </button>
        </div>
      </div>
      
      {/* 个人资料表单 */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">部门</label>
              <input
                type="text"
                name="department"
                value={profileData.department}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="w-4 h-4 mr-2" />
              保存修改
            </button>
          </div>
        </form>
      )}
      
      {/* 修改密码表单 */}
      {activeTab === 'password' && (
        <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">密码长度至少6位</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Lock className="w-4 h-4 mr-2" />
              修改密码
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile; 