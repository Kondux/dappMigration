/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import {
  useGLTF,
  useAnimations,
  Glow,
  Sparkles,
  Billboard,
  SpotLight,
  useDepthBuffer,
} from "@react-three/drei";
import { useThree, useFrame, useTexture } from "@react-three/fiber";
import { LayerMaterial, Depth } from "lamina";

export default function Animbox({ ...props }) {
  const [amountClick, setAmountClick] = useState(false);
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/GoldBox-transformed.glb");
  const { actions } = useAnimations(animations, group);

  useFrame((state, delta) => {
    group.current.rotation.y = group.current.rotation.x += 0.01;
  });

  // console.log(actions);

  const handleAnimation = () => {
    if (amountClick === false) {
      props.setOpen(!props.open);
      actions["cube_001_Anim_0"].setLoop(THREE.LoopOnce);
      actions["cube_001_Anim_0"].clampWhenFinished = true;
      actions["cube_001_Anim_0"].play();
      console.log("THIS IS AMOUNTCLICKED", amountClick);
      setAmountClick(true);
    }
    console.log("THIS IS AMOUNTCLICKED", amountClick);
    // audio.volume = 0.4;
    // audio.play();
  };

  const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
    <Billboard>
      <mesh>
        {/* <circleGeometry args={[2 * scale, 16]} /> */}
        <LayerMaterial
          transparent
          depthWrite={false}
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendSrc={THREE.SrcAlphaFactor}
          blendDst={THREE.DstAlphaFactor}
        >
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="normal"
            near={near * scale}
            far={far * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={0.5}
            mode="add"
            near={-40 * scale}
            far={far * 1.2 * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-15 * scale}
            far={far * 0.7 * scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-10 * scale}
            far={far * 0.68 * scale}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </mesh>
    </Billboard>
  );

  function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
    const light = useRef();
    const viewport = useThree((state) => state.viewport);
    useFrame((state) => {
      light.current.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          (state.mouse.y * viewport.height) / 2,
          0
        ),
        0.1
      );
      light.current.target.updateMatrixWorld();
    });
    return (
      <SpotLight
        castShadow
        ref={light}
        penumbra={1}
        distance={6}
        angle={0.35}
        attenuation={5}
        anglePower={4}
        intensity={2}
        {...props}
      />
    );
  }

  return (
    <group onClick={handleAnimation} ref={group} {...props} dispose={null}>
      <group>
        <group name="node0">
          <primitive object={nodes.the_box_for_fbx_export} />
        </group>
        <group name="node0_1">
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive0"
            geometry={nodes.node0_primitive0.geometry}
            material={materials.GREY}
            skeleton={nodes.node0_primitive0.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive1"
            geometry={nodes.node0_primitive1.geometry}
            material={materials.Glass01}
            skeleton={nodes.node0_primitive1.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive2"
            geometry={nodes.node0_primitive2.geometry}
            material={materials.Gold_Raw}
            skeleton={nodes.node0_primitive2.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive3"
            geometry={nodes.node0_primitive3.geometry}
            material={materials.Material_002}
            skeleton={nodes.node0_primitive3.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive4"
            geometry={nodes.node0_primitive4.geometry}
            material={materials.Material_003}
            skeleton={nodes.node0_primitive4.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="node0_primitive5"
            geometry={nodes.node0_primitive5.geometry}
            material={materials.Glass_3}
            skeleton={nodes.node0_primitive5.skeleton}
          />
          <Sparkles
            count={100}
            scale={15 * 2}
            size={30}
            speed={0.1}
            color="lightgreen"
          />
          <MovingSpot
            depthBuffer={{ frames: 1 }}
            color="green"
            position={[3, 3, 2]}
          />
          <MovingSpot
            depthBuffer={{ frames: 1 }}
            color="green"
            position={[1, 3, 0]}
          />
          <Glow scale={10 * 1.2} near={-25} color={"green"} />
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/GoldBox-transformed.glb");