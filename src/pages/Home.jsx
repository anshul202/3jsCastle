import {Suspense, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../Components/Loader'
import Island from '../models/island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'

{/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
  POPUOP
</div> */}
const Home = () => {
  const [isRotating,setIsRotating]=useState(false);
  const [currentStage,setCurrentStage]=useState(0);

  const adjustIslandforScreenSize=()=>{
    let screenscale=null;
    let screenposition=[0,-6.5,-43]
    let rotation=[0.1,4.7,0];
    if(window.innerWidth<768){
      screenscale=[0.9,0.9,0.9];
    }else{
      screenscale=[1,1,1];
    }
    return [screenscale,screenposition,rotation];
  }

  const adjustPlaneforScreenSize=()=>{
    let screenscale,screenposition;
  
    if(window.innerWidth<768){
      screenscale=[1.5,1.5,1.5];
      screenposition=[0,-1.5,0];
    }else{
      screenscale=[3,3,3];
      screenposition=[0,-4,-4]
    }
    return [screenscale,screenposition];
  }
  const [planeScale,planePosition]=adjustPlaneforScreenSize();
  const [islandscale,islandposition,islandrotation]=adjustIslandforScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating?'cursor-grabbing':'cursor-grab'}`}
      camera={{near:0.1,far:1000,}}
      >
        <Suspense fallback={<Loader/>}>
          <directionalLight position={[1,1,1]} intensity={2}/>
          <ambientLight intensity={0.5}/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
          <Bird/>
          <Sky/>
        <Island
        position={islandposition}
        scale={islandscale}
        rotation={islandrotation}
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        setCurrentStage={setCurrentStage}
        /> 
        <Plane
        isRotating={isRotating}
        planePosition={planePosition}
        planeScale={planeScale}
        rotation={[0,20,0]}

        />
        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home