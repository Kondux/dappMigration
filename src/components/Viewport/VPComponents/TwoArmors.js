/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function TwoArmors({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/TwoArmors.glb");
  const { animations } = useGLTF("/FixedGrey-transformed.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log("This is BAYC MODEL ACTIONS", actions);
    setTimeout(() => {
      // actions["CC_Base|FBXExportClip_0"].setEffectiveWeight(0.2);
      actions["CC_Base|FBXExportClip_0"].play();
    }, 0);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Avatar" scale={1}>
          <primitive object={nodes.CC_Base_BoneRoot} />
          <group name="Nano_M_Suit_H">
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_1"
              geometry={nodes.Nano_M_Suit_H_1.geometry}
              material={materials.Ribs}
              skeleton={nodes.Nano_M_Suit_H_1.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_2"
              geometry={nodes.Nano_M_Suit_H_2.geometry}
              material={materials.RibBraces}
              skeleton={nodes.Nano_M_Suit_H_2.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_3"
              geometry={nodes.Nano_M_Suit_H_3.geometry}
              material={materials.FootBraces}
              skeleton={nodes.Nano_M_Suit_H_3.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_4"
              geometry={nodes.Nano_M_Suit_H_4.geometry}
              material={materials.Shoes}
              skeleton={nodes.Nano_M_Suit_H_4.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_5"
              geometry={nodes.Nano_M_Suit_H_5.geometry}
              material={materials.Shins}
              skeleton={nodes.Nano_M_Suit_H_5.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_6"
              geometry={nodes.Nano_M_Suit_H_6.geometry}
              material={materials.ShinBraces}
              skeleton={nodes.Nano_M_Suit_H_6.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_7"
              geometry={nodes.Nano_M_Suit_H_7.geometry}
              material={materials.ForeArms}
              skeleton={nodes.Nano_M_Suit_H_7.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_8"
              geometry={nodes.Nano_M_Suit_H_8.geometry}
              material={materials.UpperArms}
              skeleton={nodes.Nano_M_Suit_H_8.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_9"
              geometry={nodes.Nano_M_Suit_H_9.geometry}
              material={materials.Shoulders}
              skeleton={nodes.Nano_M_Suit_H_9.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_10"
              geometry={nodes.Nano_M_Suit_H_10.geometry}
              material={materials.Waist}
              skeleton={nodes.Nano_M_Suit_H_10.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_11"
              geometry={nodes.Nano_M_Suit_H_11.geometry}
              material={materials.Buttock}
              skeleton={nodes.Nano_M_Suit_H_11.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_12"
              geometry={nodes.Nano_M_Suit_H_12.geometry}
              material={materials.WaistBraces}
              skeleton={nodes.Nano_M_Suit_H_12.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_13"
              geometry={nodes.Nano_M_Suit_H_13.geometry}
              material={materials.Cod}
              skeleton={nodes.Nano_M_Suit_H_13.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_14"
              geometry={nodes.Nano_M_Suit_H_14.geometry}
              material={materials.ArmBraces}
              skeleton={nodes.Nano_M_Suit_H_14.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_15"
              geometry={nodes.Nano_M_Suit_H_15.geometry}
              material={materials.HandBraces}
              skeleton={nodes.Nano_M_Suit_H_15.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_16"
              geometry={nodes.Nano_M_Suit_H_16.geometry}
              material={materials.ChestFrame}
              skeleton={nodes.Nano_M_Suit_H_16.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_17"
              geometry={nodes.Nano_M_Suit_H_17.geometry}
              material={materials.Spine}
              skeleton={nodes.Nano_M_Suit_H_17.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_18"
              geometry={nodes.Nano_M_Suit_H_18.geometry}
              material={materials.Back}
              skeleton={nodes.Nano_M_Suit_H_18.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_19"
              geometry={nodes.Nano_M_Suit_H_19.geometry}
              material={materials.Abs}
              skeleton={nodes.Nano_M_Suit_H_19.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_20"
              geometry={nodes.Nano_M_Suit_H_20.geometry}
              material={materials.LowerBackBrace}
              skeleton={nodes.Nano_M_Suit_H_20.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_21"
              geometry={nodes.Nano_M_Suit_H_21.geometry}
              material={materials.Pecks}
              skeleton={nodes.Nano_M_Suit_H_21.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_22"
              geometry={nodes.Nano_M_Suit_H_22.geometry}
              material={materials.Traps}
              skeleton={nodes.Nano_M_Suit_H_22.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_23"
              geometry={nodes.Nano_M_Suit_H_23.geometry}
              material={materials.Neck}
              skeleton={nodes.Nano_M_Suit_H_23.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_24"
              geometry={nodes.Nano_M_Suit_H_24.geometry}
              material={materials.KneeBacks}
              skeleton={nodes.Nano_M_Suit_H_24.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_25"
              geometry={nodes.Nano_M_Suit_H_25.geometry}
              material={materials.KneeBraces}
              skeleton={nodes.Nano_M_Suit_H_25.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_26"
              geometry={nodes.Nano_M_Suit_H_26.geometry}
              material={materials.Thighs}
              skeleton={nodes.Nano_M_Suit_H_26.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_27"
              geometry={nodes.Nano_M_Suit_H_27.geometry}
              material={materials.Soles}
              skeleton={nodes.Nano_M_Suit_H_27.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_28"
              geometry={nodes.Nano_M_Suit_H_28.geometry}
              material={materials.Calves}
              skeleton={nodes.Nano_M_Suit_H_28.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_29"
              geometry={nodes.Nano_M_Suit_H_29.geometry}
              material={materials.ShinBacks}
              skeleton={nodes.Nano_M_Suit_H_29.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_30"
              geometry={nodes.Nano_M_Suit_H_30.geometry}
              material={materials.ThighBraces}
              skeleton={nodes.Nano_M_Suit_H_30.skeleton}
            />
            <skinnedMesh
              frustumCulled={false}
              name="Nano_M_Suit_H_31"
              geometry={nodes.Nano_M_Suit_H_31.geometry}
              material={materials.Gloves}
              skeleton={nodes.Nano_M_Suit_H_31.skeleton}
            />
          </group>
          <group name="CC_Base_Body">
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_1"
              geometry={nodes.CC_Base_Body_1.geometry}
              material={materials.Std_Skin_Head}
              skeleton={nodes.CC_Base_Body_1.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_1.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_1.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_2"
              geometry={nodes.CC_Base_Body_2.geometry}
              material={materials.Std_Skin_Body}
              skeleton={nodes.CC_Base_Body_2.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_2.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_2.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_3"
              geometry={nodes.CC_Base_Body_3.geometry}
              material={materials.Std_Skin_Arm}
              skeleton={nodes.CC_Base_Body_3.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_3.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_3.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_4"
              geometry={nodes.CC_Base_Body_4.geometry}
              material={materials.Std_Skin_Leg}
              skeleton={nodes.CC_Base_Body_4.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_4.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_4.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_5"
              geometry={nodes.CC_Base_Body_5.geometry}
              material={materials.Std_Nails}
              skeleton={nodes.CC_Base_Body_5.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_5.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_5.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Body_6"
              geometry={nodes.CC_Base_Body_6.geometry}
              material={materials.Std_Eyelash}
              skeleton={nodes.CC_Base_Body_6.skeleton}
              morphTargetDictionary={nodes.CC_Base_Body_6.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Base_Body_6.morphTargetInfluences}
            />
          </group>
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Tongue"
            geometry={nodes.CC_Base_Tongue.geometry}
            material={materials.Std_Tongue}
            skeleton={nodes.CC_Base_Tongue.skeleton}
            morphTargetDictionary={nodes.CC_Base_Tongue.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Tongue.morphTargetInfluences}
          />
          <group name="CC_Base_Teeth">
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Teeth_1"
              geometry={nodes.CC_Base_Teeth_1.geometry}
              material={materials.Std_Upper_Teeth}
              skeleton={nodes.CC_Base_Teeth_1.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_Teeth_1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_Teeth_1.morphTargetInfluences
              }
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Base_Teeth_2"
              geometry={nodes.CC_Base_Teeth_2.geometry}
              material={materials.Std_Lower_Teeth}
              skeleton={nodes.CC_Base_Teeth_2.skeleton}
              morphTargetDictionary={
                nodes.CC_Base_Teeth_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.CC_Base_Teeth_2.morphTargetInfluences
              }
            />
          </group>
          <group name="CC_Game_Eye">
            <skinnedMesh
              frustumCulled={false}
              name="CC_Game_Eye_1"
              geometry={nodes.CC_Game_Eye_1.geometry}
              material={materials.Ga_Eye_R}
              skeleton={nodes.CC_Game_Eye_1.skeleton}
              morphTargetDictionary={nodes.CC_Game_Eye_1.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Game_Eye_1.morphTargetInfluences}
            />
            <skinnedMesh
              frustumCulled={false}
              name="CC_Game_Eye_2"
              geometry={nodes.CC_Game_Eye_2.geometry}
              material={materials.Ga_Eye_L}
              skeleton={nodes.CC_Game_Eye_2.skeleton}
              morphTargetDictionary={nodes.CC_Game_Eye_2.morphTargetDictionary}
              morphTargetInfluences={nodes.CC_Game_Eye_2.morphTargetInfluences}
            />
          </group>
          <group name="CC_Base_EyeOcclusion">
            <skinnedMesh
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
        </group>
        <group name="Avatar001" scale={1}>
          <group name="Shadow_Catcher" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="CC_Base_Pivot" position={[0, 0, -1.53]}>
              <group name="Plane_001" position={[0, 0, 1.59]} />
            </group>
          </group>
        </group>
        <group name="Armor2" scale={1}>
          <primitive object={nodes.CC_Base_BoneRoot_1} />
          <skinnedMesh
            frustumCulled={false}
            name="ATES_M_Suit_L"
            geometry={nodes.ATES_M_Suit_L.geometry}
            material={materials.ATES_M_Suit_L}
            skeleton={nodes.ATES_M_Suit_L.skeleton}
          />
          {/* <skinnedMesh
                        frustumCulled={false}
                        name="CC_Base_Tongue001"
                        geometry={nodes.CC_Base_Tongue001.geometry}
                        material={materials["Std_Tongue.001"]}
                        skeleton={nodes.CC_Base_Tongue001.skeleton}
                        morphTargetDictionary={
                            nodes.CC_Base_Tongue001.morphTargetDictionary
                        }
                        morphTargetInfluences={
                            nodes.CC_Base_Tongue001.morphTargetInfluences
                        }
                    /> */}
          {/* <group name="CC_Base_Body001">
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_1"
                            geometry={nodes.CC_Base_Body001_1.geometry}
                            material={materials["Std_Skin_Head.001"]}
                            skeleton={nodes.CC_Base_Body001_1.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_1.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_1.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_2"
                            geometry={nodes.CC_Base_Body001_2.geometry}
                            material={materials["Std_Skin_Body.001"]}
                            skeleton={nodes.CC_Base_Body001_2.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_2.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_2.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_3"
                            geometry={nodes.CC_Base_Body001_3.geometry}
                            material={materials["Std_Skin_Arm.001"]}
                            skeleton={nodes.CC_Base_Body001_3.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_3.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_3.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_4"
                            geometry={nodes.CC_Base_Body001_4.geometry}
                            material={materials["Std_Skin_Leg.001"]}
                            skeleton={nodes.CC_Base_Body001_4.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_4.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_4.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_5"
                            geometry={nodes.CC_Base_Body001_5.geometry}
                            material={materials["Std_Nails.001"]}
                            skeleton={nodes.CC_Base_Body001_5.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_5.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_5.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Body001_6"
                            geometry={nodes.CC_Base_Body001_6.geometry}
                            material={materials["Std_Eyelash.001"]}
                            skeleton={nodes.CC_Base_Body001_6.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Body001_6.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Body001_6.morphTargetInfluences
                            }
                        />
                    </group>
                    <group name="CC_Base_Teeth001">
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Teeth001_1"
                            geometry={nodes.CC_Base_Teeth001_1.geometry}
                            material={materials["Std_Upper_Teeth.001"]}
                            skeleton={nodes.CC_Base_Teeth001_1.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Teeth001_1.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Teeth001_1.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_Teeth001_2"
                            geometry={nodes.CC_Base_Teeth001_2.geometry}
                            material={materials["Std_Lower_Teeth.001"]}
                            skeleton={nodes.CC_Base_Teeth001_2.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_Teeth001_2.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_Teeth001_2.morphTargetInfluences
                            }
                        />
                    </group>
                    <group name="CC_Game_Eye001">
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Game_Eye001_1"
                            geometry={nodes.CC_Game_Eye001_1.geometry}
                            material={materials["Ga_Eye_R.001"]}
                            skeleton={nodes.CC_Game_Eye001_1.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Game_Eye001_1.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Game_Eye001_1.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Game_Eye001_2"
                            geometry={nodes.CC_Game_Eye001_2.geometry}
                            material={materials["Ga_Eye_L.001"]}
                            skeleton={nodes.CC_Game_Eye001_2.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Game_Eye001_2.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Game_Eye001_2.morphTargetInfluences
                            }
                        />
                    </group>
                    <group name="CC_Base_EyeOcclusion001">
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_EyeOcclusion001_1"
                            geometry={nodes.CC_Base_EyeOcclusion001_1.geometry}
                            material={materials["Std_Eye_Occlusion_R.001"]}
                            skeleton={nodes.CC_Base_EyeOcclusion001_1.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_EyeOcclusion001_1
                                    .morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_EyeOcclusion001_1
                                    .morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            name="CC_Base_EyeOcclusion001_2"
                            geometry={nodes.CC_Base_EyeOcclusion001_2.geometry}
                            material={materials["Std_Eye_Occlusion_L.001"]}
                            skeleton={nodes.CC_Base_EyeOcclusion001_2.skeleton}
                            morphTargetDictionary={
                                nodes.CC_Base_EyeOcclusion001_2
                                    .morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.CC_Base_EyeOcclusion001_2
                                    .morphTargetInfluences
                            }
                        />
                    </group> */}
        </group>
        <group name="Armor2001" scale={1}>
          <group name="Shadow_Catcher_1" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="CC_Base_Pivot_1" position={[0, 0, -1.53]}>
              <group name="Plane_001_1" position={[0, 0, 1.59]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/TwoArmors.glb");
