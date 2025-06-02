'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import UserProfile from './user-profile'
import CreditBalance from './credit-balance'
import { 
  LogOut 
} from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        {/* ...existing left section code... */}

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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSignOut}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoading ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        </div>
      </div>

      {/* ...existing progress bar code... */}
    </header>
  )
}