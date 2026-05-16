import type { SystemMetrics } from '../types'

interface Props {
  metrics: SystemMetrics | null
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const gb = bytes / (1024 ** 3)
  if (gb >= 1) return `${gb.toFixed(1)} GB`
  const mb = bytes / (1024 ** 2)
  return `${mb.toFixed(0)} MB`
}

interface GaugeProps {
  value: number
  label: string
  detail: string
  color: string
  trackColor: string
}

function CircleGauge({ value, label, detail, color, trackColor }: GaugeProps) {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(value, 100))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke={trackColor} strokeWidth="7" />
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white leading-none">{Math.round(clamped)}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</div>
        <div className="text-xs text-slate-600 mt-0.5">{detail}</div>
      </div>
    </div>
  )
}

export default function SystemMetricsPanel({ metrics }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">System Health</h2>
        <p className="text-xs text-slate-500 mt-0.5">Server resource usage</p>
      </div>

      {!metrics ? (
        <div className="flex items-center justify-center h-48 text-slate-600 text-sm">
          Loading metrics...
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <CircleGauge
            value={metrics.cpuLoadPercent}
            label="CPU"
            detail={`${metrics.cpuLoadPercent.toFixed(1)}% load`}
            color="#A855F7"
            trackColor="rgba(168,85,247,0.1)"
          />
          <CircleGauge
            value={metrics.memory.usedPercent}
            label="Memory"
            detail={`${formatBytes(metrics.memory.usedBytes)} / ${formatBytes(metrics.memory.totalBytes)}`}
            color="#6366F1"
            trackColor="rgba(99,102,241,0.1)"
          />
          <CircleGauge
            value={metrics.disk.usedPercent}
            label="Disk"
            detail={`${formatBytes(metrics.disk.usedBytes)} / ${formatBytes(metrics.disk.totalBytes)}`}
            color="#10B981"
            trackColor="rgba(16,185,129,0.1)"
          />
        </div>
      )}
    </div>
  )
}
