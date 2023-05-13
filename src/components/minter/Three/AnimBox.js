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
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/AnimBox.glb");
  const { actions } = useAnimations(animations, group);

  //   const glowMap = useTexture({
  //     emissiveMap: "/images/glowMap.png",
  // });

  useFrame((state, delta) =>
    group.current
      ? (group.current.rotation.y = group.current.rotation.x += 0.0025)
      : null
  );

  // console.log(actions);
  // function for the chest open & audio
  const handleAnimation = () => {
    props.setOpen(!props.open);
    Object.values(actions).forEach((element) => {
      // console.log(element._clip.name);
      actions[element._clip.name].play();
    });
    // actions["ArmatureAction"].play().reset();
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
      <group name="Scene">
        <group
          name="Armature"
          position={[0.01, -0.22, -0.06]}
          rotation={[-0.75, 0, 0]}
          scale={0.2}
        >
          <primitive object={nodes.FootIKL} />
          <primitive object={nodes.Root} />
          <primitive object={nodes.FootIKR} />
          <primitive object={nodes.KneeIKL} />
          <primitive object={nodes.KneeIKR} />
          <mesh
            name="Cube003"
            geometry={nodes.Cube003.geometry}
            material={materials.Eye}
            position={[0, -2.36, 1.38]}
            scale={0.63}
          />
          <skinnedMesh
            name="Cube001"
            geometry={nodes.Cube001.geometry}
            material={materials.GREY}
            skeleton={nodes.Cube001.skeleton}
          />
        </group>
        <group
          name="Empty"
          position={[0.32, 0.41, 0.31]}
          rotation={[1.8, -0.44, 0.48]}
          scale={0.16}
        >
          <group
            name="Ctrl_bolt_disp"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.41, -0.4, -0.47]}
          />
          <group
            name="BOLT"
            rotation={[-1.44, -0.36, -0.53]}
            scale={[1.14, 1.25, 1.14]}
          />
        </group>
        <group
          name="Empty001"
          position={[0.33, 0.4, -0.32]}
          rotation={[1.34, -0.38, -0.36]}
          scale={0.17}
        >
          <group
            name="Ctrl_bolt_disp001"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.77, 0.28, -0.43]}
          />
          <group
            name="BOLT001"
            rotation={[-1.75, 0.29, -0.45]}
            scale={[1.02, 1.12, 1.02]}
          />
        </group>
        <group
          name="Empty002"
          position={[-0.32, 0.39, -0.32]}
          rotation={[1.33, 0.46, 0.49]}
          scale={0.19}
        >
          <group
            name="Ctrl_bolt_disp002"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.68, -0.41, 0.49]}
          />
          <group
            name="BOLT002"
            rotation={[-1.67, -0.4, 0.5]}
            scale={[0.96, 1.06, 0.96]}
          />
        </group>
        <group
          name="Empty003"
          position={[-0.3, 0.46, 0.36]}
          rotation={[1.83, 0.34, -0.41]}
          scale={0.15}
        >
          <group
            name="Ctrl_bolt_disp003"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.35, 0.33, 0.39]}
          />
          <group
            name="BOLT003"
            rotation={[-1.35, 0.33, 0.39]}
            scale={[0.91, 1, 0.91]}
          />
        </group>
        <group
          name="Empty004"
          position={[0.32, -0.53, -0.31]}
          rotation={[0.96, -0.92, -0.72]}
          scale={0.19}
        >
          <group
            name="Ctrl_bolt_disp004"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.96, 0.14, -1.02]}
          />
          <group
            name="BOLT004"
            rotation={[-1.92, 0.21, -1.04]}
            scale={[0.96, 1.05, 0.96]}
          />
        </group>
        <group
          name="Empty005"
          position={[0.31, -0.53, 0.28]}
          rotation={[2.22, -0.85, 0.77]}
          scale={0.18}
        >
          <group
            name="Ctrl_bolt_disp005"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.11, -0.11, -1.01]}
          />
          <group
            name="BOLT005"
            rotation={[-1.13, -0.09, -0.99]}
            scale={[0.98, 1.08, 0.98]}
          />
        </group>
        <group
          name="Empty006"
          position={[-0.32, -0.48, -0.32]}
          rotation={[0.96, 0.93, 0.71]}
          scale={0.16}
        >
          <group
            name="Ctrl_bolt_disp006"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.93, -0.17, 1.03]}
          />
          <group
            name="BOLT006"
            rotation={[-1.93, -0.17, 1.03]}
            scale={[1.1, 1.21, 1.1]}
          />
        </group>
        <group
          name="Empty007"
          position={[-0.3, -0.49, 0.37]}
          rotation={[2.09, 0.94, -0.64]}
          scale={0.15}
        >
          <group
            name="Ctrl_bolt_disp007"
            position={[3.29, -0.04, -1.6]}
            rotation={[-1.24, 0.12, 1.01]}
          />
          <group
            name="BOLT007"
            rotation={[-1.32, 0.24, 1.07]}
            scale={[1.18, 1.3, 1.18]}
          />
        </group>
        <mesh
          name="Icosphere"
          geometry={nodes.Icosphere.geometry}
          material={materials["Glass 3"]}
          position={[0.01, 0.58, 0]}
          scale={-0.21}
        />
        <mesh
          name="Cube_8"
          geometry={nodes.Cube_8.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Cube_7"
          geometry={nodes.Cube_7.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Frame_8"
          geometry={nodes.Frame_8.geometry}
          material={materials["Surface 4"]}
          position={[-3.23, 1.23, -3.25]}
        />
        <mesh
          name="Frame_7"
          geometry={nodes.Frame_7.geometry}
          material={materials["Surface 4"]}
          position={[-1.96, -1.94, 1.95]}
        />
        <mesh
          name="Cube_6"
          geometry={nodes.Cube_6.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Frame_6"
          geometry={nodes.Frame_6.geometry}
          material={materials["Surface 4"]}
          position={[-4.39, 3.4, 4.36]}
        />
        <mesh
          name="Cube_5"
          geometry={nodes.Cube_5.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Cube_4"
          geometry={nodes.Cube_4.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Frame_5"
          geometry={nodes.Frame_5.geometry}
          material={materials["Surface 4"]}
          position={[3.72, 2.74, -3.73]}
        />
        <mesh
          name="Frame_4"
          geometry={nodes.Frame_4.geometry}
          material={materials["Surface 4"]}
          position={[5.03, 4.02, 4.99]}
        />
        <mesh
          name="Frame_3"
          geometry={nodes.Frame_3.geometry}
          material={materials["Surface 4"]}
          position={[-1.27, -1.27, -1.28]}
        />
        <mesh
          name="Cube_3"
          geometry={nodes.Cube_3.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Frame_2"
          geometry={nodes.Frame_2.geometry}
          material={materials["Surface 4"]}
          position={[2.62, -2.62, 2.62]}
        />
        <mesh
          name="Frame_1"
          geometry={nodes.Frame_1.geometry}
          material={materials["Surface 4"]}
          position={[0.73, -0.75, -0.75]}
        />
        <mesh
          name="Cube_2"
          geometry={nodes.Cube_2.geometry}
          material={materials["Cracked Ice"]}
        />
        <mesh
          name="Cube_1"
          geometry={nodes.Cube_1.geometry}
          material={materials["Cracked Ice"]}
        />
        {/* <mesh
                    name="Cube"
                    geometry={nodes.Cube.geometry}
                    material={materials["Material.001"]}
                    scale={15.06}
                /> */}
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
  );
}

// useGLTF.preload("/AnimBox.glb");
