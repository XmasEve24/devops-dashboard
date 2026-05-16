interface Props {
  status: string
  conclusion: string | null
}

const config: Record<string, { label: string; className: string; dot: string }> = {
  success: {
    label: 'Success',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  failure: {
    label: 'Failed',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
    dot: 'bg-red-400',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  },
  in_progress: {
    label: 'Running',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400 animate-pulse',
  },
  queued: {
    label: 'Queued',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dot: 'bg-blue-400',
  },
  skipped: {
    label: 'Skipped',
    className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  },
}

const fallback = {
  label: 'Unknown',
  className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  dot: 'bg-slate-400',
}

export default function StatusBadge({ status, conclusion }: Props) {
  const key = status === 'completed' ? (conclusion ?? 'unknown') : status
  const { label, className, dot } = config[key] ?? fallback

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
