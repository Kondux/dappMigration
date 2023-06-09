/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
myprofile: mfhscoobydoo (https://sketchfab.com/mfhscoobydoo)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/583f5c5cd3534f4da86105d54c6753aa
title: Funky Hover Boots Sculpt
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Hoverboots({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/hoverboots.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                    geometry={nodes.mesh_0.geometry}
                    material={nodes.mesh_0.material}
                />
                <mesh
                    geometry={nodes.mesh_1.geometry}
                    material={nodes.mesh_1.material}
                />
                <mesh
                    geometry={nodes.mesh_2.geometry}
                    material={nodes.mesh_2.material}
                />
                <mesh
                    geometry={nodes.mesh_3.geometry}
                    material={nodes.mesh_3.material}
                />
                <mesh
                    geometry={nodes.mesh_4.geometry}
                    material={materials.Hover}
                />
            </group>
        </group>
    );
}

// useGLTF.preload("/hoverboots.glb");
