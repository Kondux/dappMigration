/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function ReptFix({
  eyecolor,
  color,
  armor,
  skin,
  animationClip,
  ...props
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/ReptFix3.glb");
  const { animations } = useGLTF("/ReptilianAnimation1_Motion_Anim.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // console.log("This is BAYC MODEL ACTIONS", actions);
    // console.log("This is BAYC MODEL AC", animationClip);
    if (animationClip === "Play") {
      setTimeout(() => {
        // console.log("1 clip");
        // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);

        if (
          actions["ReptilianAnimation1_Motion_Anim_0"]._effectiveTimeScale === 0
        ) {
          actions["ReptilianAnimation1_Motion_Anim_0"].setEffectiveTimeScale(1);
        } else {
          actions["ReptilianAnimation1_Motion_Anim_0"].play();
        }
      }, 0);
    } else {
      setTimeout(() => {
        // console.log("2 clip");
        // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
        actions["ReptilianAnimation1_Motion_Anim_0"].setEffectiveTimeScale(0);
      }, 0);
    }

    // setTimeout(() => {
    //     // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
    //     actions["CC_Base|FBXExportClip_0"].play();
    // }, 0);
  }, [animationClip]);

  const newNormal = useLoader(
    THREE.TextureLoader,
    "https://i.postimg.cc/hvbWy5vc/Normal1armor-upper.png"
  );

  const newText = useLoader(
    THREE.TextureLoader,
    "https://i.postimg.cc/m2BGzBpD/Texture-Test.png"
  );

  const newMet = useLoader(
    THREE.TextureLoader,
    "https://i.postimg.cc/y6FH8kPt/Texture-Test2.png"
  );

  const newAO = useLoader(
    THREE.TextureLoader,
    "https://i.postimg.cc/Kc64hcTq/PRCCM-SF2-Suit-Upper-Occlusion.png"
  );

  // const newMat = new THREE.MeshStandardMaterial({
  //     // map: materials.PRCCM_SF2Suit_Upper,
  //     normalMap: texture1,
  // });

  // console.log("THIS IS MATERIAL", materials.PRCCM_SF2Suit_Upper);
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.cc_base} />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive0_2.geometry}
        material={materials.Std_Tongue}
        skeleton={nodes.node0_primitive0_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive1_2.geometry}
        material={materials.Std_Skin_Head}
        material-color={skin}
        skeleton={nodes.node0_primitive1_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive2_2.geometry}
        material={materials.Std_Skin_Body}
        material-color={skin}
        skeleton={nodes.node0_primitive2_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive3_2.geometry}
        material={materials.Std_Skin_Arm}
        material-color={skin}
        skeleton={nodes.node0_primitive3_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive4_2.geometry}
        material={materials.Std_Skin_Leg}
        material-color={skin}
        skeleton={nodes.node0_primitive4_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive5_2.geometry}
        material={materials.Std_Nails}
        skeleton={nodes.node0_primitive5_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive6_2.geometry}
        material={materials.Std_Eyelash}
        skeleton={nodes.node0_primitive6_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive7_2.geometry}
        material={materials.Std_Upper_Teeth}
        skeleton={nodes.node0_primitive7_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive8_2.geometry}
        material={materials.Std_Lower_Teeth}
        skeleton={nodes.node0_primitive8_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive9_2.geometry}
        material={materials.Std_Eye_Occlusion_R}
        skeleton={nodes.node0_primitive9_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive10_2.geometry}
        material={materials.Std_Eye_Occlusion_L}
        skeleton={nodes.node0_primitive10_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive11_2.geometry}
        material={materials.PRCCM_SF2Suit_Upper}
        // material-map={newText}
        // material-map-flipY={false}
        // material-normalMap={newNormal}
        // material-normalMap-flipY={false}
        // material-metalnessMap={newMet}
        // material-metalnessMap-flipY={false}
        // material-aoMap={newAO}
        // material-aoMap-flipY={false}
        material-color={color}
        skeleton={nodes.node0_primitive11_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive12_2.geometry}
        material={materials.PRCCM_SF2Suit_Lower}
        material-color={color}
        skeleton={nodes.node0_primitive12_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive13_2.geometry}
        material={materials.PRCCM_SF2Gloves}
        material-color={color}
        skeleton={nodes.node0_primitive13_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive14_2.geometry}
        material={materials.Ga_Eye_R}
        material-color={eyecolor}
        skeleton={nodes.node0_primitive14_2.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive15_2.geometry}
        material={materials.Ga_Eye_L}
        material-color={eyecolor}
        skeleton={nodes.node0_primitive15_2.skeleton}
      />
    </group>
  );
}

// useGLTF.preload("/ReptFix3.glb");