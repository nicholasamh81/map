import { useState } from 'react'
import useStore from '@store/index'
import { Menu, Moon, Sun, Download, Upload, Trash2 } from 'lucide-react'
import { storageService } from '@services/storage'
import Button from '@components/UI/Button'

interface HeaderProps {
  onToggleSidebar: () => void
}

function Header({ onToggleSidebar }: HeaderProps) {
  const isDarkMode = useStore((state) => state.isDarkMode)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)
  const exportData = useStore((state) => state.exportData)
  const importData = useStore((state) => state.importData)
  const clearAll = useStore((state) => state.clearAll)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    try {
      const data = exportData()
      storageService.exportAsJSON(data)
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      storageService.importFromJSON(file).then((data) => {
        if (data) {
          importData(data)
        }
      })
    }
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAll()
      storageService.clearAll()
    }
  }

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold">Workspace App</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Export button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          disabled={isExporting}
          title="Export data as JSON"
        >
          <Download size={18} />
        </Button>

        {/* Import button */}
        <label className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
          <Upload size={20} />
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            title="Import data from JSON"
          />
        </label>

        {/* Clear all button */}
        <button
          onClick={handleClearAll}
          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg transition-colors"
          title="Clear all data"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header
