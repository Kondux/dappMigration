/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CyGrey({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Cygrey-transformed.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.spine} />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.CYGREY_SKIN_primitive0.geometry}
        material={materials.Skin}
        skeleton={nodes.CYGREY_SKIN_primitive0.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.CYGREY_SKIN_primitive1.geometry}
        material={materials.Lips}
        skeleton={nodes.CYGREY_SKIN_primitive1.skeleton}
      />
    </group>
  );
}

// useGLTF.preload("/Cygrey-transformed.glb");
