'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Room } from './Room'
import { CameraController } from './CameraController'

type SceneProps = {
  rotationIndex: number
  zoomed: boolean
  focusedNote: string | null
  setFocusedNote: (id: string | null) => void
}

export default function Scene({
  rotationIndex,
  zoomed,
  focusedNote,
  setFocusedNote,
}: SceneProps) {
  const targetRotation = rotationIndex * (Math.PI / 2)

  return (
    <Canvas
      className="w-full h-full"
      onPointerMissed={() => setFocusedNote(null)}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={60} />

      <CameraController targetRotation={targetRotation} zoomed={zoomed} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 4, 2]} intensity={2} />

      <Room
        focusedNote={focusedNote}
        setFocusedNote={setFocusedNote}
      />
    </Canvas>
  )
}
