/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function LoArmor1Frame({
  avatarType,
  eyecolor,
  color,
  armor,
  skin,
  head,
  weapon,
  armorVariant,
  animationClip,
  isPlaying,
  ...props
}) {
  const group = useRef();
  const [armorVariantDir, setArmorVariantDir] = useState(
    "/Assets/LoArmorMaterial.glb"
  );

  const { nodes } = useGLTF("/Assets/LoArmor1Frame.glb");

  //This is from avatar only
  const { materials } = useGLTF(`${armorVariantDir}`);

  const { animations } = useGLTF("/Assets/LoSpinAnimation.glb");
  const { actions } = useAnimations(animations, group);

  // This triggers when armor is changed
  useEffect(() => {
    setTimeout(() => {
      // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
      actions["CC3_Base_Plus|FBXExportClip_0"].reset().play();
    }, 0);
  }, [avatarType, armor]);

  // This triggers when armor vairant is changed
  useEffect(() => {
    if (armorVariant === "Black") {
      setArmorVariantDir("/Assets/LoArmor1/LoArmor1WhiteBlack.glb");
      // setSkinVariantDir("/Assets/JoroAvatarOnly.glb");
    } else if (armorVariant === "White") {
      setArmorVariantDir("/Assets/LoArmorMaterial.glb");
    } else if (armorVariant === "Orange") {
      setArmorVariantDir("/Assets/LoArmor1/LoArmor1Orange.glb");
    } else if (armorVariant === "CopperBlue") {
      setArmorVariantDir("/Assets/LoArmor1/LoArmor1CopperBlue.glb");
    } else if (armorVariant === "CopperBlack") {
      setArmorVariantDir("/Assets/LoArmor1/LoArmor1CopperBlack.glb");
    } else if (armorVariant === "CopperBlueBlack") {
      setArmorVariantDir("/Assets/LoArmor1/LoArmor1CopperBlueBlack.glb");
    }
  }, [armorVariant]);

  useEffect(() => {
    console.log("This is BAYC MODEL ACTIONS", actions);
    console.log("This is isPlaying", isPlaying);
    console.log("This is animationClip", animationClip);
    if (isPlaying === true) {
      setTimeout(() => {
        console.log("1 clip");
        // actions["KahnV2YelloNano|FBXExportClip_0"].setEffectiveWeight(1);

        actions["CC3_Base_Plus|FBXExportClip_0"].setEffectiveTimeScale(1);
        actions["CC3_Base_Plus|FBXExportClip_0"].reset().play();
      }, 0);
    } else {
      setTimeout(() => {
        console.log("2 clip");
        // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
        actions["CC3_Base_Plus|FBXExportClip_0"].setEffectiveTimeScale(0);
        actions["CC3_Base_Plus|FBXExportClip_0"].reset().play();
      }, 0);
    }

    setTimeout(() => {
      // actions["CC_Base|FBXExportClip_0.001"].setEffectiveWeight(1);
      actions["CC3_Base_Plus|FBXExportClip_0"].reset().play();
    }, 0);
  }, [animationClip, isPlaying]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CC3_Base_Plus" scale={0.1}>
          <primitive object={nodes.CC_Base_BoneRoot} />
          {/* <group name="CC_Base_Teeth">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Teeth_1"
              geometry={nodes.CC_Base_Teeth_1.geometry}
              material={materials.Std_Upper_Teeth}
              skeleton={nodes.CC_Base_Teeth_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Teeth_2"
              geometry={nodes.CC_Base_Teeth_2.geometry}
              material={materials.Std_Lower_Teeth}
              skeleton={nodes.CC_Base_Teeth_2.skeleton}
            />
          </group> */}
          <group name="PRCCM_SF2Suit">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="PRCCM_SF2Suit_1"
              geometry={nodes.PRCCM_SF2Suit_1.geometry}
              material={materials.PRCCM_SF2Suit_Upper}
              skeleton={nodes.PRCCM_SF2Suit_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="PRCCM_SF2Suit_2"
              geometry={nodes.PRCCM_SF2Suit_2.geometry}
              material={materials.PRCCM_SF2Suit_Lower}
              skeleton={nodes.PRCCM_SF2Suit_2.skeleton}
            />
          </group>
          {/* <group name="CC_Base_Body">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_1"
              geometry={nodes.CC_Base_Body_1.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_1.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_1.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_1.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_2"
              geometry={nodes.CC_Base_Body_2.geometry}
              material={materials.Std_Skin_Body}
              skeleton={nodes.CC_Base_Body_2.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_2.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_2.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_3"
              geometry={nodes.CC_Base_Body_3.geometry}
              material={materials.Std_Skin_Arm}
              skeleton={nodes.CC_Base_Body_3.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_3.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_3.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_4"
              geometry={nodes.CC_Base_Body_4.geometry}
              material={materials.Std_Skin_Leg}
              skeleton={nodes.CC_Base_Body_4.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_4.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_4.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_5"
              geometry={nodes.CC_Base_Body_5.geometry}
              material={materials.Std_Nails}
              skeleton={nodes.CC_Base_Body_5.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_5.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_5.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_6"
              geometry={nodes.CC_Base_Body_6.geometry}
              material={materials.Std_Eyelash}
              skeleton={nodes.CC_Base_Body_6.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_6.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_6.morphTargetInfluences}
            />
          </group>
          <group name="CC_Base_Eye">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_1"
              geometry={nodes.CC_Base_Eye_1.geometry}
              material={materials.Std_Eye_R}
              skeleton={nodes.CC_Base_Eye_1.skeleton}
              morphTargetDictionary={nodes.CC_Base_Eye_1.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Eye_1.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_2"
              geometry={nodes.CC_Base_Eye_2.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_Eye_2.skeleton}
              morphTargetDictionary={nodes.CC_Base_Eye_2.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Eye_2.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_3"
              geometry={nodes.CC_Base_Eye_3.geometry}
              material={materials.Std_Eye_L}
              skeleton={nodes.CC_Base_Eye_3.skeleton}
              morphTargetDictionary={nodes.CC_Base_Eye_3.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Eye_3.morphTargetInfluences}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_4"
              geometry={nodes.CC_Base_Eye_4.geometry}
              material={materials.Std_Cornea_L}
              skeleton={nodes.CC_Base_Eye_4.skeleton}
              morphTargetDictionary={nodes.CC_Base_Eye_4.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Eye_4.morphTargetInfluences}
            />
          </group>
          <group name="CC_Base_EyeOcclusion">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_EyeOcclusion_1"
              geometry={nodes.CC_Base_EyeOcclusion_1.geometry}
              material={materials.Std_Eye_Occlusion_R}
              skeleton={nodes.CC_Base_EyeOcclusion_1.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_EyeOcclusion_1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_EyeOcclusion_1.morphTargetInfluences
              }
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_EyeOcclusion_2"
              geometry={nodes.CC_Base_EyeOcclusion_2.geometry}
              material={materials.Std_Eye_Occlusion_L}
              skeleton={nodes.CC_Base_EyeOcclusion_2.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_EyeOcclusion_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_EyeOcclusion_2.morphTargetInfluences
              }
            />
          </group>
          <group name="CC_Base_TearLine">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_TearLine_1"
              geometry={nodes.CC_Base_TearLine_1.geometry}
              material={materials.Std_Tearline_R}
              skeleton={nodes.CC_Base_TearLine_1.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_TearLine_1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_TearLine_1.morphTargetInfluences
              }
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_TearLine_2"
              geometry={nodes.CC_Base_TearLine_2.geometry}
              material={materials.Std_Tearline_L}
              skeleton={nodes.CC_Base_TearLine_2.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_TearLine_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_TearLine_2.morphTargetInfluences
              }
            />
          </group>
          <skinnedMesh
            castShadow
            receiveShadow
            frustumCulled={false}
            name="CC_Base_Tongue"
            geometry={nodes.CC_Base_Tongue.geometry}
            material={materials.Std_Tongue}
            skeleton={nodes.CC_Base_Tongue.skeleton}
            morphTargetDictionary={nodes.CC_Base_Tongue.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Tongue.morphTargetInfluences}
          /> */}
        </group>
        <group name="Lo" scale={0.1}>
          <primitive object={nodes.Shadow_Catcher} />
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/Assets/LoArmor1Frame.glb");
