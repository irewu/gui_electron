import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">欢迎回来，张经理</h2>
        <p className="text-gray-600">今天是{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}，以下是您的资产管理概览</p>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总资产数量</p>
              <p className="text-2xl font-bold text-gray-800">1,245</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg> 12% 较上月
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月新增</p>
              <p className="text-2xl font-bold text-gray-800">78</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg> 23% 较上月
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待审批</p>
              <p className="text-2xl font-bold text-gray-800">32</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-600 text-sm font-medium">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg> 5% 较上月
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">文件附件</p>
              <p className="text-2xl font-bold text-gray-800">3,721</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg> 8% 较上月
            </span>
          </div>
        </div>
      </div>
      
      {/* 图表和快捷操作区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 图表区域 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-800">资产状态分析</h3>
          </div>
          <div className="p-4">
            <div className="h-72 relative">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                <p className="text-blue-700 font-medium">资产状态分布图</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 快捷操作区 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-800">快速操作</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-gray-700">新增资产</span>
              </a>
              
              <a href="#" className="flex items-center p-3 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <span className="text-gray-700">上传附件</span>
              </a>
              
              <a href="#" className="flex items-center p-3 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <span className="text-gray-700">导出资产清单</span>
              </a>
              
              <a href="#" className="flex items-center p-3 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-yellow-100 mr-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">高级搜索</span>
              </a>
              
              <a href="#" className="flex items-center p-3 rounded-lg border hover:shadow-sm hover:bg-blue-50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-gray-700">生成报表</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 最近活动 */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-gray-800">最近活动</h3>
        </div>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">新增了资产「办公笔记本电脑 - XPS 15」</div>
                  <div className="text-sm text-gray-500">由王工程师添加 · 今天 10:30</div>
                </div>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">上传了文件「服务器维护手册.pdf」</div>
                  <div className="text-sm text-gray-500">由李技术员上传 · 昨天 16:45</div>
                </div>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">更新了资产「会议室投影仪」状态为「维修中」</div>
                  <div className="text-sm text-gray-500">由赵主管更新 · 昨天 14:20</div>
                </div>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">删除了资产「老旧打印机」</div>
                  <div className="text-sm text-gray-500">由张经理操作 · 前天 09:15</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="border-t p-3 text-center">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">查看全部活动</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 