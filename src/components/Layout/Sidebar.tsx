import useStore from '@store/index'
import WalletList from '@components/Wallet/WalletList'
import LayerList from '@components/Layer/LayerList'
import { Plus } from 'lucide-react'
import Button from '@components/UI/Button'

function Sidebar() {
  const addWallet = useStore((state) => state.addWallet)
  const addLayer = useStore((state) => state.addLayer)

  const handleAddWallet = () => {
    addWallet('New Wallet', '#3B82F6', 'wallet')
  }

  const handleAddLayer = () => {
    addLayer('New Layer', '#10B981', 'layer')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Wallets Section */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Wallets</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddWallet}
              title="Add new wallet"
            >
              <Plus size={16} />
            </Button>
          </div>
          <WalletList />
        </div>
      </div>

      {/* Layers Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Layers</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddLayer}
              title="Add new layer"
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <LayerList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
