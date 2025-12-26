'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Room } from './Room'
import { CameraController } from './CameraController'
import { useThree } from '@react-three/fiber'

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

      {focusedNote && (
        <mesh position={[0, 0, -0.5]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial
            color="black"
            transparent
            opacity={0.45}
          />
        </mesh>
      )}


      <Room
        focusedNote={focusedNote}
        setFocusedNote={setFocusedNote}
      />
    </Canvas>
  )
}
