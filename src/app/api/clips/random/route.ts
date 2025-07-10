import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get total count of clips
    const { count, error: countError } = await supabase
      .from('audio_clips')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 })
    }

    if (!count || count === 0) {
      return NextResponse.json({ error: 'No clips found' }, { status: 404 })
    }

    // Generate a random offset
    const randomOffset = Math.floor(Math.random() * count)

    // Get a random clip
    const { data, error } = await supabase
      .from('audio_clips')
      .select('*')
      .range(randomOffset, randomOffset)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 