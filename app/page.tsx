'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene, { NoteData } from '@/components/Scene'
import { NoteEditor } from '@/components/NoteEditor'

export default function Home() {
  const [rotationIndex, setRotationIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const [draftNote, setDraftNote] = useState<NoteData | null>(null)

  return (
    <main className="w-screen h-screen bg-black relative">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />

        <Scene
          rotationIndex={rotationIndex}
          zoomed={zoomed}
          onDraftCreated={setDraftNote}
        />
      </Canvas>

      {/* NOTE EDITOR (HTML OVERLAY) */}
      {draftNote && (
        <NoteEditor
          onPost={(text) => {
            draftNote.onPost(text)
            setDraftNote(null)
          }}
          onCancel={() => {
            draftNote.onCancel()
            setDraftNote(null)
          }}
        />
      )}

      {/* UI CONTROLS */}
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
