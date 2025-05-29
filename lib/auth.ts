// lib/auth.ts
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

const supabase = createClientComponentClient<Database>()

export async function getUserProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const { data: profile } = await supabase
    .from('users')
    .select('id, name, credits, avatar_url')
    .eq('id', session.user.id)
    .single()

  return profile
}
