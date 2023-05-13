/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: re1monsen (https://sketchfab.com/re1monsen)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/crate-container-500-followers-encore-57e9c71005fd490898123fece16ccf60
title: Crate - Container - 500 Followers Encore
*/

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

export default function Model({ ...props }) {
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    setAudio(new Audio("/open-chest.mp3"));
    // only run once on the first render on the client
  }, []);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/crate2-transformed.glb");

  const actions = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((state, delta) => mixer.update(delta));
  useEffect(() => {
    actions.current = {
      ArmatureAction: mixer.clipAction(animations[0], group.current),
    };
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  // function for the chest open & audio
  const handleAnimation = () => {
    props.setOpen(!props.open);
    audio.volume = 0.3;
    audio.play();
  };

  //rotation={[-Math.PI / 2, 0, 0]}
  // Chest open animation
  const chestOpen = useSpring({
    rotation: props.open ? [0, 0, 0] : [1.61, 0, 0],
    position: props.open ? [0, -1.5, 0] : [0, 0, 0],
  });

  return (
    <group onClick={handleAnimation} ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <a.group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.05}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="crate001_low_1" position={[0, -2.5, 0]} scale={7}>
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate006_low_7" position={[0, -2.5, 0]} scale={7}>
                <mesh
                  name="Object_18"
                  geometry={nodes.Object_18.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate007_low_8" position={[0, -2.5, 0]} scale={7}>
                <mesh
                  name="Object_20"
                  geometry={nodes.Object_20.geometry}
                  material={materials.crate}
                />
              </group>
              <group
                name="crate001_low001_15"
                position={[8.16, 4.4, -34.68]}
                rotation={[-0.01, 0.01, -1.65]}
                scale={7}
              >
                <mesh
                  name="Object_34"
                  geometry={nodes.Object_34.geometry}
                  material={materials.crate}
                />
              </group>
              <group
                name="crate001_low002_16"
                position={[-51.4, -9.73, 0.05]}
                rotation={[2.47, 0.05, 2.56]}
                scale={7}
              >
                <mesh
                  name="Object_36"
                  geometry={nodes.Object_36.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="ground_low_0" position={[-1.11, 23.81, 0]} scale={7}>
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.ground}
                />
              </group>
              <group name="crate004_low_2" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_8"
                  geometry={nodes.Object_8.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate002_low_3" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_10"
                  geometry={nodes.Object_10.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate003_low_4" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_12"
                  geometry={nodes.Object_12.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate005_low_5" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_14"
                  geometry={nodes.Object_14.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate_low_6" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_16"
                  geometry={nodes.Object_16.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate008_low_9" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_22"
                  geometry={nodes.Object_22.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate009_low_10" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_24"
                  geometry={nodes.Object_24.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate010_low_11" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_26"
                  geometry={nodes.Object_26.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate011_low_12" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_28"
                  geometry={nodes.Object_28.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate012_low_13" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_30"
                  geometry={nodes.Object_30.geometry}
                  material={materials.crate}
                />
              </group>
              <group name="crate013_low_14" position={[0, -2.51, 0]} scale={7}>
                <mesh
                  name="Object_32"
                  geometry={nodes.Object_32.geometry}
                  material={materials.crate}
                />
              </group>
            </group>
          </group>
        </a.group>
      </group>
    </group>
  );
}

// useGLTF.preload("/crate2-transformed.glb");