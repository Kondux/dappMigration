/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
myprofile: Yxboireal (https://sketchfab.com/Yeboireal)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/mandalorian-jetpack-8903972f5639497d9248a69eda3a3703
title: Mandalorian Jetpack
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Jetpack({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/jetpack.glb");
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}
                    >
                        <primitive object={nodes._rootJoint} />
                        <skinnedMesh
                            frustumCulled={false}
                            geometry={
                                nodes
                                    .Cosmos_JetPack_Gadgetmo_MI_Cosmos_JetPack_0
                                    .geometry
                            }
                            material={materials.MI_Cosmos_JetPack}
                            skeleton={
                                nodes
                                    .Cosmos_JetPack_Gadgetmo_MI_Cosmos_JetPack_0
                                    .skeleton
                            }
                        />
                        <skinnedMesh
                            frustumCulled={false}
                            geometry={
                                nodes
                                    .Cosmos_JetPack_Gadgetmo_MI_Jetpack_FuelLevel_0
                                    .geometry
                            }
                            material={materials.MI_Jetpack_FuelLevel}
                            skeleton={
                                nodes
                                    .Cosmos_JetPack_Gadgetmo_MI_Jetpack_FuelLevel_0
                                    .skeleton
                            }
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

// useGLTF.preload("/jetpack.glb");
