import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'


export default function Player() {
  let jumpCount = 1;

  // Consider making a Map which accounts for different keys to use for the same function ("Keyboard Controls" from pmndrs)
  const keyMap: { [key: string]: boolean } = {
    w: false,
    s: false,
    a: false,
    d: false,
    q: false,
    e: false,
    jump: false,
  }

  const cameraRef = useRef(null!)
  let cameraAngle = 0;
  const player = useRef<RapierRigidBody>(null!);
  const isOnFloor = useRef(true);
  const speedModifiyer = 1;
  const jumpModifiyer = 3;

  const playerControls = (delta: number) => {
    const playerSpeed = speedModifiyer * (delta * 10)
    // Leaving this here for potential other modifiers in the future
    const jumpForce = jumpModifiyer
    // Double axis influence makes 45 Degree's be Up,Down,Left,Right. Rotate entire scene to change this
    if (keyMap.w) {
      player.current.applyImpulse( { x: -playerSpeed, y: 0, z: -playerSpeed } , true); // x: Math.cos(cameraAngle) * playerSpeed, y..., z: Math.sin(cameraAngle) * playerSpeed
    }
    if (keyMap.s) {
      player.current.applyImpulse( { x: playerSpeed, y: 0, z: playerSpeed } , true);
    }
    if (keyMap.a) {
      player.current.applyImpulse( { x: -playerSpeed, y: 0, z: playerSpeed } , true);
    }
    if (keyMap.d) {
      player.current.applyImpulse( { x: playerSpeed, y: 0, z: -playerSpeed }, true);
    }
    if (keyMap.q) {
      // Rotate Camera Counter ClockWise
      cameraAngle -= Math.PI/180
    }
    if (keyMap.e) {
      // Rotate Camera ClockWise.
      cameraAngle += Math.PI/180
    }
    if (keyMap.jump) {
      if (jumpCount > 0) {
        player.current.applyImpulse( { x: 0, y: jumpForce, z: 0 }, true )
      }
    }
  }
  
    const playerVector = new THREE.Vector3(0, 0, 0);
    const cameraOffset = 25

    useFrame((_state, delta) => {
      playerControls(delta)
      const cameraRotationX = Math.sin(cameraAngle)
      const cameraRotationZ = Math.cos(cameraAngle)
      
      // Camera Follows Player from fixed position
      const playerPos = player.current.translation();
      
      _state.camera.lookAt(playerPos.x, 0, playerPos.z)
      _state.camera.position.lerp(playerVector.set((playerPos.x + cameraOffset) * cameraRotationX, cameraOffset, (playerPos.z + cameraOffset) * cameraRotationZ), 0.1)
      // _state.camera.position.x = Math.sin(cameraAngle + cameraOffset) * 8
      // _state.camera.position.z = Math.cos(cameraAngle + cameraOffset) * 8
      _state.camera.updateProjectionMatrix();

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
        <RigidBody ref={player} 
          onCollisionEnter={({other}) => {
            if (other.rigidBodyObject?.name === "floor") {
              isOnFloor.current = true;
              jumpCount = 1
            }
          }}
          onCollisionExit={({other}) => {
            if (other.rigidBodyObject?.name === "floor") {
              isOnFloor.current = false;
              jumpCount = 0
            }
          }}
        >
          <mesh  position={[0,0.6,0]} rotation={[-((Math.PI/2)),0,0]} castShadow>
              <boxGeometry args={[1,1,1]}/>
              <meshStandardMaterial color={'#8181e3'} />
          </mesh>
        </RigidBody>
    )
  }
  
  