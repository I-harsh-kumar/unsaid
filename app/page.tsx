'use client'

import { useState } from 'react'
import Scene from '@/components/Scene'

export default function Home() {
  const [rotationIndex, setRotationIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [focusedNote, setFocusedNote] = useState<string | null>(null)

  return (
    <main className="w-screen h-screen bg-black relative">
      <Scene rotationIndex={rotationIndex} zoomed={zoomed} focusedNote={focusedNote} setFocusedNote={setFocusedNote} />

      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => setRotationIndex((r) => r - 1)}
          className="px-4 py-2 bg-white/10 text-white rounded"
        >
          ←
        </button>

        <button
          onClick={() => setZoomed((z) => !z)}
          className="px-4 py-2 bg-white/10 text-white rounded"
        >
          {zoomed ? 'Back' : 'Zoom'}
        </button>

        <button
          onClick={() => setRotationIndex((r) => r + 1)}
          className="px-4 py-2 bg-white/10 text-white rounded"
        >
          →
        </button>
      </div>
    </main>
  )
}
