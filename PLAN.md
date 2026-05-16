# DevOps Dashboard — 구현 계획

## 개요
서버/인프라 메트릭(CPU, 메모리, 디스크)과 GitHub Actions 워크플로우 현황을 실시간으로 보여주는 DevOps Dashboard.

## 디자인 컨셉
Dribbble 인기 스타일인 **Dark Glassmorphism**:
- 배경: `#080B14` (slate-950)
- 카드: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`
- 주 강조: purple-500 → indigo-500 그라디언트
- 폰트: Inter

## 기술 스택
| 계층 | 기술 |
|------|------|
| Backend | Spring Boot 4.0.6, Java 21 |
| Frontend | React 18, TypeScript, Vite |
| UI | Tailwind CSS v3, Recharts, Lucide React |
| 외부 연동 | GitHub REST API v3 |

## 프로젝트 구조
```
devops-dashboard/
├── PLAN.md
├── backend/                        # Spring Boot
│   ├── build.gradle
│   └── src/main/java/devops/dashboard/
│       ├── config/
│       │   ├── AppProperties.java  # @ConfigurationProperties
│       │   ├── RestClientConfig.java
│       │   └── WebConfig.java      # CORS
│       ├── github/
│       │   ├── GitHubDtos.java
│       │   ├── GitHubService.java
│       │   └── GitHubController.java
│       └── metrics/
│           ├── MetricsService.java # OperatingSystemMXBean
│           └── MetricsController.java
└── frontend/                       # React + Vite
    └── src/
        ├── App.tsx                 # 루트 레이아웃
        ├── types.ts
        ├── api/client.ts
        └── components/
            ├── Sidebar.tsx
            ├── Header.tsx
            ├── StatCard.tsx        # KPI 카드
            ├── WorkflowTable.tsx   # GitHub Actions 목록
            ├── StatusBadge.tsx
            ├── SystemMetrics.tsx   # SVG 원형 게이지
            └── MiniChart.tsx       # Recharts AreaChart
```

## API 엔드포인트
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/github/runs?limit=20 | 최근 워크플로우 실행 목록 |
| GET | /api/github/workflows | 워크플로우 목록 |
| GET | /api/metrics/system | CPU/메모리/디스크 현황 |

## 실행 방법
```bash
# 환경변수 설정
export GITHUB_TOKEN=your_pat_here
export GITHUB_OWNER=your_github_username
export GITHUB_REPO=your_repo_name

# 백엔드 실행
cd backend
./gradlew bootRun

# 프론트엔드 실행 (별도 터미널)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## UI 레이아웃
```
[Sidebar 64px] │ [Header: 리포명 + live dot + 갱신 카운트다운]
               ├──────────────────────────────────────────────
               │ [Total Runs] [Success Rate] [Active] [Last]  ← StatCards
               ├──────────────────────────────────────────────
               │ [Workflow Runs Table (2/3)]  [System Metrics (1/3)]
```
