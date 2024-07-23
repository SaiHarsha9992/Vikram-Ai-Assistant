import {
  Box,
  CameraControls,
  ContactShadows,
  Environment,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import { Room } from "./Room";
import React from "react";
import { Dots } from "./Dots";

export const Experience = () => {
  const cameraControls = useRef();
  const { loading, cameraZoomed, slideChat } = useChat();
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(
        0.009604356793197493,
        0.1022204415256278,
        -1.7603163815703622,
        0,
        1,
        0,
        true
      );
    } else {
      cameraControls.current.setLookAt(
        0.12046239760895218,
        -0.21268364290033806,
        -7.875123405491535,
        0,
        1.0,
        0,
        true
      );
    }
  }, [cameraZoomed]);

  useEffect(() => {
    if (loading) {
      // Set animation to a loading state, e.g., spinning dots or similar
      setAnimation("loading");
    } else {
      setAnimation("");
    }
  }, [loading]);

  const [slidePosition, setSlidePosition] = useState([0, 0, -0.5]);
  useEffect(() => {
    if (slideChat) {
      setSlidePosition([0.3, 0, -0.5]);
      console.log("clicked");
    } else {
      setSlidePosition([0, 0, -0.5]);
    }
  }, [slideChat]);

  return (
    <>
      <Suspense fallback={null}>
        <Dots />
      </Suspense>
      <mesh position={[0, -1.5, 0]}>
        <CameraControls ref={cameraControls} />
        <OrbitControls />
        <Environment files="/src/assets/background.hdr" background />
        <ambientLight intensity={0.5} />
        <Room position-y={-0.19} position-x={-8.61} position-z={-4} />
        <Avatar
          rotation-y={Math.PI}
          animation={animation}
          position={slidePosition}
        />
        <ContactShadows opacity={0.7} />
      </mesh>
    </>
  );
};
