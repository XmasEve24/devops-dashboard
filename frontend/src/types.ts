export interface WorkflowRun {
  id: number
  name: string
  headBranch: string
  headSha: string
  status: string
  conclusion: string | null
  htmlUrl: string
  createdAt: string
  updatedAt: string
  runNumber: number
  actorLogin: string
  actorAvatarUrl: string
  commitMessage: string
}

export interface WorkflowRunsResponse {
  totalCount: number
  runs: WorkflowRun[]
}

export interface MemoryInfo {
  totalBytes: number
  freeBytes: number
  usedBytes: number
  maxBytes: number
  usedPercent: number
}

export interface DiskInfo {
  totalBytes: number
  freeBytes: number
  usedBytes: number
  usedPercent: number
}

export interface SystemMetrics {
  cpuLoadPercent: number
  memory: MemoryInfo
  disk: DiskInfo
}
