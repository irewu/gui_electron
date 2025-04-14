import React, { useState } from 'react';
import { User, Lock, Camera, Save } from 'lucide-react';

interface ProfileFormData {
  username: string;
  realName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  avatar: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileSettings: React.FC = () => {
  // 默认头像
  const defaultAvatar = 'https://via.placeholder.com/150';
  
  // 个人信息表单状态
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    username: 'admin',
    realName: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    department: '信息技术部',
    position: '系统管理员',
    avatar: defaultAvatar
  });
  
  // 密码表单状态
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // 表单错误信息
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 消息提示
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // 处理个人信息表单变更
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // 处理密码表单变更
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // 验证个人信息表单
  const validateProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!profileForm.username.trim()) {
      newErrors.username = '用户名不能为空';
    }
    
    if (!profileForm.realName.trim()) {
      newErrors.realName = '真实姓名不能为空';
    }
    
    if (!profileForm.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^\S+@\S+\.\S+$/.test(profileForm.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    if (profileForm.phone && !/^1[3-9]\d{9}$/.test(profileForm.phone)) {
      newErrors.phone = '手机号格式不正确';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 验证密码表单
  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = '当前密码不能为空';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = '新密码不能为空';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = '新密码长度不能少于6位';
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = '确认密码不能为空';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 提交个人信息表单
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateProfileForm()) {
      // 这里应该有保存到服务器的逻辑
      console.log('保存个人信息:', profileForm);
      
      // 显示成功消息
      setMessage({
        type: 'success',
        text: '个人信息保存成功！'
      });
      
      // 3秒后清除消息
      setTimeout(() => setMessage(null), 3000);
    }
  };
  
  // 提交密码表单
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      // 这里应该有修改密码的逻辑
      console.log('修改密码:', passwordForm);
      
      // 显示成功消息
      setMessage({
        type: 'success',
        text: '密码修改成功！'
      });
      
      // 清空密码表单
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // 3秒后清除消息
      setTimeout(() => setMessage(null), 3000);
    }
  };
  
  // 头像上传处理
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 创建一个临时的URL
      const imageUrl = URL.createObjectURL(file);
      setProfileForm(prev => ({
        ...prev,
        avatar: imageUrl
      }));
    }
  };
  
  return (
    <div className="space-y-8">
      {/* 消息提示 */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      {/* 个人信息表单 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">个人信息</h2>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* 头像上传 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={profileForm.avatar} 
                alt="用户头像"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" 
              />
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full cursor-pointer">
                <Camera className="w-4 h-4" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input 
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                  errors.username ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">真实姓名</label>
              <input 
                type="text"
                name="realName"
                value={profileForm.realName}
                onChange={handleProfileChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                  errors.realName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.realName && <p className="mt-1 text-sm text-red-600">{errors.realName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input 
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                  errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
              <input 
                type="text"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                  errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">部门</label>
              <input 
                type="text"
                name="department"
                value={profileForm.department}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
              <input 
                type="text"
                name="position"
                value={profileForm.position}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="w-4 h-4 mr-2" />
              保存信息
            </button>
          </div>
        </form>
      </div>
      
      {/* 密码修改表单 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">修改密码</h2>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
            <input 
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.currentPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
            <input 
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.newPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
            <input 
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="w-4 h-4 mr-2" />
              保存密码
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings; 