import type { WorkflowRun } from '../types'
import StatusBadge from './StatusBadge'

interface Props {
  runs: WorkflowRun[]
}

function formatDuration(createdAt: string, updatedAt: string, status: string): string {
  if (status === 'in_progress' || status === 'queued') return '—'
  const ms = new Date(updatedAt).getTime() - new Date(createdAt).getTime()
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function WorkflowTable({ runs }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Workflow Runs</h2>
        <span className="text-xs text-slate-500">{runs.length} recent</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Workflow</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Branch</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Actor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Duration</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {runs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-600">
                  No workflow runs found
                </td>
              </tr>
            )}
            {runs.map((run) => (
              <tr
                key={run.id}
                onClick={() => window.open(run.htmlUrl, '_blank')}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <td className="px-5 py-3">
                  <StatusBadge status={run.status} conclusion={run.conclusion} />
                </td>
                <td className="px-5 py-3">
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate max-w-[180px]">
                    {run.name}
                  </div>
                  {run.commitMessage && (
                    <div className="text-xs text-slate-500 truncate max-w-[180px] mt-0.5">
                      {run.commitMessage}
                    </div>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono">
                    {run.headBranch}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    {run.actorAvatarUrl && (
                      <img
                        src={run.actorAvatarUrl}
                        alt={run.actorLogin}
                        className="w-5 h-5 rounded-full ring-1 ring-white/10"
                      />
                    )}
                    <span className="text-xs text-slate-400">{run.actorLogin}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-slate-400 font-mono">
                  {formatDuration(run.createdAt, run.updatedAt, run.status)}
                </td>
                <td className="px-5 py-3 text-xs text-slate-500">
                  {timeAgo(run.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
