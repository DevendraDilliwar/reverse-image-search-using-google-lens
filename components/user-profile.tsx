'use client'

import { useEffect, useState } from 'react'
import { getUserProfile } from '@/lib/auth'
import { ChevronDown, User, LogOut, CreditCard, Crown } from 'lucide-react'

export default function UserProfile() {
  const [user, setUser] = useState<{ name: string; avatar_url: string | null } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getUserProfile()
      if (profile) {
        setUser({ name: profile.name, avatar_url: profile.avatar_url })
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="hidden sm:block text-right">
          <div className="w-16 h-4 bg-slate-200 rounded mb-1"></div>
          <div className="w-12 h-3 bg-slate-200 rounded"></div>
        </div>
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        <div className="w-4 h-4 bg-slate-200 rounded"></div>
      </div>
    )
  }

  // No user state
  if (!user) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
        <User className="w-5 h-5 text-green-500" />
        <span className="text-sm text-green-600 font-medium">Sign in</span>
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* User Profile Button */}
      <div className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200/60 hover:shadow-sm cursor-pointer">
        {/* User Info - Hidden on small screens */}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
            {user.name}
          </p>
          <p className="text-xs text-slate-500 group-hover:text-slate-600">
            Administrator
          </p>
        </div>

        {/* Avatar */}
        <div className="relative">
          <img
            src={user.avatar_url || '/default-avatar.png'}
            alt={`${user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:shadow-md transition-shadow duration-200"
          />
          {/* Online status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-slate-600" />
      </div>

      {/* Dropdown Menu - Shows on Hover */}
      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200/60 rounded-xl shadow-lg shadow-slate-900/10 z-20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
        
        {/* User Info Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar_url || '/default-avatar.png'}
              alt={`${user.name}'s avatar`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-800 truncate">
                  {user.name}
                </p>
                <Crown className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xs text-slate-500">Administrator</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 group/item">
            <User className="w-4 h-4 text-slate-500 group-hover/item:text-slate-700" />
            <span className="text-sm text-slate-700 group-hover/item:text-slate-900">View Profile</span>
          </button>
          
          <button className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 group/item">
            <CreditCard className="w-4 h-4 text-slate-500 group-hover/item:text-slate-700" />
            <span className="text-sm text-slate-700 group-hover/item:text-slate-900">Payment History</span>
          </button>
          
          <div className="my-1 h-px bg-slate-200/60"></div>
          
          <button className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors duration-150 flex items-center gap-3 group/item">
            <LogOut className="w-4 h-4 text-slate-500 group-hover/item:text-red-600" />
            <span className="text-sm text-slate-700 group-hover/item:text-red-700">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}