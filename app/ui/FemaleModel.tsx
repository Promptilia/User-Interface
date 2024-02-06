"use client";

import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";

type Props = {};

const Model = () => {
  const femaleModel = useFBX("/model/female-model.fbx");

  femaleModel.castShadow = true;
  femaleModel.rotation.x = -190;
  femaleModel.rotation.y = 0;
  femaleModel.rotation.z = 0;
  femaleModel.position.set(0, -2, -8);
  femaleModel.lookAt(2, 60, 10);

  console.log(femaleModel.animations);

  return <primitive object={femaleModel} scale={0.05} />;
};

const FemaleModel = (props: Props) => {
  return (
    <>
      <Canvas shadows>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
        />
        <OrbitControls rotateSpeed={1} />
        <Suspense fallback={null}>
          <Model />
          {/* <Environment preset="studio" background /> */}
        </Suspense>
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Canvas>
    </>
  );
};

export default FemaleModel;
