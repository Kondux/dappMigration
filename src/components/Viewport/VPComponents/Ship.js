/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export default function Ship({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Ship.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <group
          position={[-141.89, 35, -352.85]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[2923.29, 682.4, 2923.29]}
        >
          <mesh
            geometry={nodes.Cylinder_002.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group
          position={[-141.89, 35, 1205.56]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.03}
        >
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_1.geometry}
            material={materials.Space_ship_phone_and_speed_control}
          />
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_2.geometry}
            material={materials.Space_ship_chair_screens_lamps}
          />
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_3.geometry}
            material={materials.Material_008}
          />
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_4.geometry}
            material={materials.Space_ship_interior_base}
          />
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_5.geometry}
            material={materials.Space_ship}
          />
          <mesh
            geometry={nodes.Space_ship_interior_lp_001_6.geometry}
            material={materials.Material_007}
          />
        </group>
        <group
          position={[0, 0, -266.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[174.08, 122.38, 174.08]}
        >
          <mesh
            geometry={nodes.Sphere001.geometry}
            material={nodes.Sphere001.material}
          />
        </group>
      </group>
      <group
        position={[7.54, 8.66, 6.35]}
        rotation={[1.43, 0.25, 0.53]}
        scale={0.01}
      >
        <PerspectiveCamera
          makeDefault={false}
          far={100}
          near={0.01}
          fov={35.98}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group
        position={[0, 0, 500]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.01}
      >
        <PerspectiveCamera
          makeDefault={false}
          far={100}
          near={0.01}
          fov={175.93}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group
        position={[0, 500, 0]}
        rotation={[Math.PI, 0, -Math.PI / 2]}
        scale={0.01}
      >
        <PerspectiveCamera
          makeDefault={false}
          far={100}
          near={0.01}
          fov={175.93}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group
        position={[-500, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.01}
      >
        <PerspectiveCamera
          makeDefault={false}
          far={100}
          near={0.01}
          fov={175.93}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/Ship.glb");
