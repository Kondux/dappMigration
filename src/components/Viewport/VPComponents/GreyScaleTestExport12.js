/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useEffect, useState, useRef } from "react";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";

export default function GreyWeapon({
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

  const { nodes, materials, animations } = useGLTF(
    "/GreyScaleTestExport-transformed.glb"
  );

  const [skinVar, setSkinVar] = useState("");

  // Skin var decides body texture
  useEffect(() => {
    console.log("THIS IS SKIN", skin);
    if (skin === "Teal") {
      setSkinVar("grey_teal_");
    } else {
      setSkinVar("");
    }
  }, [skin]);

  // Armor var decides armor variant

  console.log("This is material", materials.Std_Skin_Head);

  const maps = useTexture({
    map: `/maps/${skinVar}Std_Skin_Head__Diffuse.png`,
    // displacementMap: 'PavingStones092_1K_Displacement.jpg',
    normalMap: `/maps/${skinVar}Std_Skin_Head__Normal.png`,
    roughnessMap: `/maps/${skinVar}Std_Skin_Head__Roughness.png`,
    aoMap: `/maps/${skinVar}Std_Skin_Head__AO.png`,
  });

  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ScaleGreyTest" scale={0.01}>
          <primitive object={nodes.CC_Base_BoneRoot} />
          <group name="CC_Base_Body">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_1"
              geometry={nodes.CC_Base_Body_1.geometry}
              // material={materials.Std_Skin_Head}
              // material={...maps}
              skeleton={nodes.CC_Base_Body_1.skeleton}
            >
              <meshStandardMaterial {...maps} />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_2"
              geometry={nodes.CC_Base_Body_2.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_2.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_3"
              geometry={nodes.CC_Base_Body_3.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_3.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_4"
              geometry={nodes.CC_Base_Body_4.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_4.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_5"
              geometry={nodes.CC_Base_Body_5.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_5.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Body_6"
              geometry={nodes.CC_Base_Body_6.geometry}
              material={materials.Std_Eyelash}
              skeleton={nodes.CC_Base_Body_6.skeleton}
            />
          </group>
          <group name="CC_Base_Eye">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_1"
              geometry={nodes.CC_Base_Eye_1.geometry}
              material={materials.Std_Eyelash}
              skeleton={nodes.CC_Base_Eye_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_2"
              geometry={nodes.CC_Base_Eye_2.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_Eye_2.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_3"
              geometry={nodes.CC_Base_Eye_3.geometry}
              material={materials.Std_Eyelash}
              skeleton={nodes.CC_Base_Eye_3.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Eye_4"
              geometry={nodes.CC_Base_Eye_4.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_Eye_4.skeleton}
            />
          </group>
          <group name="CC_Base_EyeOcclusion">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_EyeOcclusion_1"
              geometry={nodes.CC_Base_EyeOcclusion_1.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_EyeOcclusion_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_EyeOcclusion_2"
              geometry={nodes.CC_Base_EyeOcclusion_2.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_EyeOcclusion_2.skeleton}
            />
          </group>
          <group name="CC_Base_TearLine">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_TearLine_1"
              geometry={nodes.CC_Base_TearLine_1.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_TearLine_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_TearLine_2"
              geometry={nodes.CC_Base_TearLine_2.geometry}
              material={materials.Std_Cornea_R}
              skeleton={nodes.CC_Base_TearLine_2.skeleton}
            />
          </group>
          <skinnedMesh
            castShadow
            receiveShadow
            frustumCulled={false}
            name="CC_Base_Tongue"
            geometry={nodes.CC_Base_Tongue.geometry}
            material={materials.Std_Skin_Head}
            skeleton={nodes.CC_Base_Tongue.skeleton}
          />
          <group name="CC_Base_Teeth">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Teeth_1"
              geometry={nodes.CC_Base_Teeth_1.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Teeth_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="CC_Base_Teeth_2"
              geometry={nodes.CC_Base_Teeth_2.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Teeth_2.skeleton}
            />
          </group>
          <group name="PRCCM_SF2Suit">
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="PRCCM_SF2Suit_1"
              geometry={nodes.PRCCM_SF2Suit_1.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.PRCCM_SF2Suit_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              frustumCulled={false}
              name="PRCCM_SF2Suit_2"
              geometry={nodes.PRCCM_SF2Suit_2.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.PRCCM_SF2Suit_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/GreyScaleTestExport-transformed.glb");
