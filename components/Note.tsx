'use client'

import { DoubleSide } from 'three'

export function Note({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.9, 0.55]} />
      <meshStandardMaterial color="#f5f5f5" side={DoubleSide} />
    </mesh>
  )
}
