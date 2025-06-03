'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils' // Fixed: changed 'cnn' to 'cn'
import {
  LayoutDashboard,
  Search,
  ScanSearch,
  ImagePlus,
  HelpCircle,
  Settings,
  ChevronRight
} from 'lucide-react'

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & analytics'
  },
  { 
    name: 'Image Search', 
    href: '/dashboard/image-search', 
    icon: Search,
    description: 'Find images quickly'
  },
  { 
    name: 'Full WebSearch', 
    href: '/dashboard/full-search', 
    icon: ScanSearch,
    description: 'Comprehensive search'
  },
  { 
    name: 'Generate Image', 
    href: '/dashboard/generate-image', 
    icon: ImagePlus,
    description: 'Create new images'
  },
   { 
    name: 'Subscription', 
    href: '/dashboard/subscription', 
    icon: ScanSearch,
    description: 'Comprehensive search'
  },
  { 
    name: 'Help', 
    href: '/dashboard/help', 
    icon: HelpCircle,
    description: 'Support & guides'
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    description: 'Preferences & config'
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 shadow-sm overflow-y-auto sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Dashboard</h2>
            <p className="text-xs text-slate-500">Control Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out',
                'hover:bg-slate-100/80 hover:shadow-sm hover:translate-x-1',
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-700 hover:text-slate-900'
              )}
            >
              {/* Icon */}
              <div className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200',
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'
              )}>
                <Icon className={cn(
                  'w-4 h-4 transition-colors duration-200',
                  isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                )} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  'font-medium text-sm transition-colors duration-200',
                  isActive ? 'text-white' : 'text-slate-800 group-hover:text-slate-900'
                )}>
                  {item.name}
                </div>
                <div className={cn(
                  'text-xs mt-0.5 transition-colors duration-200',
                  isActive ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-600'
                )}>
                  {item.description}
                </div>
              </div>

              {/* Arrow indicator */}
              <ChevronRight className={cn(
                'w-4 h-4 transition-all duration-200',
                isActive 
                  ? 'text-white/60 translate-x-1' 
                  : 'text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
              )} />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}