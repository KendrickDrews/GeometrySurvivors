// import * as THREE from 'three'
// import { useRef, useState } from 'react'
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'


export default function Player() {
    // const [count, setCount] = useState(0)
  
    return (
      <mesh position={[0,0.5,0]} rotation={[-((Math.PI/2)),0,0]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={'#8181e3'} />
      </mesh>
    )
  }
  
  