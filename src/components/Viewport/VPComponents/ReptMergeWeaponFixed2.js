/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function ReptWeapon({
  eyecolor,
  color,
  armor,
  skin,
  head,
  weapon,
  animationClip,
  ...props
}) {
  // This is Reptilian with weapon
  const { nodes, materials } = useGLTF("/ReptMergeWeaponFixed-transformed.glb");

  // const { animations } = useGLTF("/ReptilianAnimation1_Motion_Anim.glb");
  // const { actions } = useAnimations(animations, group);

  // useEffect(() => {
  //   console.log("This is BAYC MODEL ACTIONS", actions);
  //   console.log("This is BAYC MODEL AC", animationClip);
  //   if (animationClip === "Play") {
  //     setTimeout(() => {
  //       console.log("1 clip");
  //       // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);

  //       if (
  //         actions["ReptilianAnimation1_Motion_Anim_0"]._effectiveTimeScale === 0
  //       ) {
  //         actions["ReptilianAnimation1_Motion_Anim_0"].setEffectiveTimeScale(1);
  //       } else {
  //         actions["ReptilianAnimation1_Motion_Anim_0"].play();
  //       }
  //     }, 0);
  //   } else {
  //     setTimeout(() => {
  //       console.log("2 clip");
  //       // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
  //       actions["ReptilianAnimation1_Motion_Anim_0"].setEffectiveTimeScale(0);
  //     }, 0);
  //   }

  //   // setTimeout(() => {
  //   //     // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
  //   //     actions["CC_Base|FBXExportClip_0"].play();
  //   // }, 0);
  // }, [animationClip]);

  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.root} />

      {/* BASE */}
      {armor === "None" ? (
        <>
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive1.geometry}
            material={materials.Std_Skin_Head}
            material-color={skin}
            skeleton={nodes.node0_primitive1.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive0.geometry}
            material={materials.Std_Tongue}
            skeleton={nodes.node0_primitive0.skeleton}
          />

          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive2.geometry}
            material={materials.Std_Skin_Body}
            material-color={skin}
            skeleton={nodes.node0_primitive2.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive3.geometry}
            material={materials.Std_Skin_Arm}
            material-color={skin}
            skeleton={nodes.node0_primitive3.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive4.geometry}
            material={materials.Std_Skin_Leg}
            material-color={skin}
            skeleton={nodes.node0_primitive4.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive5.geometry}
            material={materials.Std_Nails}
            material-color={skin}
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
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive7.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive8.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive8.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive9.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive9.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive10.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive10.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive11.geometry}
            material={materials.Std_Upper_Teeth}
            skeleton={nodes.node0_primitive11.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive12.geometry}
            material={materials.Std_Lower_Teeth}
            skeleton={nodes.node0_primitive12.skeleton}
          />
        </>
      ) : (
        <></>
      )}

      {armor !== "None" ? (
        <>
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive1.geometry}
            material={materials.Std_Skin_Head}
            material-color={skin}
            skeleton={nodes.node0_primitive1.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive0.geometry}
            material={materials.Std_Tongue}
            skeleton={nodes.node0_primitive0.skeleton}
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
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive7.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive8.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive8.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive9.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive9.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive10.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.node0_primitive10.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive11.geometry}
            material={materials.Std_Upper_Teeth}
            skeleton={nodes.node0_primitive11.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive12.geometry}
            material={materials.Std_Lower_Teeth}
            skeleton={nodes.node0_primitive12.skeleton}
          />
        </>
      ) : (
        <></>
      )}

      {head !== "None" ? (
        <>
          {/* HELMET */}
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive13.geometry}
            material={materials.PRCCM_SF2Helm}
            skeleton={nodes.node0_primitive13.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive14.geometry}
            material={materials.PRCCM_SF2Helm_Glass}
            skeleton={nodes.node0_primitive14.skeleton}
          />
        </>
      ) : (
        <></>
      )}

      {armor === "Alpha" ? (
        <>
          {/* ARMOR 2 PRCCM*/}
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive15.geometry}
            material={materials.PRCCM_SF2Suit_Upper}
            skeleton={nodes.node0_primitive15.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive16.geometry}
            material={materials.PRCCM_SF2Suit_Lower}
            skeleton={nodes.node0_primitive16.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive17.geometry}
            material={materials.PRCCM_SF2Gloves}
            skeleton={nodes.node0_primitive17.skeleton}
          />
        </>
      ) : (
        <></>
      )}

      {armor === "Beta" ? (
        <>
          {/* ARMOR */}
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive18.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive18.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive19.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive19.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive20.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive20.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive21.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive21.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive22.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive22.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive23.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive23.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive24.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive24.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive25.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive25.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive26.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive26.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive27.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive27.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive28.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive28.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive29.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive29.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive30.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive30.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive31.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive31.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive32.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive32.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive33.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive33.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive34.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive34.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive35.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive35.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive36.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive36.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive37.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive37.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive38.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive38.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive39.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive39.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive40.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive40.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive41.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive41.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive42.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive42.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive43.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive43.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive44.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive44.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive45.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive45.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive46.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive46.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive47.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive47.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive48.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive48.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive49.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive49.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive50.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive50.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive51.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive51.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive52.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive52.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive53.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive53.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive54.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive54.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive55.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive55.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive56.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive56.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive57.geometry}
            material={materials.Abs}
            skeleton={nodes.node0_primitive57.skeleton}
          />
        </>
      ) : (
        <></>
      )}

      {/* EYES */}
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive58.geometry}
        material={materials.Ga_Eye_R}
        skeleton={nodes.node0_primitive58.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.node0_primitive59.geometry}
        material={materials.Ga_Eye_L}
        skeleton={nodes.node0_primitive59.skeleton}
      />

      {weapon !== "None" ? (
        <>
          {/* LASER SWORD */}
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive60.geometry}
            material={materials.GoZMesh_Default_Material}
            skeleton={nodes.node0_primitive60.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive61.geometry}
            material={materials.GoZMesh_Import_Material}
            skeleton={nodes.node0_primitive61.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive62.geometry}
            material={materials.GoZMesh_Import_Material_0}
            skeleton={nodes.node0_primitive62.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive63.geometry}
            material={materials.GoZMesh_Import_Material_1}
            skeleton={nodes.node0_primitive63.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive64.geometry}
            material={materials.GoZMesh_Default_Material_0}
            skeleton={nodes.node0_primitive64.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.node0_primitive65.geometry}
            material={materials.GoZMesh_Default_Material_0}
            skeleton={nodes.node0_primitive65.skeleton}
          />
        </>
      ) : (
        <></>
      )}
    </group>
  );
}

// useGLTF.preload("/ReptMergeWeaponFixed-transformed.glb");
