// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          credits: number
          avatar: string | null
        }
        Insert: {
          id: string
          name?: string
          email?: string
          credits?: number
          avatar?: string | null
        }
        Update: {
          name?: string
          email?: string
          credits?: number
          avatar?: string | null
        }
      }
    }
  }
}
