import { LayoutDashboard, GitBranch, Server, Settings, Rocket } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: GitBranch, label: 'Pipelines', active: false },
  { icon: Server, label: 'Servers', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export default function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-6 gap-8 border-r border-white/10 bg-white/[0.02] z-10 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
        <Rocket className="w-5 h-5 text-white" />
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all group
              ${active
                ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute left-14 bg-slate-800 border border-white/10 text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl text-slate-200 transition-opacity">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
