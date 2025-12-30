'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import type { NoteData } from './Scene'

export function CameraController({
  focusedNote,
  zoomed,
}: {
  focusedNote: NoteData | null
  zoomed: boolean
}) {
  const { camera } = useThree()

  const targetPosition = useRef(new Vector3())
  const lookAtTarget = useRef(new Vector3())

  useFrame(() => {
    // 🟢 DEFAULT CAMERA (room view)
    if (!focusedNote || !zoomed) {
      targetPosition.current.set(0, 0, 10)
      lookAtTarget.current.set(0, 0, 0)
    } 
    // 🔵 FOCUSED NOTE CAMERA
    else {
      const notePos = new Vector3(...focusedNote.position)

      // direction the note is facing
      const forward = new Vector3(0, 0, 1).applyEuler({
        x: focusedNote.rotation[0],
        y: focusedNote.rotation[1],
        z: focusedNote.rotation[2],
        order: 'XYZ',
      })

      // camera slightly in front of note
      targetPosition.current.copy(notePos).add(forward.multiplyScalar(1.8))
      lookAtTarget.current.copy(notePos)
    }

    // 🎥 Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.08)
    camera.lookAt(lookAtTarget.current)
  })

  return null
}
