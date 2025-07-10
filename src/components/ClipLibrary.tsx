'use client'

import { useState, useEffect } from 'react'
import { AudioClip } from '@/lib/supabase'

export default function ClipLibrary() {
  const [clips, setClips] = useState<AudioClip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchClips()
  }, [])

  const fetchClips = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clips')
      if (!response.ok) {
        throw new Error('Failed to fetch clips')
      }
      const data = await response.json()
      setClips(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const playClip = (clip: AudioClip) => {
    // Create a temporary audio element to play the clip
    const audio = new Audio(clip.audio_url)
    audio.currentTime = clip.start_time
    audio.play()
    
    // Stop at end time
    const stopAt = clip.end_time
    const checkTime = () => {
      if (audio.currentTime >= stopAt) {
        audio.pause()
        audio.removeEventListener('timeupdate', checkTime)
      }
    }
    audio.addEventListener('timeupdate', checkTime)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Clip Library</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading clips...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Clip Library</h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchClips}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clip Library</h2>
        <button
          onClick={fetchClips}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>

      {clips.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No clips saved yet. Create your first clip above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{clip.title}</h3>
                <span className="text-sm text-gray-500">{formatDate(clip.created_at)}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-sm text-gray-600">
                  {formatTime(clip.start_time)} - {formatTime(clip.end_time)}
                </span>
                <span className="text-sm text-gray-500">
                  Duration: {formatTime(clip.end_time - clip.start_time)}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => playClip(clip)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                >
                  Play Clip
                </button>
                <a
                  href={clip.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Open Audio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 