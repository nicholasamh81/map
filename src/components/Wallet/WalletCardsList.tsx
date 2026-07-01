import useStore from '@store/index'
import { Plus } from 'lucide-react'
import Button from '@components/UI/Button'
import CardItem from '@components/Card/CardItem'

interface WalletCardsListProps {
  walletId: string
}

function WalletCardsList({ walletId }: WalletCardsListProps) {
  const wallet = useStore((state) => state.wallets.get(walletId))
  const cards = useStore((state) => state.cards)
  const addCard = useStore((state) => state.addCard)
  const layers = useStore((state) => state.layers)

  if (!wallet) return null

  const walletCards = wallet.cardIds.map((id) => cards.get(id)).filter(Boolean)
  const defaultLayer = Array.from(layers.values())[0]?.id || ''

  const handleAddCard = () => {
    if (defaultLayer) {
      addCard(walletId, defaultLayer, 'New Card')
    }
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        size="sm"
        onClick={handleAddCard}
        className="w-full"
      >
        <Plus size={16} className="mr-1" /> Add Card
      </Button>
      <div className="space-y-1">
        {walletCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default WalletCardsList
