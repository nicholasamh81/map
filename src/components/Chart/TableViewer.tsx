import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { TableData } from '@types/index'
import type { ColumnDef, Row } from '@tanstack/react-table'

interface TableViewerProps {
  data: TableData
}

function TableViewer({ data }: TableViewerProps) {
  const columns: ColumnDef<any>[] = data.columns.map((col) => ({
    accessorKey: col.id,
    header: col.name,
  }))

  const table = useReactTable({
    data: data.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-white"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-slate-200 dark:border-slate-700 ${
                index % 2 === 0
                  ? 'bg-white dark:bg-slate-800'
                  : 'bg-slate-50 dark:bg-slate-900'
              } hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-slate-900 dark:text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableViewer
