// import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'


export default function Player() {

  // Consider making a Map which accounts for different keys to use for the same function
  const keyMap: { [key: string]: boolean } = {
    w: false,
    s: false,
    a: false,
    d: false,
    jump: false,
  }
  const player = useRef<RapierRigidBody>(null!)
  const playerControls = () => {
    // Double axis influence makes 45 Degree's be Up,Down,Left,Right. Rotate entire scene to change this
    if (keyMap.w) {
      player.current.applyImpulse( { x: -1, y: 0, z: -1 } , true);
    }
    if (keyMap.s) {
      player.current.applyImpulse( { x: 1, y: 0, z: 1 } , true);
    }
    if (keyMap.a) {
      player.current.applyImpulse( { x: -1, y: 0, z: 1 } , true);
    }
    if (keyMap.d) {
      player.current.applyImpulse( { x: 1, y: 0, z: -1 }, true);
    }
    if (keyMap.jump) {
      player.current.applyImpulse( { x: 0, y: 1, z: 0 }, true )
    }
  }
  
    useFrame((_state, delta) => {
      playerControls()
      
    })

    const keyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        keyMap['jump'] = true
      }
      keyMap[e.key] = true;
      }
    const keyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        keyMap['jump'] = false
      }
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
        <RigidBody ref={player}>
          <mesh  position={[0,0.6,0]} rotation={[-((Math.PI/2)),0,0]} castShadow>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={'#8181e3'} />
          </mesh>
        </RigidBody>
    )
  }
  
  