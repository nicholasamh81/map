import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { ChartData } from '@types/index'

interface ChartViewerProps {
  data: ChartData
}

function ChartViewer({ data }: ChartViewerProps) {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const renderChart = () => {
    switch (data.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                dot={{ fill: colors[0], r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.data.map((_, index) => (
                  <Pie key={`pie-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                fill={colors[0]}
                stroke={colors[0]}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
        {data.title}
      </h3>
      {renderChart()}
    </div>
  )
}

export default ChartViewer
