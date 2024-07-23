import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Room(props) {
  const { nodes, materials } = useGLTF("/models/Room.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[-6.943, 1.681, -6.589]} scale={0.025}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bluelights001.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hallway002.geometry}
          material={materials.black}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.whitelights001.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[-6.9, 1.508, -8.889]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue002.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door002.geometry}
          material={materials.black}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white003.geometry}
          material={materials.white}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group position={[-6.922, 1.633, -1.561]} scale={0.025}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue003.geometry}
          material={materials.blue}
          position={[-350.17, -68.32, 666.442]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.glass001.geometry}
          material={materials.Glass}
          position={[-350.17, -68.32, 666.442]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.T002.geometry}
          material={materials.black}
          position={[-350.17, -68.32, 666.442]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white004.geometry}
          material={materials.blue}
          position={[-350.17, -68.32, 666.442]}
        />
      </group>
      <group
        position={[-15.001, 1.595, -0.835]}
        rotation={[0, -1.571, 0]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue004.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door003.geometry}
          material={materials.black}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white005.geometry}
          material={materials.white}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group position={[8.649, 1.579, 7.172]} scale={0.025}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue005.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door004.geometry}
          material={materials.black}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white007.geometry}
          material={materials.white}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[12.555, 1.676, -0.844]}
        rotation={[0, 1.571, 0]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue006.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door005.geometry}
          material={materials.black}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white008.geometry}
          material={materials.white}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[8.65, 1.68, -4.793]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.blue007.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.door006.geometry}
          material={materials.black}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white009.geometry}
          material={materials.blue}
          position={[-237.105, -21.016, 34.741]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[-12.651, 1.669, -0.833]}
        rotation={[0, 1.571, 0]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bluelights002.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hallway003.geometry}
          material={materials.black}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.whitelights002.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[-1.244, 1.661, -0.833]}
        rotation={[0, 1.571, 0]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bluelights003.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hallway004.geometry}
          material={materials.black}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.whitelights003.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[2.919, 1.661, -0.833]}
        rotation={[0, -1.571, 0]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bluelights004.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hallway005.geometry}
          material={materials.black}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.whitelights004.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group
        position={[8.626, 1.7, 4.905]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.025}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bluelights005.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hallway006.geometry}
          material={materials.black}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.whitelights005.geometry}
          material={materials.blue}
          position={[-0.629, -25.477, 29.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.171, 1.171, 1]}
        />
      </group>
      <group position={[8.651, 1.658, -0.876]} scale={0.025}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plus002.geometry}
          material={materials.black}
          position={[-723.315, -68.32, 637.984]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.red001.geometry}
          material={materials.blue}
          position={[-723.315, -68.32, 637.984]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white006.geometry}
          material={materials.blue}
          position={[-723.315, -68.32, 637.984]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Room.glb");
