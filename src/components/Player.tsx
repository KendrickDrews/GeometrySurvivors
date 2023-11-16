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
    d: false
  }
  const player = useRef<RapierRigidBody>(null!)
  
    useFrame((_state, delta) => {
      
      if (keyMap.w) {
        player.current.applyImpulse( { x: 0, y: 0, z: -1 } , true);
      }
      if (keyMap.s) {
        player.current.applyImpulse( { x: 0, y: 0, z: 1 } , true);
      }
      if (keyMap.a) {
        player.current.applyImpulse( { x: -1, y: 0, z: 0 } , true);
      }
      if (keyMap.d) {
        player.current.applyImpulse( { x: 1, y: 0, z: 0 } , true);
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
        <RigidBody ref={player}>
          <mesh  position={[0,0.6,0]} rotation={[-((Math.PI/2)),0,0]}>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={'#8181e3'} />
          </mesh>
        </RigidBody>
    )
  }
  
  