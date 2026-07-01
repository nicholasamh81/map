import useStore from '@store/index'
import type { Wallet, Card, Layer } from '@types/index'
import { X } from 'lucide-react'

function PropertiesPanel() {
  const selectedCardId = useStore((state) => state.selectedCardId)
  const selectedWalletId = useStore((state) => state.selectedWalletId)
  const selectedLayerId = useStore((state) => state.selectedLayerId)
  const cards = useStore((state) => state.cards)
  const wallets = useStore((state) => state.wallets)
  const layers = useStore((state) => state.layers)
  const updateCard = useStore((state) => state.updateCard)
  const updateWallet = useStore((state) => state.updateWallet)
  const updateLayer = useStore((state) => state.updateLayer)
  const selectCard = useStore((state) => state.selectCard)
  const selectWallet = useStore((state) => state.selectWallet)
  const selectLayer = useStore((state) => state.selectLayer)

  const selectedCard = selectedCardId ? cards.get(selectedCardId) : null
  const selectedWalletData = selectedWalletId ? wallets.get(selectedWalletId) : null
  const selectedLayerData = selectedLayerId ? layers.get(selectedLayerId) : null

  const handleClosePanel = () => {
    selectCard(null)
    selectWallet(null)
    selectLayer(null)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Properties</h2>
        <button
          onClick={handleClosePanel}
          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedCard ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Card Properties</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={selectedCard.title}
                onChange={(e) =>
                  updateCard(selectedCard.id, { title: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={selectedCard.description}
                onChange={(e) =>
                  updateCard(selectedCard.id, { description: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <input
                  type="number"
                  value={selectedCard.latitude}
                  onChange={(e) =>
                    updateCard(selectedCard.id, {
                      latitude: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <input
                  type="number"
                  value={selectedCard.longitude}
                  onChange={(e) =>
                    updateCard(selectedCard.id, {
                      longitude: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon Color</label>
              <input
                type="color"
                value={selectedCard.iconColor}
                onChange={(e) =>
                  updateCard(selectedCard.id, { iconColor: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        ) : selectedWalletData ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Wallet Properties</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={selectedWalletData.name}
                onChange={(e) =>
                  updateWallet(selectedWalletData.id, { name: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={selectedWalletData.color}
                onChange={(e) =>
                  updateWallet(selectedWalletData.id, { color: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p>Cards: {selectedWalletData.cardIds.length}</p>
              <p>Position: ({Math.round(selectedWalletData.position.x)}, {Math.round(selectedWalletData.position.y)})</p>
              <p>Size: {Math.round(selectedWalletData.size.width)} × {Math.round(selectedWalletData.size.height)}</p>
            </div>
          </div>
        ) : selectedLayerData ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Layer Properties</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={selectedLayerData.name}
                onChange={(e) =>
                  updateLayer(selectedLayerData.id, { name: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={selectedLayerData.color}
                onChange={(e) =>
                  updateLayer(selectedLayerData.id, { color: e.target.value })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLayerData.visible}
                  onChange={(e) =>
                    updateLayer(selectedLayerData.id, { visible: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm">Visible</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLayerData.locked}
                  onChange={(e) =>
                    updateLayer(selectedLayerData.id, { locked: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm">Locked</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <p>Select an item to edit properties</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesPanel
