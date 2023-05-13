/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function PleiadianBase({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/PleiadianBase-transformed.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.BaseMesh_Man_Simple_Eyeball.geometry}
        material={materials.BASEMESH_WHITE_B100}
        position={[0.34, 16.72, 1.35]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />
      <mesh
        geometry={nodes.BaseMesh_Man_Simple_EyeCornea.geometry}
        material={materials["Procedural Eye_B101"]}
        position={[0.34, 16.72, 1.35]}
        scale={0.1}
      />
      <mesh
        geometry={nodes.BaseMesh_Man_Simple_Body.geometry}
        material={materials["Procedural Flesh"]}
        position={[0.01, 0.03, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />
    </group>
  );
}

// useGLTF.preload("/PleiadianBase-transformed.glb");