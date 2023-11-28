// import * as THREE from 'three'
// import { useRef, useState } from 'react'
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

import { CuboidCollider, RigidBody } from "@react-three/rapier"
const gridSize = 50
const arenaHeight = 5
const boundaryWidth = 0.5
const gridProps = { size: gridSize, divisions: gridSize, color: "#000000", centerlineColor: "#000000" }

export default function GameBoard() {
  // const [count, setCount] = useState(0)
    const {size, divisions,color, centerlineColor } = gridProps

  return (
    <>
    <gridHelper args={[size, divisions, color, centerlineColor]}/>
    {/* Game Plane */}
    <RigidBody type="fixed" name="floor">
      <mesh position={[0,-0.01,0]} rotation={[-((Math.PI/2)),0,0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize, 1, 1]}/>
        <meshStandardMaterial color={'#fa9db1'} />
      </mesh>
    </RigidBody>
    {/* edges of the world */}
    <RigidBody type="fixed">
      <CuboidCollider args={ [ boundaryWidth, arenaHeight, gridSize/2 ] } position={ [ - (gridSize/2 + boundaryWidth), arenaHeight, 0 ] } /> {/* Top Left */}
      <CuboidCollider args={ [ gridSize/2, arenaHeight, boundaryWidth ] } position={ [ 0, arenaHeight, (gridSize/2 + boundaryWidth) ] } />  {/* Bottom Left */}
      <CuboidCollider args={ [ gridSize/2, arenaHeight, boundaryWidth ] } position={ [ 0, arenaHeight, - (gridSize/2 + boundaryWidth) ] } /> {/* Top Right */}
      <CuboidCollider args={ [ boundaryWidth, arenaHeight, gridSize/2 ] } position={ [ (gridSize/2 + boundaryWidth), arenaHeight, 0 ] } /> {/* Bottom Right */}
    </RigidBody>
    {/* Second Box on Board */}
    <RigidBody >
      <mesh position={[-0.5,3.5,-0.5]} rotation={[-((Math.PI/2)),0,0]}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color={'#3131e3'} />
      </mesh>
    </RigidBody>

    </>
  )
}

