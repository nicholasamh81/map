import useStore from '@store/index'
import type { Card } from '@types/index'
import { Trash2, MapPin } from 'lucide-react'

interface CardItemProps {
  card: Card
}

function CardItem({ card }: CardItemProps) {
  const selectedCardId = useStore((state) => state.selectedCardId)
  const deleteCard = useStore((state) => state.deleteCard)
  const selectCard = useStore((state) => state.selectCard)

  return (
    <div
      className={`p-2 rounded-lg border transition-all cursor-pointer ${
        selectedCardId === card.id
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
      onClick={() => selectCard(card.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {card.title}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <MapPin size={12} />
            <span>
              {card.latitude.toFixed(4)}, {card.longitude.toFixed(4)}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            deleteCard(card.id)
          }}
          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition-colors flex-shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export default CardItem
