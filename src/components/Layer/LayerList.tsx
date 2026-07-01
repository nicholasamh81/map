import useStore from '@store/index'
import type { Layer } from '@types/index'
import { Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react'

function LayerList() {
  const layers = useStore((state) => state.layers)
  const selectedLayerId = useStore((state) => state.selectedLayerId)
  const selectLayer = useStore((state) => state.selectLayer)
  const deleteLayer = useStore((state) => state.deleteLayer)
  const updateLayer = useStore((state) => state.updateLayer)

  if (layers.size === 0) {
    return (
      <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
        No layers yet. Create one from the header.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from(layers.values()).map((layer) => (
        <div
          key={layer.id}
          className={`p-3 rounded-lg border-2 transition-all ${
            selectedLayerId === layer.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => selectLayer(layer.id)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: layer.color }}
              />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {layer.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                updateLayer(layer.id, { visible: !layer.visible })
              }}
              className="flex-1 flex items-center justify-center gap-1 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-xs"
            >
              {layer.visible ? (
                <Eye size={14} />
              ) : (
                <EyeOff size={14} />
              )}
              {layer.visible ? 'Show' : 'Hide'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                updateLayer(layer.id, { locked: !layer.locked })
              }}
              className="flex-1 flex items-center justify-center gap-1 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-xs"
            >
              {layer.locked ? (
                <Lock size={14} />
              ) : (
                <Unlock size={14} />
              )}
              {layer.locked ? 'Locked' : 'Unlock'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteLayer(layer.id)
              }}
              className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LayerList
