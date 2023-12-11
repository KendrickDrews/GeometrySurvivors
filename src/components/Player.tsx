import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'
import { TextureLoader } from 'three'


export default function Player() {
  const colorMap = useLoader(TextureLoader, 'src/imgs/Cube-Map.png')
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

  let cameraAngle = 0;
  
  const player = useRef<RapierRigidBody>(null!);
  const isOnFloor = useRef(true);
  const speedModifiyer = 1;
  const jumpModifiyer = 3;

  const playerControls = (delta: number, xAngle: number, zAngle: number) => {
    const playerSpeed = speedModifiyer * (delta * 10)
    // Leaving this here for potential other modifiers in the future
    const jumpForce = jumpModifiyer
    // Double axis influence makes 45 Degree's be Up,Down,Left,Right. Rotate entire scene to change this
    if (keyMap.w) {
      player.current.applyImpulse( { x: -playerSpeed * xAngle, y: 0, z: -playerSpeed * zAngle } , true); // x: Math.cos(cameraAngle) * playerSpeed, y..., z: Math.sin(cameraAngle) * playerSpeed
    }
    if (keyMap.s) {
      player.current.applyImpulse( { x: playerSpeed * xAngle, y: 0, z: playerSpeed * zAngle } , true);
    }
    if (keyMap.a) {
      player.current.applyImpulse( { x: -playerSpeed * zAngle, y: 0, z: playerSpeed * xAngle } , true);
    }
    if (keyMap.d) {
      player.current.applyImpulse( { x: playerSpeed * zAngle, y: 0, z: -playerSpeed * xAngle }, true);
    }
    if (keyMap.q) {
      // Rotate Camera Counter ClockWise
      cameraAngle += Math.PI/180
    }
    if (keyMap.e) {
      // Rotate Camera ClockWise.
      cameraAngle -= Math.PI/180
    }
    if (keyMap.jump) {
      if (jumpCount > 0) {
        player.current.applyImpulse( { x: 0, y: jumpForce, z: 0 }, true )
      }
    }
  }
    const meshRef = useRef<THREE.Mesh>(null!)
    const playerVector = new THREE.Vector3(0, 0, 0);
    const cameraOffset = 25
    

    useFrame((_state, delta) => {
      const cameraRotationX = Math.sin(cameraAngle)
      const cameraRotationZ = Math.cos(cameraAngle)
      playerControls(delta, cameraRotationX, cameraRotationZ)
      // get mouse Coords
      const mouseX = _state.pointer.x
      const mouseY = _state.pointer.y
      const mouseTheta = Math.atan2(mouseY, mouseX)
      // Camera Follows Player from fixed position
      const playerPos = player.current.translation();
      
      _state.camera.lookAt(playerPos.x, 0, playerPos.z)
      _state.camera.position.lerp(playerVector.set(playerPos.x + cameraOffset * cameraRotationX, cameraOffset, playerPos.z + cameraOffset * cameraRotationZ), 0.1)
      _state.camera.updateProjectionMatrix();


      

      meshRef.current.rotation.set(0, mouseTheta + cameraAngle, 0 )

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
          <mesh ref={meshRef}  position={[0,0.6,0]} rotation={[0,0,0]} castShadow>
              <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={'#8181e3'} map={colorMap} />
          </mesh>
        </RigidBody>
    )
  }
  
  