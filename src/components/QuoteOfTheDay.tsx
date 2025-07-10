'use client'

import { useState, useEffect } from 'react'
import { AudioClip } from '@/lib/supabase'

export default function QuoteOfTheDay() {
  const [clip, setClip] = useState<AudioClip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRandomClip()
  }, [])

  const fetchRandomClip = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clips/random')
      if (!response.ok) {
        if (response.status === 404) {
          setError('No clips available for today')
          return
        }
        throw new Error('Failed to fetch random clip')
      }
      const data = await response.json()
      setClip(data)
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

  const playClip = (clip: AudioClip) => {
    const audio = new Audio(clip.audio_url)
    audio.currentTime = clip.start_time
    audio.play()
    
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Quote of the Day</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2">Loading today's quote...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Quote of the Day</h2>
        <div className="text-center py-8">
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchRandomClip}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!clip) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Quote of the Day</h2>
        <div className="text-center py-8">
          <p>No clips available. Create your first clip to see it here!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">Quote of the Day</h2>
        <button
          onClick={fetchRandomClip}
          className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors text-sm"
        >
          New Quote
        </button>
      </div>
      
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">{clip.title}</h3>
        <p className="text-sm opacity-90 mb-3">
          {formatTime(clip.start_time)} - {formatTime(clip.end_time)}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => playClip(clip)}
            className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors font-medium"
          >
            🎵 Play Quote
          </button>
          <a
            href={clip.audio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors"
          >
            📁 Open Audio
          </a>
        </div>
      </div>
      
      <p className="text-sm opacity-75">
        "The best way to predict the future is to create it." - Your audio library
      </p>
    </div>
  )
} 