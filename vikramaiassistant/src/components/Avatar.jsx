/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { useChat } from "../hooks/useChat";

const facialExpressions = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.1700000727403593,
    noseSneerRight: 0.14000002836874015,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41000000000000003,
  },
  funnyFace: {
    jawLeft: 0.43,
    mouthPucker: 0.53,
    noseSneerLeft: 0.39,
    noseSneerRight: 0.39,
    mouthLeft: 0.5,
    eyeLookUpLeft: 0.4,
    eyeLookUpRight: 0.4,
    cheekPuff: 0.6,
    mouthDimpleLeft: 0.45,
    mouthRollLower: 0.62,
    mouthSmileLeft: 0.35499733688813034,
    mouthSmileRight: 0.35499733688813034,
  },
  sad: {
    mouthFrownLeft: 1,
    mouthFrownRight: 1,
    mouthShrugLower: 0.3,
    browInnerUp: 0.452,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.3,
    eyeLookDownRight: 0.3,
    jawForward: 1,
  },
  surprised: {
    eyeWideLeft: 0.5,
    eyeWideRight: 0.5,
    jawOpen: 0.151,
    mouthFunnel: 0.5,
    browInnerUp: 1,
  },
  angry: {
    browDownLeft: 1,
    browDownRight: 1,
    eyeSquintLeft: 1,
    eyeSquintRight: 1,
    jawForward: 1,
    jawLeft: 1,
    mouthShrugLower: 1,
    noseSneerLeft: 0.2,
    noseSneerRight: 0.2,
    eyeLookDownLeft: 0.1,
    eyeLookDownRight: 0.1,
    cheekSquintLeft: 0.25,
    cheekSquintRight: 0.25,
    mouthClose: 0.02,
    mouthFunnel: 0.5,
    mouthDimpleRight: 0.126,
  },
  crazy: {
    browInnerUp: 0.9,
    jawForward: 1,
    noseSneerLeft: 0.5700000000000001,
    noseSneerRight: 0.51,
    eyeLookDownLeft: 0.39435766259644545,
    eyeLookUpRight: 0.4039761421719682,
    eyeLookInLeft: 0.9618479575523053,
    eyeLookInRight: 0.9618479575523053,
    jawOpen: 0.1918479575523053,
    mouthDimpleLeft: 0.9618479575523053,
    mouthDimpleRight: 0.9618479575523053,
    mouthStretchLeft: 0.27893590769016857,
    mouthStretchRight: 0.2885543872656917,
    mouthSmileLeft: 0.5578718153803371,
    mouthSmileRight: 0.38473918302092225,
    tongueOut: 0.9618479575523053,
  },
};

//This corresponding for lip values for lip sync
const corresponding = {
  A: "PP",
  B: "kk",
  C: "ih",
  D: "DD",
  E: "E",
  F: "FF",
  G: "E",
  H: "TH",
  I: "ih",
  J: "aa",
  K: "E",
  L: "sil",
  N: "nn",
  O: "oh",
  P: "PP",
  Q: "ou",
  R: "RR",
  S: "SS",
  T: "TH",
  U: "ou",
  V: "ih",
  W: "ou",
  X: "PP",
  Y: "sil",
};

