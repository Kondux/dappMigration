/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export default function JoroArmorOnly({
  eyecolor,
  color,
  armor,
  skin,
  head,
  weapon,
  armorVariant,
  animationClip,
  ...props
}) {
  const { nodes, materials } = useGLTF("/Assets/JoroArmorOnly.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -0.02]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Nano_M_Suit_H_1.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_2.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_3.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_4.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_5.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_6.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_7.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_8.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_9.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_10.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_11.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_12.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_13.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_14.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_15.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_16.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_17.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_18.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_19.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_20.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_21.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_22.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_23.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_24.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_25.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_26.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_27.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_28.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_29.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_30.geometry}
            material={materials.Ribs}
          />
          <mesh
            geometry={nodes.Nano_M_Suit_H_31.geometry}
            material={materials.Ribs}
          />
        </group>
      </group>
      {/* <PerspectiveCamera makeDefault={false} far={2.69} near={0} fov={22.89} position={[0.55, 0.32, 0.55]} rotation={[-0.36, 0.75, 0.25]} /> */}
    </group>
  );
}

// useGLTF.preload("/Assets/JoroArmorOnly.glb");
