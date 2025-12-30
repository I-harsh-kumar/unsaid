'use client'

import { DoubleSide } from 'three'
import { Note } from './Note'
import type { WallId, NoteData } from './Scene'

export function Room({
  notes,
  onCreateNote,
}: {
  notes: NoteData[]
  onCreateNote: (
    wall: WallId,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void
}) {
  function Wall({
    wallId,
    position,
    rotation,
  }: {
    wallId: WallId
    position: [number, number, number]
    rotation?: [number, number, number]
  }) {
    return (
      <mesh
        position={position}
        rotation={rotation}
        onContextMenu={(e) => {
          e.stopPropagation()

          const p = e.point

          const wallRotation: Record<WallId, [number, number, number]> = {
            front: [0, 0, 0],
            back: [0, Math.PI, 0],
            left: [0, Math.PI / 2, 0],
            right: [0, -Math.PI / 2, 0],
          }

          onCreateNote(wallId, [p.x, p.y, p.z], wallRotation[wallId])
        }}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>
    )
  }

  return (
    <group>
      <Wall wallId="front" position={[0, 0, -5]} />
      <Wall wallId="back" position={[0, 0, 5]} rotation={[0, Math.PI, 0]} />
      <Wall wallId="left" position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall wallId="right" position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {notes.map((note) => (
        <Note
          key={note.id}
          position={note.position}
          rotation={note.rotation}
        />
      ))}
    </group>
  )
}
