// import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// import { useKeyboardControls } from '@react-three/drei'
import { Mesh } from 'three'


export default function Player() {
  // Consider making a Map which accounts for different keys to use for the same function
  const keyMap: { [key: string]: boolean } = {
    w: false,
    s: false,
    a: false,
    d: false
  }


  const player = useRef<Mesh>(null!)
  
    useFrame((_state, delta) => {
      
      if (keyMap.w) {
        player.current.position.z -= delta * 1;
      }
      if (keyMap.s) {
        player.current.position.z += delta * 1;
      }
      if (keyMap.a) {
        player.current.position.x -= delta * 1;
      }
      if (keyMap.d) {
        player.current.position.x += delta * 1;
      }
    })

    const keyPress = (e: KeyboardEvent) => {
      keyMap[e.key] = true;
      }
    const keyUp = (e: KeyboardEvent) => {
      keyMap[e.key] = false;
    }
    
    useEffect(() => {
      
      document.addEventListener('keydown', keyPress, true)
      document.addEventListener('keyup', keyUp, true)
      // Return and remove Keydown under conditions in which we no longer want to give the player control
      return () => {
        window.removeEventListener('keydown', keyPress)
        window.removeEventListener('keyup', keyUp,)
      }
    },[])

    return (
      <mesh ref={player} position={[0,0.5,0]} rotation={[-((Math.PI/2)),0,0]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={'#8181e3'} />
      </mesh>
    )
  }
  
  