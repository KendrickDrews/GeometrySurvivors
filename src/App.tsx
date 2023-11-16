import './App.css'
import * as THREE from 'three'
// import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import GameBoard from './components/GameBoard'
import Player from './components/Player'

const kBoardControls = [
  { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
  { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
  { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
  { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
  { name: 'jump', keys: [ 'Space' ] },
]

function App() {
  // const [count, setCount] = useState(0)
  // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  return (
    <KeyboardControls map={kBoardControls} > 
      <Canvas onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }} camera={{ position: [20, 15, 20], fov: 26 }}>
        <ambientLight intensity={2.5}/>
        <pointLight position={[10, 10, 10]} intensity={10} color={[1,1,1]}/>
        <Player />
        <GameBoard />
        {/* <PerspectiveCamera makeDefault position={[0, 0, 18.5]} /> */}
      </Canvas>
    </KeyboardControls>
  )
}

export default App
