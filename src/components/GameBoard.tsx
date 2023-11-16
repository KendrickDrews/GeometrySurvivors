// import * as THREE from 'three'
// import { useRef, useState } from 'react'
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

import { RigidBody } from "@react-three/rapier"

const gridProps = { size: 100, divisions: 100, color: "#000000", centerlineColor: "#000000" }

export default function GameBoard() {
  // const [count, setCount] = useState(0)
    const {size, divisions,color, centerlineColor } = gridProps

  return (
    <>
    <gridHelper args={[size, divisions, color, centerlineColor]}/>
    <RigidBody type="fixed">
      <mesh position={[0,0,0]} rotation={[-((Math.PI/2)),0,0]}>
        <planeGeometry args={[100, 100, 1, 1]}/>
        <meshStandardMaterial color={'#fa9db1'} />
      </mesh>
    </RigidBody>
    <RigidBody >
      <mesh position={[-0.5,3.5,-0.5]} rotation={[-((Math.PI/2)),0,0]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={'#3131e3'} />
        </mesh>
    </RigidBody>

    </>
  )
}

