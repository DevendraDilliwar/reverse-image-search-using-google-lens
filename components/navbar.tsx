// components/Navbar.tsx
'use client'

import { useState } from 'react'
import UserProfile from './user-profile'
import CreditBalance from './credit-balance'
import { 
  Menu
} from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        
        {/* Left Section - Title & Search */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Page Title */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Dashboard
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Welcome back! Here's what's happening</p>
            </div>
          </div>
        </div>

        {/* Right Section - Profile */}
        <div className="flex items-center gap-4">
          
          {/* Credit Balance & User Profile */}
          <div className="flex items-center gap-4">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <CreditBalance />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (Optional - for loading states) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-out" />
    </header>
  )
}