/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function ReptFix({
  eyecolor,
  color,
  armor,
  animationClip,
  ...props
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/ReptFix.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.cc_base} />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive0.geometry}
        material={materials.Std_Tongue}
        skeleton={nodes.node0_primitive0.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive1.geometry}
        material={materials.Std_Skin_Head}
        skeleton={nodes.node0_primitive1.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive2.geometry}
        material={materials.Std_Skin_Body}
        skeleton={nodes.node0_primitive2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive3.geometry}
        material={materials.Std_Skin_Arm}
        skeleton={nodes.node0_primitive3.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive4.geometry}
        material={materials.Std_Skin_Leg}
        skeleton={nodes.node0_primitive4.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive5.geometry}
        material={materials.Std_Nails}
        skeleton={nodes.node0_primitive5.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive6.geometry}
        material={materials.Std_Eyelash}
        skeleton={nodes.node0_primitive6.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive7.geometry}
        material={materials.Std_Upper_Teeth}
        skeleton={nodes.node0_primitive7.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive8.geometry}
        material={materials.Std_Lower_Teeth}
        skeleton={nodes.node0_primitive8.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive9.geometry}
        material={materials.Std_Eye_Occlusion_R}
        skeleton={nodes.node0_primitive9.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive10.geometry}
        material={materials.Std_Eye_Occlusion_L}
        skeleton={nodes.node0_primitive10.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive11.geometry}
        material={materials.PRCCM_SF2Suit_Upper}
        material-color={color}
        skeleton={nodes.node0_primitive11.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive12.geometry}
        material={materials.PRCCM_SF2Suit_Lower}
        material-color={color}
        skeleton={nodes.node0_primitive12.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive13.geometry}
        material={materials.PRCCM_SF2Gloves}
        material-color={color}
        skeleton={nodes.node0_primitive13.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive14.geometry}
        material={materials.Ga_Eye_R}
        material-color={eyecolor}
        skeleton={nodes.node0_primitive14.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive15.geometry}
        material={materials.Ga_Eye_L}
        material-color={eyecolor}
        skeleton={nodes.node0_primitive15.skeleton}
      />
    </group>
  );
}

// useGLTF.preload("/ReptFix.glb");
