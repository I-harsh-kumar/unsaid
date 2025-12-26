'use client'

import { MeshProps } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { Note } from './Note'

function Marker({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function Wall(props: MeshProps) {
  return (
    <mesh {...props}>
      <planeGeometry args={[10, 5]} />
      <meshStandardMaterial color="white" side={DoubleSide} />
    </mesh>
  )
}


export function Room({
  focusedNote,
  setFocusedNote,
}: {
  focusedNote: string | null
  setFocusedNote: (id: string) => void
}) {

  return (
    <group>

      {focusedNote && (
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="black"
          transparent
          opacity={0.35}
        />
      </mesh>
    )}


      {/* Walls */}
      <Wall position={[0, 0, -5]} />
      <Wall position={[0, 0, 5]} rotation={[0, Math.PI, 0]} />
      <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>

      {/* Notes */}
      <Note
      id="front"
      position={[0, 0, -4.85]}
      rotation={[0, 0, 0]}
      focused={focusedNote === null || focusedNote === 'front'}
      onClick={setFocusedNote}
      />

      <Note
        id="right"
        position={[4.85, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        focused={focusedNote === null || focusedNote === 'right'}
        onClick={setFocusedNote}
      />

      <Note
        id="back"
        position={[0, 0, 4.85]}
        rotation={[0, Math.PI, 0]}
        focused={focusedNote === null || focusedNote === 'back'}
        onClick={setFocusedNote}
      />

      <Note
        id="left"
        position={[-4.85, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        focused={focusedNote === null || focusedNote === 'left'}
        onClick={setFocusedNote}
      />


      {/* Direction markers (temporary) */}
      <Marker position={[0, 0, -4.8]} />
      <Marker position={[0, 0, 4.8]} />
      <Marker position={[-4.8, 0, 0]} />
      <Marker position={[4.8, 0, 0]} />
    </group>
  )
}