//In this avatar function we can manuplate the character
export function Avatar(props) {
  const { nodes, materials, scene } = useGLTF("/models/Original Vikram.glb"); // 3d character in glb file to use in webpage
  const animationType = props.animation;
  console.log(animationType);
  const { message, onMessagePlayed, chat, setAnswerText } = useChat(); // the message object and chat

  const [lipsync, setLipsync] = useState();
  useEffect(() => {
    if (animationType === "loading") {
      setAnimation("Agreeing");
    }
  }, [animationType]);
  //For setting the message text and audio file, lip sync json file, onended of audio file, set new facial expression
  useEffect(() => {
    //Every Time the message is not sended the animation default idle and default facial expression
    if (!message) {
      setAnimation("Idle");
      setFacialExpression("default");
      return;
    }
    setAnswerText((prevMessage) => prevMessage + message.text);
    setAnimation(message.animation);
    setFacialExpression(message.facialExpression);
    setLipsync(message.lipsync);
    const audio = new Audio("data:audio/mp3;base64," + message.audio);
    audio.play();
    setAudio(audio);
    audio.onended = onMessagePlayed;
  }, [message]);

  //set animation from output of mixamo fbx files to animate
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: angryAnimation } = useFBX("/animations/Angry.fbx");
  const { animations: cryingAnimation } = useFBX("/animations/Crying.fbx");
  const { animations: DanceAnimation } = useFBX("/animations/Dance.fbx");
  const { animations: laughAnimation } = useFBX("/animations/Laughing.fbx");
  const { animations: Talking_0Animation } = useFBX(
    "/animations/Talking_0.fbx"
  );
  const { animations: Talking_1Animation } = useFBX(
    "/animations/Talking_1.fbx"
  );
  const { animations: Talking_2Animation } = useFBX(
    "/animations/Talking_2.fbx"
  );
  const { animations: argueAnimation } = useFBX("/animations/Arguing.fbx");
  const { animations: fightAnimation } = useFBX("/animations/Fight.fbx");
  const { animations: agreeAnimation } = useFBX("/animations/Agreeing.fbx");
  //Changing the animations name to specify easily with one word
  idleAnimation[0].name = "Idle";
  angryAnimation[0].name = "Angry";
  cryingAnimation[0].name = "Crying";
  DanceAnimation[0].name = "Dance";
  laughAnimation[0].name = "Laughing";
  Talking_0Animation[0].name = "Talking_0";
  Talking_1Animation[0].name = "Talking_1";
  Talking_2Animation[0].name = "Talking_2";
  argueAnimation[0].name = "Argue";
  fightAnimation[0].name = "Fight";
  agreeAnimation[0].name = "Agreeing";

  //arranging the all animations into the one array of named animations
  const animations = useMemo(() => {
    return [
      useFBX("/animations/Idle.fbx"),
      useFBX("/animations/Angry.fbx"),
      useFBX("/animations/Crying.fbx"),
      useFBX("/animations/Dance.fbx"),
      useFBX("/animations/Laughing.fbx"),
      useFBX("/animations/Talking_0.fbx"),
      useFBX("/animations/Talking_1.fbx"),
      useFBX("/animations/Talking_2.fbx"),
      useFBX("/animations/Arguing.fbx"),
      useFBX("/animations/Fight.fbx"),
      useFBX("/animations/Agreeing.fbx"),
    ].map(({ animations }) => animations[0]);
  }, []);

  //It is used to reference the character group it will consits of all elements in 3d character
  const group = useRef();

  //It uses the actions with using useAnimatiions as a group of animate the character
  const { actions, mixer } = useAnimations(animations, group);

  //Set animation of the character by taking a hook
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === "Idle") ? "Idle" : animations[0].name // Check if Idle animation exists otherwise use first animation
  );

  //It uses to animate the character by using useEffect function and if changed by using fadein or fadeout
  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  //This function uses to change the values of the character by providing from the character
  const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        //Changing the value and the seting the speed of the character
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );
      }
    });
  };

  //Variable uses for blink, wink left , wink right, facial expression, audio
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [facialExpression, setFacialExpression] = useState("");
  const [audio, setAudio] = useState();

  //This is uses for facialExpression of the character using lerpmorphtarget
  useFrame(() => {
    Object.keys(nodes.AvatarHead.morphTargetDictionary).forEach((key) => {
      const mapping = facialExpressions[facialExpression];
      if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
        return; // eyes wink/blink are handled separately
      }
      if (mapping && mapping[key]) {
        lerpMorphTarget(key, mapping[key], 0.1); // Changing  the valus of the facial expression
      } else {
        lerpMorphTarget(key, 0, 0.1); // Or if not value will be 0
      }
    });

    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5); // Eye blink left of the character
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5); // Eye blink right of the character

    //What morphTargets is changed is stored to the appliedMorphtargets array
    const appliedMorphTargets = [];

    //by using the if condition we can change the corresponding array of mouth values
    if (message && lipsync) {
      const currentAudioTime = audio.currentTime;

      //Loop through the array of lipsync
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (
          currentAudioTime >= mouthCue.start &&
          currentAudioTime <= mouthCue.end
        ) {
          //If audio is playing then the mouth should be perform with the audio
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 0.8, 0.2);
          break;
        }
      }
    }

    //After using the audio and lipsync it changes the values to default values
    Object.values(corresponding).forEach((value) => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  //Blinking timeout the change the facial eye values
  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  //Returning the avatar group as the avatar performs in webpage
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature001"
          position={[0.006, -0.013, -0.072]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <skinnedMesh
            frustumCulled={false}
            name="AvatarEyelashes"
            geometry={nodes.AvatarEyelashes.geometry}
            material={materials["AvatarEyelashes.001"]}
            skeleton={nodes.AvatarEyelashes.skeleton}
            morphTargetDictionary={nodes.AvatarEyelashes.morphTargetDictionary}
            morphTargetInfluences={nodes.AvatarEyelashes.morphTargetInfluences}
          />
          <skinnedMesh
            frustumCulled={false}
            name="AvatarHead"
            geometry={nodes.AvatarHead.geometry}
            material={materials.AvatarHead}
            skeleton={nodes.AvatarHead.skeleton}
            morphTargetDictionary={nodes.AvatarHead.morphTargetDictionary}
            morphTargetInfluences={nodes.AvatarHead.morphTargetInfluences}
          />
          <skinnedMesh
            frustumCulled={false}
            name="AvatarLeftEyeball"
            geometry={nodes.AvatarLeftEyeball.geometry}
            material={materials["AvatarLeftEyeball.002"]}
            skeleton={nodes.AvatarLeftEyeball.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="AvatarRightEyeball"
            geometry={nodes.AvatarRightEyeball.geometry}
            material={materials["AvatarRightEyeball.002"]}
            skeleton={nodes.AvatarRightEyeball.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="AvatarTeethLower"
            geometry={nodes.AvatarTeethLower.geometry}
            material={materials["AvatarTeethLower.002"]}
            skeleton={nodes.AvatarTeethLower.skeleton}
            morphTargetDictionary={nodes.AvatarTeethLower.morphTargetDictionary}
            morphTargetInfluences={nodes.AvatarTeethLower.morphTargetInfluences}
          />
          <skinnedMesh
            frustumCulled={false}
            name="AvatarTeethUpper"
            geometry={nodes.AvatarTeethUpper.geometry}
            material={materials["AvatarTeethUpper.002"]}
            skeleton={nodes.AvatarTeethUpper.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials["Wolf3D_Outfit_Bottom.002"]}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials["Wolf3D_Outfit_Footwear.002"]}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials["Wolf3D_Outfit_Top.002"]}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Original Vikram.glb");