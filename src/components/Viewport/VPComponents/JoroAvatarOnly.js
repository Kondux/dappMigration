/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";

export default function JoroAvatarOnly({
  eyecolor,
  color,
  armor,
  skin,
  head,
  weapon,
  animationClip,
  ...props
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Assets/JoroAvatarOnly.glb");

  const { animations } = useGLTF("/Assets/JoroAnimation.glb");
  const { actions } = useAnimations(animations, group);

  // useEffect(() => {
  //   console.log("This is BAYC MODEL ACTIONS", actions);
  //   console.log("This is BAYC MODEL AC", animationClip);
  //   if (animationClip === "Play") {
  //     setTimeout(() => {
  //       console.log("1 clip");
  //       // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);

  //       if (
  //         actions["JoroAnimation_Motion|A|FBXExportClip_0"]
  //           ._effectiveTimeScale === 02
  //       ) {
  //         actions[
  //           "JoroAnimation_Motion|A|FBXExportClip_0"
  //         ].setEffectiveTimeScale(1);
  //       } else {
  //         actions["JoroAnimation_Motion|A|FBXExportClip_0"].play();
  //       }
  //     }, 0);
  //   } else {
  //     setTimeout(() => {
  //       console.log("2 clip");
  //       // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
  //       actions["JoroAnimation_Motion|A|FBXExportClip_0"].setEffectiveTimeScale(
  //         0
  //       );
  //     }, 0);
  //   }

  //   setTimeout(() => {
  //     // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
  //     actions["JoroAnimation_Motion|A|FBXExportClip_0"].play();
  //   }, 0);
  // }, [animationClip]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, -0.02]}>
        <mesh
          geometry={nodes.CC_Base_Tongue.geometry}
          material={materials.Std_Tongue}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.CC_Base_Body_1.geometry}
            material={materials.Std_Skin_Head}
          />

          {armor !== "None" ? (
            <></>
          ) : (
            <>
              {" "}
              <mesh
                geometry={nodes.CC_Base_Body_2.geometry}
                material={materials.Std_Skin_Body}
              />
              <mesh
                geometry={nodes.CC_Base_Body_3.geometry}
                material={materials.Std_Skin_Arm}
              />
              <mesh
                geometry={nodes.CC_Base_Body_4.geometry}
                material={materials.Std_Skin_Leg}
              />
              <mesh
                geometry={nodes.CC_Base_Body_5.geometry}
                material={materials.Std_Nails}
              />
            </>
          )}

          <mesh
            geometry={nodes.CC_Base_Body_6.geometry}
            material={materials.Std_Eyelash}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.CC_Base_Teeth_1.geometry}
            material={materials.Std_Upper_Teeth}
          />
          <mesh
            geometry={nodes.CC_Base_Teeth_2.geometry}
            material={materials.Std_Lower_Teeth}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.CC_Base_EyeOcclusion_1.geometry}
            material={materials.Std_Eye_Occlusion_R}
          />
          <mesh
            geometry={nodes.CC_Base_EyeOcclusion_2.geometry}
            material={materials.Std_Eye_Occlusion_R}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.CC_Game_Eye_1.geometry}
            material={materials.Ga_Eye_R}
          />
          <mesh
            geometry={nodes.CC_Game_Eye_2.geometry}
            material={materials.Ga_Eye_R}
          />
        </group>
      </group>
      {/* <PerspectiveCamera
        makeDefault={false}
        far={2.69}
        near={0}
        fov={22.89}
        position={[0.55, 0.32, 0.55]}
        rotation={[-0.36, 0.75, 0.25]}
      /> */}
    </group>
  );
}

useGLTF.preload("/Assets/JoroAvatarOnly.glb");
