import { Loader } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import { UI } from "./components/UI";
import { Experience } from "./components/Experience";
import React from "react";

function CameraLogger() {
  return null;
}

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas
        shadows
        camera={{
          position: [
            -0.12997444433682795, 1.404984936444132, -3.8133035866435305,
          ],
          fov: 30,
        }}
      >
        <CameraLogger />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
