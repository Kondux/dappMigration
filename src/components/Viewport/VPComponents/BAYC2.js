/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function BAYC2({ color, ...props }) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/BAYC2-transformed.glb");
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // console.log("This is BAYC MODEL ACTIONS", actions);
        setTimeout(() => {
            actions["Armature|mixamo.com|Layer0"].play();
        }, 0);
    });
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_1.geometry}
                    material={materials.Brown}
                    material-color={color}
                    skeleton={nodes.Plane_050_1.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_2.geometry}
                    material={materials.Brown_2}
                    skeleton={nodes.Plane_050_2.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_3.geometry}
                    material={materials.Eyelids}
                    skeleton={nodes.Plane_050_3.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_4.geometry}
                    material={materials.Iris}
                    skeleton={nodes.Plane_050_4.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_5.geometry}
                    material={materials.Sclera}
                    skeleton={nodes.Plane_050_5.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_6.geometry}
                    material={materials.Pupil}
                    skeleton={nodes.Plane_050_6.skeleton}
                />
                <skinnedMesh
                    frustumCulled={false}
                    geometry={nodes.Plane_050_7.geometry}
                    material={materials.Black}
                    skeleton={nodes.Plane_050_7.skeleton}
                />
            </group>
        </group>
    );
}

// useGLTF.preload("/BAYC2-transformed.glb");
