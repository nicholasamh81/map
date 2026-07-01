import { useState } from 'react'
import useStore from '@store/index'
import ChartViewer from './ChartViewer'
import TableViewer from './TableViewer'
import { Plus, Trash2 } from 'lucide-react'
import Button from '@components/UI/Button'
import Input from '@components/UI/Input'
import Select from '@components/UI/Select'

interface CardDetailsProps {
  cardId: string
}

function CardDetails({ cardId }: CardDetailsProps) {
  const card = useStore((state) => state.cards.get(cardId))
  const updateCard = useStore((state) => state.updateCard)
  const [showChartForm, setShowChartForm] = useState(false)
  const [showTableForm, setShowTableForm] = useState(false)

  if (!card) return null

  const handleAddChart = () => {
    updateCard(cardId, {
      chart: {
        type: 'line',
        title: 'New Chart',
        data: [
          { name: 'Data 1', value: 10 },
          { name: 'Data 2', value: 20 },
          { name: 'Data 3', value: 15 },
        ],
      },
    })
    setShowChartForm(false)
  }

  const handleAddTable = () => {
    updateCard(cardId, {
      table: {
        columns: [
          { id: 'col1', name: 'Column 1', type: 'text' },
          { id: 'col2', name: 'Column 2', type: 'number' },
        ],
        rows: [
          { id: 'row1', col1: 'Value 1', col2: 100 },
          { id: 'row2', col1: 'Value 2', col2: 200 },
        ],
      },
    })
    setShowTableForm(false)
  }

  return (
    <div className="space-y-4">
      {/* Chart Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-900 dark:text-white">Chart</h4>
          {!card.chart && (
            <Button size="sm" variant="primary" onClick={() => setShowChartForm(true)}>
              <Plus size={14} />
            </Button>
          )}
        </div>
        {card.chart ? (
          <div>
            <ChartViewer data={card.chart} />
            <Button
              size="sm"
              variant="danger"
              onClick={() => updateCard(cardId, { chart: undefined })}
              className="mt-2"
            >
              <Trash2 size={14} /> Remove
            </Button>
          </div>
        ) : showChartForm ? (
          <div className="space-y-2 p-2 border border-slate-200 dark:border-slate-700 rounded">
            <Select
              label="Chart Type"
              options={[
                { value: 'line', label: 'Line' },
                { value: 'bar', label: 'Bar' },
                { value: 'pie', label: 'Pie' },
                { value: 'area', label: 'Area' },
              ]}
            />
            <Button size="sm" variant="primary" onClick={handleAddChart}>
              Create Chart
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowChartForm(false)}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>

      {/* Table Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-900 dark:text-white">Table</h4>
          {!card.table && (
            <Button size="sm" variant="primary" onClick={() => setShowTableForm(true)}>
              <Plus size={14} />
            </Button>
          )}
        </div>
        {card.table ? (
          <div>
            <TableViewer data={card.table} />
            <Button
              size="sm"
              variant="danger"
              onClick={() => updateCard(cardId, { table: undefined })}
              className="mt-2"
            >
              <Trash2 size={14} /> Remove
            </Button>
          </div>
        ) : showTableForm ? (
          <div className="space-y-2 p-2 border border-slate-200 dark:border-slate-700 rounded">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Create a new table with sample data
            </p>
            <Button size="sm" variant="primary" onClick={handleAddTable}>
              Create Table
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowTableForm(false)}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>

      {/* Remarks Section */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Remarks</h4>
        <textarea
          value={card.remarks || ''}
          onChange={(e) => updateCard(cardId, { remarks: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none text-sm"
          placeholder="Add notes or remarks about this card..."
        />
      </div>
    </div>
  )
}

export default CardDetails
