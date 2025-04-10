import { useState, useEffect } from 'react'
import './App.css'
import AssetManagementSystem from './components/AssetManagementSystem'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟检查登录状态
    const checkLoginStatus = () => {
      // 在实际应用中，这里应该检查本地存储或发送请求到后端验证登录状态
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      setIsLoading(false)
    }

    // 模拟网络请求延迟
    setTimeout(checkLoginStatus, 500)
  }, [])

  const handleLogin = (username: string, password: string) => {
    // 这里应该发送请求到后端验证用户名和密码
    // 简单模拟登录逻辑
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true')
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App w-full h-screen">
      {isLoggedIn ? (
        <AssetManagementSystem onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App