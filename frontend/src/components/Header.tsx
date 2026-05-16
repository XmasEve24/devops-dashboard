import { RefreshCw } from 'lucide-react'

interface Props {
  countdown: number
  loading: boolean
  onRefresh: () => void
}

export default function Header({ countdown, loading, onRefresh }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-white tracking-tight">DevOps Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {import.meta.env.VITE_GITHUB_OWNER ?? 'GitHub'} / {import.meta.env.VITE_GITHUB_REPO ?? 'Repository'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Refreshing in {countdown}s</span>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    </header>
  )
}
