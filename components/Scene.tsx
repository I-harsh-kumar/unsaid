'use client'

import { useState } from 'react'
import { Room } from './Room'
import { CameraController } from './CameraController'

export type WallId = 'front' | 'back' | 'left' | 'right'

export type NoteData = {
  id: string
  wall: WallId
  position: [number, number, number]
  rotation: [number, number, number]
  text: string
  isDraft: boolean
  onPost: (text: string) => void
  onCancel: () => void
}

export default function Scene({
  rotationIndex,
  zoomed,
  onDraftCreated,
}: {
  rotationIndex: number
  zoomed: boolean
  onDraftCreated: (note: NoteData) => void
}) {
  const [notes, setNotes] = useState<NoteData[]>([])

  function createDraftNote(
    wall: WallId,
    position: [number, number, number],
    rotation: [number, number, number]
  ) {
    const id = crypto.randomUUID()

    const draft: NoteData = {
      id,
      wall,
      position,
      rotation,
      text: '',
      isDraft: true,
      onPost: (text) => {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, text, isDraft: false } : n
          )
        )
      },
      onCancel: () => {
        setNotes((prev) => prev.filter((n) => n.id !== id))
      },
    }

    setNotes((prev) => [...prev, draft])
    onDraftCreated(draft)
  }

  return (
    <>
      <CameraController rotationIndex={rotationIndex} zoomed={zoomed} />

      <Room notes={notes} onCreateNote={createDraftNote} />
    </>
  )
}
