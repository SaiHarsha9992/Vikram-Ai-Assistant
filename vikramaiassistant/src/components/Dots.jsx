import { Box, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import React from "react";
export const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return "Vikram's World";
          }
          return loadingText + "Vikram's World";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("Vikram's World");
    }
  }, [loading]);
  if (loading) return null;
  return (
    <Text
      fontSize={2.14}
      anchorX={"left"}
      anchorY={"bottom"}
      position={[0, 2, 0]}
      args={[1, 1, 1]}
      scale={[1, 1, 1]}
    >
      {loadingText}
      <meshBasicMaterial attach="material" color="white" />
    </Text>
  );
};
