import React from 'react'
import { useGLTF } from '@react-three/drei'
import skyscene from '../assets/3d/sky.glb'

const Sky = () => {
    const sky=useGLTF(skyscene);
  return (
    <mesh>
        <primitive object={sky.scene}/>
    </mesh>
  )
}

export default Sky