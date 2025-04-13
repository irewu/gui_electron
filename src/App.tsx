import { useState } from 'react'
import Layout from './components/layout/Layout'
import AssetManagement from './components/assets/AssetManagement'
import FileManagement from './components/files/FileManagement'
import Settings from './components/settings/Settings'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'assets' | 'files' | 'settings'>('assets')

  const renderContent = () => {
    switch (activeTab) {
      case 'assets':
        return <AssetManagement />
      case 'files':
        return <FileManagement />
      case 'settings':
        return <Settings />
      default:
        return <AssetManagement />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  )
}

export default App