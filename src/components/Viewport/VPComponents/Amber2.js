/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
created: Tue May 17 00:06:45 2022
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Amber({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Amber.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // console.log("This is BAYC MODEL ACTIONS", actions);
    setTimeout(() => {
      actions["Camila|FBXExportClip_0"].play();
    }, 0);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Idle001" scale={0.01}>
          <primitive object={nodes.CC_Base_BoneRoot} />
          <group name="Camila_Brow" />
          <group name="CC_Base_Body" />
          <group name="CC_Base_Eye" />
          <group name="CC_Base_EyeOcclusion" />
          <group name="CC_Base_TearLine" />
          <group name="CC_Base_Teeth" />
          <group name="CC_Base_Tongue" />
          <group name="High_Heels" />
          <group name="Knee_length_skirt" />
          <group name="Rolled_sleeves_shirt" />
          <group name="Side_part_wavy" />
          <group name="Camila_Brow_1">
            <group name="Camila_Brow_primitive0_1" />
            <group name="Camila_Brow_primitive1_1" />
          </group>
          <group name="CC_Base_Body_1">
            <group name="CC_Base_Body_primitive0_1" />
            <group name="CC_Base_Body_primitive1_1" />
            <group name="CC_Base_Body_primitive2_1" />
            <group name="CC_Base_Body_primitive3_1" />
            <group name="CC_Base_Body_primitive4_1" />
            <group name="CC_Base_Body_primitive5_1" />
          </group>
          <group name="CC_Base_Eye_1">
            <group name="CC_Base_Eye_primitive0_1" />
            <group name="CC_Base_Eye_primitive1_1" />
            <group name="CC_Base_Eye_primitive2_1" />
            <group name="CC_Base_Eye_primitive3_1" />
          </group>
          <group name="CC_Base_EyeOcclusion_1">
            <group name="CC_Base_EyeOcclusion_primitive0_1" />
            <group name="CC_Base_EyeOcclusion_primitive1_1" />
          </group>
          <group name="CC_Base_TearLine_1">
            <group name="CC_Base_TearLine_primitive0_1" />
            <group name="CC_Base_TearLine_primitive1_1" />
          </group>
          <group name="CC_Base_Teeth_1">
            <group name="CC_Base_Teeth_primitive0_1" />
            <group name="CC_Base_Teeth_primitive1_1" />
          </group>
          <group name="CC_Base_Tongue_1" />
          <group name="High_Heels_1" />
          <group name="Knee_length_skirt_1" />
          <group name="Rolled_sleeves_shirt_1" />
          <group name="Side_part_wavy_1">
            <group name="Side_part_wavy_primitive0_1" />
            <group name="Side_part_wavy_primitive1_1" />
          </group>
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Teeth_primitive0"
            geometry={nodes.CC_Base_Teeth_primitive0.geometry}
            material={materials.Std_Upper_Teeth}
            skeleton={nodes.CC_Base_Teeth_primitive0.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Teeth_primitive1"
            geometry={nodes.CC_Base_Teeth_primitive1.geometry}
            material={materials.Std_Lower_Teeth}
            skeleton={nodes.CC_Base_Teeth_primitive1.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="High_Heels_2"
            geometry={nodes.High_Heels_2.geometry}
            material={materials.High_Heels}
            skeleton={nodes.High_Heels_2.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Knee_length_skirt_2"
            geometry={nodes.Knee_length_skirt_2.geometry}
            material={materials.Knee_length_skirt}
            skeleton={nodes.Knee_length_skirt_2.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Rolled_sleeves_shirt_2"
            geometry={nodes.Rolled_sleeves_shirt_2.geometry}
            material={materials.Rolled_sleeves_shirt}
            skeleton={nodes.Rolled_sleeves_shirt_2.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Camila_Brow_primitive0"
            geometry={nodes.Camila_Brow_primitive0.geometry}
            material={materials.Female_Brow_Transparency}
            skeleton={nodes.Camila_Brow_primitive0.skeleton}
            morphTargetDictionary={
              nodes.Camila_Brow_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.Camila_Brow_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="Camila_Brow_primitive1"
            geometry={nodes.Camila_Brow_primitive1.geometry}
            material={materials.Female_Brow_Base_Transparency}
            skeleton={nodes.Camila_Brow_primitive1.skeleton}
            morphTargetDictionary={
              nodes.Camila_Brow_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.Camila_Brow_primitive1.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive0"
            geometry={nodes.CC_Base_Body_primitive0.geometry}
            material={materials.Std_Skin_Head}
            skeleton={nodes.CC_Base_Body_primitive0.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive1"
            geometry={nodes.CC_Base_Body_primitive1.geometry}
            material={materials.Std_Skin_Body}
            skeleton={nodes.CC_Base_Body_primitive1.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive1.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive2"
            geometry={nodes.CC_Base_Body_primitive2.geometry}
            material={materials.Std_Skin_Arm}
            skeleton={nodes.CC_Base_Body_primitive2.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive2.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive2.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive3"
            geometry={nodes.CC_Base_Body_primitive3.geometry}
            material={materials.Std_Skin_Leg}
            skeleton={nodes.CC_Base_Body_primitive3.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive3.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive3.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive4"
            geometry={nodes.CC_Base_Body_primitive4.geometry}
            material={materials.Std_Nails}
            skeleton={nodes.CC_Base_Body_primitive4.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive4.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive4.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Body_primitive5"
            geometry={nodes.CC_Base_Body_primitive5.geometry}
            material={materials.Std_Eyelash}
            skeleton={nodes.CC_Base_Body_primitive5.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Body_primitive5.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Body_primitive5.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Eye_primitive0"
            geometry={nodes.CC_Base_Eye_primitive0.geometry}
            material={materials.Std_Eye_R}
            skeleton={nodes.CC_Base_Eye_primitive0.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Eye_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Eye_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Eye_primitive1"
            geometry={nodes.CC_Base_Eye_primitive1.geometry}
            material={materials.Std_Cornea_R}
            skeleton={nodes.CC_Base_Eye_primitive1.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Eye_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Eye_primitive1.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Eye_primitive2"
            geometry={nodes.CC_Base_Eye_primitive2.geometry}
            material={materials.Std_Eye_L}
            skeleton={nodes.CC_Base_Eye_primitive2.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Eye_primitive2.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Eye_primitive2.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Eye_primitive3"
            geometry={nodes.CC_Base_Eye_primitive3.geometry}
            material={materials.Std_Cornea_L}
            skeleton={nodes.CC_Base_Eye_primitive3.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_Eye_primitive3.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_Eye_primitive3.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_EyeOcclusion_primitive0"
            geometry={nodes.CC_Base_EyeOcclusion_primitive0.geometry}
            material={materials.Std_Eye_Occlusion_R}
            skeleton={nodes.CC_Base_EyeOcclusion_primitive0.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_EyeOcclusion_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_EyeOcclusion_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_EyeOcclusion_primitive1"
            geometry={nodes.CC_Base_EyeOcclusion_primitive1.geometry}
            material={materials.Std_Eye_Occlusion_L}
            skeleton={nodes.CC_Base_EyeOcclusion_primitive1.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_EyeOcclusion_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_EyeOcclusion_primitive1.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_TearLine_primitive0"
            geometry={nodes.CC_Base_TearLine_primitive0.geometry}
            material={materials.Std_Tearline_R}
            skeleton={nodes.CC_Base_TearLine_primitive0.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_TearLine_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_TearLine_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_TearLine_primitive1"
            geometry={nodes.CC_Base_TearLine_primitive1.geometry}
            material={materials.Std_Tearline_L}
            skeleton={nodes.CC_Base_TearLine_primitive1.skeleton}
            morphTargetDictionary={
              nodes.CC_Base_TearLine_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.CC_Base_TearLine_primitive1.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="CC_Base_Tongue_2"
            geometry={nodes.CC_Base_Tongue_2.geometry}
            material={materials.Std_Tongue}
            skeleton={nodes.CC_Base_Tongue_2.skeleton}
            morphTargetDictionary={nodes.CC_Base_Tongue_2.morphTargetDictionary}
            morphTargetInfluences={nodes.CC_Base_Tongue_2.morphTargetInfluences}
          />
          <skinnedMesh
            frustumCulled={false}
            name="Side_part_wavy_primitive0"
            geometry={nodes.Side_part_wavy_primitive0.geometry}
            material={materials.Scalp_Transparency}
            skeleton={nodes.Side_part_wavy_primitive0.skeleton}
            morphTargetDictionary={
              nodes.Side_part_wavy_primitive0.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.Side_part_wavy_primitive0.morphTargetInfluences
            }
          />
          <skinnedMesh
            frustumCulled={false}
            name="Side_part_wavy_primitive1"
            geometry={nodes.Side_part_wavy_primitive1.geometry}
            material={materials.Hair_Transparency}
            skeleton={nodes.Side_part_wavy_primitive1.skeleton}
            morphTargetDictionary={
              nodes.Side_part_wavy_primitive1.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.Side_part_wavy_primitive1.morphTargetInfluences
            }
          />
        </group>
        <group name="Idle" scale={0.01}>
          <group name="Shadow_Catcher" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="CC_Base_Pivot" position={[0, 0, -1.53]}>
              <group name="Plane_001" position={[0, 0, 1.59]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/Amber.glb");
