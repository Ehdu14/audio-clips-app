'use client'

import { useState } from 'react'
import AudioPlayer from '@/components/AudioPlayer'
import ClipLibrary from '@/components/ClipLibrary'
import QuoteOfTheDay from '@/components/QuoteOfTheDay'
import { CreateClipData } from '@/lib/supabase'

export default function Home() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveClip = async (clipData: CreateClipData) => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/clips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clipData),
      })

      if (!response.ok) {
        throw new Error('Failed to save clip')
      }

      // Refresh the page to update the library and quote of the day
      window.location.reload()
    } catch (error) {
      console.error('Error saving clip:', error)
      alert('Failed to save clip. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎵 Audio Clips
              </h1>
              <p className="text-gray-600">Readwise for Audio</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Save your favorite audio moments
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Audio Player */}
          <div className="lg:col-span-1">
            <AudioPlayer onSaveClip={handleSaveClip} />
            {isSaving && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Saving clip...</p>
              </div>
            )}
          </div>

          {/* Right Column - Quote of the Day and Library */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quote of the Day */}
            <QuoteOfTheDay />

            {/* Clip Library */}
            <ClipLibrary />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>Built with Next.js, Supabase, and ❤️</p>
            <p className="mt-2 text-sm">
              Upload audio, set timestamps, and save your favorite moments
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 