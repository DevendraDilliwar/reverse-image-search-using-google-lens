'use client'
import { useEffect, useState } from 'react'
import { Coins } from 'lucide-react'

// Mock function for demo - replace with your actual getUserProfile
const getUserProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return { credits: 1234 }
}

export default function CreditBalance() {
  const [credits, setCredits] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCredits = async () => {
      const profile = await getUserProfile()
      if (profile) setCredits(profile.credits)
      setLoading(false)
    }
    fetchCredits()
  }, [])

  const formatCredits = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <button className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-100 rounded-md text-xs font-medium text-gray-500 animate-pulse cursor-not-allowed">
        <Coins className="w-3.5 h-3.5 text-green-600" />
        <span>...</span>
      </button>
    )
  }

  if (credits === null) {
    return (
      <button className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-red-50 border border-red-200 rounded-md text-xs font-medium text-red-600 hover:bg-red-100 transition-colors duration-150">
        <Coins className="w-3.5 h-3.5" />
        <span>0</span>
      </button>
    )
  }

  return (
    <button className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-green-100 hover:bg-green-200 text-green-800 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all duration-150 active:scale-95">
      <Coins className="w-3.5 h-3.5" />
      <span>Credits left: {formatCredits(credits)}</span>
    </button>
  )
}