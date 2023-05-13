/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
myprofile: X-ray (https://sketchfab.com/X-ray)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/models/a31a127d003e49abbe9645a62031729d
title: Elemental sword (ice)
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Sword({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/sword.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group position={[0, 6.2, 2.28]} rotation={[0.71, 0, Math.PI]}>
                    <group position={[-4.91, -13.46, -74.83]}>
                        <mesh
                            geometry={nodes.mesh_0.geometry}
                            material={materials.material_0}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

// useGLTF.preload("/sword.glb");
