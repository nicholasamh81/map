import { useState } from 'react'
import useStore from '@store/index'
import Sidebar from './Sidebar'
import Workspace from './Workspace'
import PropertiesPanel from './PropertiesPanel'
import Header from './Header'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {sidebarOpen && (
          <div className="w-72 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-y-auto">
            <Sidebar />
          </div>
        )}

        {/* Workspace */}
        <div className="flex-1 overflow-hidden relative">
          <Workspace />
        </div>

        {/* Right Properties Panel */}
        {propertiesPanelOpen && (
          <div className="w-80 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-y-auto">
            <PropertiesPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
