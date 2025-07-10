import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AudioClip {
  id: string
  title: string
  audio_url: string
  start_time: number
  end_time: number
  created_at: string
}

export interface CreateClipData {
  title: string
  audio_url: string
  start_time: number
  end_time: number
} 