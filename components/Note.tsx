'use client'

import { DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

type NoteProps = {
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  focused: boolean
  onClick: (id: string) => void
}

export function Note({
  id,
  position,
  rotation,
  focused,
  onClick,
}: NoteProps) {
  const ref = useRef<Mesh>(null!)

  useFrame(() => {
    if (!ref.current) return

    // Move slightly forward when focused
    ref.current.position.z = focused
      ? position[2] + 0.4
      : position[2]
  })

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation()
        onClick(id)
      }}
    >
      <planeGeometry args={[0.9, 0.55]} />
      <meshStandardMaterial
        color="#f5f5f5"
        side={DoubleSide}
        transparent
        opacity={focused ? 1 : 0}
      />
    </mesh>
  )
}
