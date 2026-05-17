# DevOps Dashboard — 구현 계획 및 진행 현황

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
├── .gitignore
├── backend/
│   ├── build.gradle                    # Java 21, Spring Boot 4.0.6
│   ├── settings.gradle
│   ├── gradlew
│   └── src/main/
│       ├── java/devops/dashboard/
│       │   ├── config/
│       │   │   ├── AppProperties.java  # @ConfigurationProperties (token, owner, repo)
│       │   │   ├── RestClientConfig.java
│       │   │   └── WebConfig.java      # CORS (localhost:5173)
│       │   ├── github/
│       │   │   ├── GitHubDtos.java
│       │   │   ├── GitHubService.java
│       │   │   └── GitHubController.java
│       │   └── metrics/
│       │       ├── MetricsService.java
│       │       └── MetricsController.java
│       └── resources/
│           ├── application.yml         # 환경변수 참조
│           └── application-local.yml   # 실제 토큰 (gitignore)
└── frontend/
    ├── package.json
    ├── vite.config.ts                  # /api → localhost:8081 proxy
    ├── tailwind.config.js
    └── src/
        ├── App.tsx
        ├── types.ts
        ├── api/client.ts
        └── components/
            ├── Sidebar.tsx
            ├── Header.tsx
            ├── StatCard.tsx
            ├── WorkflowTable.tsx
            ├── StatusBadge.tsx
            ├── SystemMetrics.tsx
            └── MiniChart.tsx
```

## API 엔드포인트
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/github/runs?limit=20 | 최근 워크플로우 실행 목록 |
| GET | /api/github/workflows | 워크플로우 목록 |
| GET | /api/metrics/system | CPU/메모리/디스크 현황 |

## 실행 방법
```bash
# 백엔드 (local 프로필로 application-local.yml 사용)
cd backend
./gradlew bootRun --args='--spring.profiles.active=local'

# 프론트엔드 (별도 터미널)
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

---

## 진행 현황

### ✅ 완료
- 프로젝트 구조 생성
- 백엔드 구현 (Spring Boot 4.0.6, Java 21)
  - GitHub Actions API 연동 (`facebook/react` 테스트)
  - 시스템 메트릭 API (CPU, 메모리, 디스크)
  - CORS 설정
- 프론트엔드 구현 (React + Vite + Tailwind)
  - 빌드 성공 확인
- 보안 처리
  - `application-local.yml`로 토큰 분리
  - `.gitignore` 추가
- API 동작 확인
  - `http://localhost:8081/api/github/runs` ✅
  - `http://localhost:8081/api/metrics/system` ✅
- `git init` + 첫 커밋
- `gh` CLI 설치 및 GitHub 로그인

### 🔄 진행 중
- GitHub 레포 생성 및 push
  - 토큰 권한 설정 중 (필요 권한: `repo`, `workflow`, `read:org`)

### 📋 남은 작업
- GitHub push 완료
- 프론트엔드 실행 및 UI 확인
- 배포
