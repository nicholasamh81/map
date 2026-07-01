import useStore from '@store/index'
import type { Wallet } from '@types/index'
import { Trash2, Edit } from 'lucide-react'
import Button from '@components/UI/Button'

interface WalletListProps {}

function WalletList({}: WalletListProps) {
  const wallets = useStore((state) => state.wallets)
  const selectedWalletId = useStore((state) => state.selectedWalletId)
  const deleteWallet = useStore((state) => state.deleteWallet)
  const selectWallet = useStore((state) => state.selectWallet)

  if (wallets.size === 0) {
    return (
      <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
        No wallets yet. Create one from the header.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from(wallets.values()).map((wallet) => (
        <div
          key={wallet.id}
          className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
            selectedWalletId === wallet.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          onClick={() => selectWallet(wallet.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: wallet.color }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {wallet.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {wallet.cardIds.length} card{wallet.cardIds.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteWallet(wallet.id)
              }}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WalletList
