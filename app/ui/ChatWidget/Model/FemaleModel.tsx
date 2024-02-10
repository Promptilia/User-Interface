"use client";

import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
} from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import { Converse, StartPrompt } from "../Conversation/Conversation";
import { Message } from "../Interfaces";

type Props = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setProductName: Dispatch<SetStateAction<string>>;
};

const Model = ({ setMessages, setProductName }: Props) => {
  const femaleModel = useFBX("/model/female-model.fbx");

  useEffect(() => {
    const loadModel = async () => {
      if (femaleModel) {
        femaleModel.castShadow = true;
        femaleModel.rotation.x = -190;
        femaleModel.rotation.y = 0;
        femaleModel.rotation.z = 0;
        femaleModel.position.set(0, -2, -8);
        femaleModel.lookAt(2, 60, 10);

        console.log(femaleModel.animations);

        await Converse(
          setMessages,
          setProductName,
          StartPrompt,
          "🙇 Sorry Shop is closed, come after some time."
        );
      }
    };

    loadModel();
  }, [femaleModel]);

  return <primitive object={femaleModel} scale={0.05} />;
};

const FemaleModel = ({ setMessages, setProductName }: Props) => {
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
          <Model setMessages={setMessages} setProductName={setProductName} />
          <Environment preset="city" background />
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
