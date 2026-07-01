import { useState, useRef, useEffect } from 'react'
import useStore from '@store/index'
import type { Wallet } from '@types/index'
import { ChevronDown, X, Minus, Square } from 'lucide-react'
import Button from '@components/UI/Button'
import WalletCardsList from './WalletCardsList'

interface WalletWindowProps {
  wallet: Wallet
}

function WalletWindow({ wallet }: WalletWindowProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const updateWallet = useStore((state) => state.updateWallet)
  const deleteWallet = useStore((state) => state.deleteWallet)
  const selectWallet = useStore((state) => state.selectWallet)
  const selectedWalletId = useStore((state) => state.selectedWalletId)

  const isSelected = selectedWalletId === wallet.id

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - wallet.position.x,
      y: e.clientY - wallet.position.y,
    })
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      updateWallet(wallet.id, {
        position: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        },
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, wallet.id, updateWallet])

  // Handle resizing
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect()
        const newWidth = Math.max(300, e.clientX - rect.left)
        const newHeight = Math.max(200, e.clientY - rect.top)

        updateWallet(wallet.id, {
          size: { width: newWidth, height: newHeight },
        })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, wallet.id, updateWallet])

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg shadow-lg border-2 transition-all ${
        isSelected
          ? `border-blue-500 bg-white dark:bg-slate-800`
          : `border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800`
      }`}
      style={{
        left: `${wallet.position.x}px`,
        top: `${wallet.position.y}px`,
        width: `${wallet.size.width}px`,
        height: `${wallet.size.height}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={(e) => {
        selectWallet(wallet.id)
        e.stopPropagation()
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 rounded-t-lg cursor-grab active:cursor-grabbing select-none"
        style={{ backgroundColor: wallet.color }}
        onMouseDown={handleMouseDown}
        data-no-drag="false"
      >
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{wallet.name}</span>
        </div>
        <div className="flex items-center gap-1" data-no-drag="true">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateWallet(wallet.id, { isCollapsed: !wallet.isCollapsed })}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1"
          >
            <ChevronDown size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteWallet(wallet.id)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!wallet.isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-50px)]">
          <WalletCardsList walletId={wallet.id} />
        </div>
      )}

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 bg-slate-300 dark:bg-slate-600 cursor-se-resize rounded-tl-lg"
        onMouseDown={() => setIsResizing(true)}
        style={{ opacity: 0.5 }}
      />
    </div>
  )
}

export default WalletWindow
