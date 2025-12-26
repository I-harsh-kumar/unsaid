'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'

export function CameraController({
  targetRotation,
  zoomed,
}: {
  targetRotation: number
  zoomed: boolean
}) {
  const { camera } = useThree()

  const currentRotation = useRef(0)
  const currentPosition = useRef(new Vector3(0, 0, 0))

  useFrame(() => {
    // Smooth rotation
    currentRotation.current = MathUtils.lerp(
      currentRotation.current,
      targetRotation,
      0.08
    )
    camera.rotation.y = currentRotation.current

    // Determine forward direction
    const direction = new Vector3(0, 0, -1)
      .applyAxisAngle(new Vector3(0, 1, 0), currentRotation.current)

    const targetPosition = zoomed
      ? direction.multiplyScalar(2.5)
      : new Vector3(0, 0, 0)

    // Smooth position
    currentPosition.current.lerp(targetPosition, 0.08)
    camera.position.copy(currentPosition.current)
  })

  return null
}
