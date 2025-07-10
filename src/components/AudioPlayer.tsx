'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  onSaveClip: (data: {
    title: string
    audio_url: string
    start_time: number
    end_time: number
  }) => void
}

export default function AudioPlayer({ onSaveClip }: AudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState('')
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const setCurrentTimeAsStart = () => {
    setStartTime(currentTime)
  }

  const setCurrentTimeAsEnd = () => {
    setEndTime(currentTime)
  }

  const handleSaveClip = () => {
    if (!title.trim() || !audioUrl.trim()) {
      alert('Please enter a title and audio URL')
      return
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return
    }

    onSaveClip({
      title: title.trim(),
      audio_url: audioUrl.trim(),
      start_time: startTime,
      end_time: endTime,
    })

    // Reset form
    setTitle('')
    setStartTime(0)
    setEndTime(0)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Audio Player</h2>
      
      {/* Audio URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Audio URL
        </label>
        <input
          type="url"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          placeholder="https://example.com/audio.mp3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="mb-6">
          <audio
            ref={audioRef}
            controls
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <div className="mt-2 text-sm text-gray-600">
            Current: {formatTime(currentTime)} / Duration: {formatTime(duration)}
          </div>
        </div>
      )}

      {/* Time Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time: {formatTime(startTime)}
          </label>
          <button
            onClick={setCurrentTimeAsStart}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Set Current as Start
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Time: {formatTime(endTime)}
          </label>
          <button
            onClick={setCurrentTimeAsEnd}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Set Current as End
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clip Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for this clip..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveClip}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
      >
        Save Audio Clip
      </button>
    </div>
  )
} 