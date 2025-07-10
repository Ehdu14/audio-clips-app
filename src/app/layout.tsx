import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Audio Clips - Readwise for Audio',
  description: 'Save and organize your favorite audio moments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 