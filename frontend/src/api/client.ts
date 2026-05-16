import type { WorkflowRunsResponse, SystemMetrics } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const fetchRuns = (limit = 20) =>
  get<WorkflowRunsResponse>(`/api/github/runs?limit=${limit}`)

export const fetchMetrics = () =>
  get<SystemMetrics>('/api/metrics/system')
