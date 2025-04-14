import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit, Trash2, Check, X, Mail, UserCog, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin?: string;
  avatar?: string;
}

interface UserFormData {
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  password: string;
  confirmPassword: string;
}

const UserManagement: React.FC = () => {
  // 模拟用户数据
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: '管理员',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2023-05-15 14:30',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: '张经理',
      email: 'zhang@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2023-05-14 09:15',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: '3',
      name: '李四',
      email: 'li@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2023-05-10 11:45',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: '4',
      name: '王五',
      email: 'wang@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2023-04-25 16:20',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // 搜索用户
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 添加新用户
  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      password: '',
      confirmPassword: ''
    });
    setIsEditing(false);
    setShowUserForm(true);
  };
  
  // 编辑用户
  const handleEditUser = (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      confirmPassword: ''
    });
    setIsEditing(true);
    setShowUserForm(true);
  };
  
  // 保存用户
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.name || !formData.email) {
      alert('请填写必填字段');
      return;
    }
    
    if (!isEditing && (!formData.password || formData.password.length < 6)) {
      alert('密码长度至少为6位');
      return;
    }
    
    if (!isEditing && formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    
    if (isEditing) {
      // 更新现有用户
      setUsers(users.map(user => 
        user.id === formData.id 
          ? { 
              ...user, 
              name: formData.name, 
              email: formData.email, 
              role: formData.role 
            } 
          : user
      ));
    } else {
      // 添加新用户
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'active',
        lastLogin: '-'
      };
      setUsers([...users, newUser]);
    }
    
    setShowUserForm(false);
  };
  
  // 删除用户
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
  };
  
  // 切换用户状态
  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">用户管理</h1>
        <button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition shadow-sm"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          添加用户
        </button>
      </div>
      
      {/* 搜索栏 */}
      <div className="mb-6 flex">
        <div className="relative w-[80%]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索用户名或邮箱..."
            className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* 用户列表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                权限
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最近登录
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={user.avatar} 
                            alt={user.name} 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.role === 'admin' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          <Shield className="w-3 h-3 mr-1" /> 管理员
                        </span>
                      )}
                      {user.role === 'manager' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          <UserCog className="w-3 h-3 mr-1" /> 经理
                        </span>
                      )}
                      {user.role === 'user' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          普通用户
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full ${
                        user.status === 'active'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status === 'active' ? '已启用' : '已禁用'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {showDeleteConfirm === user.id ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  未找到匹配的用户
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 用户表单对话框 */}
      {showUserForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 md:mx-auto">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? '编辑用户' : '添加用户'}
              </h3>
            </div>
            
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  角色 <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="admin">管理员</option>
                  <option value="manager">经理</option>
                  <option value="user">普通用户</option>
                </select>
              </div>
              
              {!isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      密码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      required={!isEditing}
                      minLength={6}
                    />
                    <p className="mt-1 text-xs text-gray-500">密码长度至少6位</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      确认密码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      required={!isEditing}
                    />
                  </div>
                </>
              )}
              
              {isEditing && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                  <p className="font-medium">注意：</p>
                  <p>留空密码字段表示不修改当前密码</p>
                </div>
              )}
              
              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUserForm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition shadow-sm"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition shadow-sm"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 