/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Micheal-Holloway (https://sketchfab.com/Micheal-Holloway)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/techno-chest-5c08fb77246c428791bb4f8786b7c459
title: Techno Chest
*/

import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

export default function Model({ ...props }) {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(new Audio("/open-chest.mp3"));
    // only run once on the first render on the client
  }, []);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/crate.glb");
  const actions = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((state, delta) => mixer.update(delta));
  useEffect(() => {
    actions.current = {
      ArmatureAction: mixer.clipAction(animations[1], group.current),
    };
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer]);

  // function for the chest open & audio
  const handleAnimation = () => {
    props.setOpen(!props.open);
    audio.volume = 0.3;
    audio.play();
  };

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
          position={[0, -0.99, 0]}
          rotation={chestOpen.position}
          scale={0.5}
        >
          <group name="Root">
            <group name="Armature" position={[-2.16, -1.04, 1.44]}>
              <a.primitive
                rotation={chestOpen.rotation}
                object={nodes.Armature_rootJoint}
              />
              <group
                name="Cube"
                position={[2.16, 1.04, -0.32]}
                scale={[1, 2.64, 0.33]}
              >
                <mesh
                  name="Cube_4"
                  geometry={nodes.Cube_4.geometry}
                  material={materials["Material.006"]}
                />
              </group>
              <skinnedMesh
                castShadow
                receiveShadow
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials.Material}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Cube_1"
                geometry={nodes.Cube_1.geometry}
                material={materials.Black_Rim}
                skeleton={nodes.Cube_1.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Cube_2"
                geometry={nodes.Cube_2.geometry}
                material={materials.Emmissive_bits}
                skeleton={nodes.Cube_2.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Cube_3"
                geometry={nodes.Cube_3.geometry}
                material={materials.Top_lid}
                skeleton={nodes.Cube_3.skeleton}
              />
            </group>
            <group
              name="Lamp"
              position={[4.08, -4.21, 5.04]}
              rotation={[-0.27, 0.6, 1.93]}
            >
              <group name="Lamp_1" />
            </group>
          </group>
        </a.group>
      </group>
    </group>
  );
}

// useGLTF.preload("/crate.glb");
