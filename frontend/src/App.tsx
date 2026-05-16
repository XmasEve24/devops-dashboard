import { useState, useEffect, useCallback } from 'react'
import { GitBranch, CheckCircle, Zap, Clock } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import WorkflowTable from './components/WorkflowTable'
import SystemMetricsPanel from './components/SystemMetrics'
import { fetchRuns, fetchMetrics } from './api/client'
import type { WorkflowRunsResponse, SystemMetrics } from './types'

const REFRESH_INTERVAL = 30

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

function buildChartData(runs: WorkflowRunsResponse['runs'], key: 'success' | 'total') {
  const grouped: Record<string, number> = {}
  for (const run of runs) {
    const day = run.createdAt.substring(0, 10)
    if (!grouped[day]) grouped[day] = 0
    if (key === 'total' || run.conclusion === 'success') grouped[day]++
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => ({ value }))
}

export default function App() {
  const [runs, setRuns] = useState<WorkflowRunsResponse | null>(null)
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [runsData, metricsData] = await Promise.all([fetchRuns(20), fetchMetrics()])
      setRuns(runsData)
      setMetrics(metricsData)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      setLoading(false)
      setCountdown(REFRESH_INTERVAL)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, REFRESH_INTERVAL * 1000)
    return () => clearInterval(interval)
  }, [refresh])

  useEffect(() => {
    const tick = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : REFRESH_INTERVAL)), 1000)
    return () => clearInterval(tick)
  }, [])

  const completedRuns = runs?.runs.filter((r) => r.status === 'completed') ?? []
  const successCount = completedRuns.filter((r) => r.conclusion === 'success').length
  const successRate = completedRuns.length > 0 ? Math.round((successCount / completedRuns.length) * 100) : 0
  const activeRuns = runs?.runs.filter((r) => r.status === 'in_progress').length ?? 0
  const lastRunTime = runs?.runs[0]?.createdAt ? timeAgo(runs.runs[0].createdAt) : '—'

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-inter">
      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/[0.07] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/[0.06] blur-3xl rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header countdown={countdown} loading={loading} onRefresh={refresh} />

        <main className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error} — Make sure your backend is running and GitHub env vars are set.
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Runs"
              value={runs?.totalCount ?? '—'}
              icon={GitBranch}
              color="purple"
              chartData={buildChartData(runs?.runs ?? [], 'total')}
              subtitle="all time"
            />
            <StatCard
              title="Success Rate"
              value={runs ? `${successRate}%` : '—'}
              icon={CheckCircle}
              color="emerald"
              chartData={buildChartData(runs?.runs ?? [], 'success')}
              subtitle={`${successCount} of ${completedRuns.length} completed`}
            />
            <StatCard
              title="Active Now"
              value={activeRuns}
              icon={Zap}
              color="amber"
              subtitle="in progress"
            />
            <StatCard
              title="Last Run"
              value={lastRunTime}
              icon={Clock}
              color="indigo"
              subtitle={runs?.runs[0]?.name ?? ''}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <WorkflowTable runs={runs?.runs ?? []} />
            </div>
            <div>
              <SystemMetricsPanel metrics={metrics} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
