import './App.css'
import * as THREE from 'three'
// import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
// import { KeyboardControls } from '@react-three/drei'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import { Physics } from '@react-three/rapier'


function App() {
  // const [count, setCount] = useState(0)
  // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  return (
      <Canvas onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }} camera={{ position: [20, 15, 20], fov: 26 }}>
        <ambientLight intensity={2.5}/>
        <pointLight position={[10, 10, 10]} intensity={10} color={[1,1,1]}/>
        <directionalLight position={[0,1,0]} castShadow color={[1,1,1]} intensity={2}/>
        <Physics debug>
          <Player />
          <GameBoard />
        </Physics>
        {/* <PerspectiveCamera makeDefault position={[0, 0, 18.5]} /> */}
      </Canvas>
  )
}

export default App
