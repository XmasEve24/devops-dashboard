import type { LucideIcon } from 'lucide-react'
import MiniChart from './MiniChart'

interface Props {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'purple' | 'emerald' | 'amber' | 'indigo'
  chartData?: { value: number }[]
  subtitle?: string
}

const colorMap = {
  purple: { gradient: 'from-purple-500 to-purple-700', glow: 'shadow-purple-500/30', chart: '#A855F7' },
  emerald: { gradient: 'from-emerald-500 to-emerald-700', glow: 'shadow-emerald-500/30', chart: '#10B981' },
  amber: { gradient: 'from-amber-400 to-amber-600', glow: 'shadow-amber-500/30', chart: '#F59E0B' },
  indigo: { gradient: 'from-indigo-500 to-indigo-700', glow: 'shadow-indigo-500/30', chart: '#6366F1' },
}

export default function StatCard({ title, value, icon: Icon, color, chartData, subtitle }: Props) {
  const { gradient, glow, chart } = colorMap[color]

  return (
    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${glow}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest pt-1">{title}</span>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {chartData && chartData.length > 0 && (
        <div className="opacity-60 group-hover:opacity-100 transition-opacity">
          <MiniChart data={chartData} color={chart} />
        </div>
      )}

      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`} />
    </div>
  )
}
