import { useEffect, useRef, useState } from 'react'
import useStore from '@store/index'
import MapWindow from '@components/Map/MapWindow'
import WalletWindow from '@components/Wallet/WalletWindow'

function Workspace() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const wallets = useStore((state) => state.wallets)
  const [gridSnap] = useState(10)

  // Handle canvas click for deselection
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      useStore.setState({
        selectedCardId: null,
        selectedWalletId: null,
        selectedLayerId: null,
      })
    }
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden cursor-default"
      onClick={handleCanvasClick}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSnap}px ${gridSnap}px`,
      }}
    >
      {/* Map Window */}
      <MapWindow />

      {/* Wallet Windows */}
      {Array.from(wallets.values()).map((wallet) => (
        <WalletWindow key={wallet.id} wallet={wallet} />
      ))}
    </div>
  )
}

export default Workspace
