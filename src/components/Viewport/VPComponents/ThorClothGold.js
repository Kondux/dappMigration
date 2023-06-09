/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function ThorClothGold({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/ThorClothGold-transformed.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          geometry={nodes.CC_Base_Body001_primitive0.geometry}
          material={materials["Std_Skin_Head.001_B100"]}
        />
        <mesh
          geometry={nodes.CC_Base_Body001_primitive1.geometry}
          material={materials["Std_Skin_Body.001_B101"]}
        />
        <mesh
          geometry={nodes.CC_Base_Body001_primitive2.geometry}
          material={materials["Std_Skin_Arm.001_B102"]}
        />
        <mesh
          geometry={nodes.CC_Base_Body001_primitive3.geometry}
          material={materials["Std_Skin_Leg.001_B103"]}
        />
        <mesh
          geometry={nodes.CC_Base_Body001_primitive4.geometry}
          material={materials["Std_Nails.001_B104"]}
        />
        <mesh
          geometry={nodes.CC_Base_Body001_primitive5.geometry}
          material={materials["Std_Eyelash.001_B105"]}
        />
        <mesh
          geometry={nodes.CC_Base_EyeOcclusion001_primitive0.geometry}
          material={materials["Std_Eye_Occlusion_R.001"]}
        />
        <mesh
          geometry={nodes.CC_Base_EyeOcclusion001_primitive1.geometry}
          material={materials["Std_Eye_Occlusion_L.001"]}
        />
        <mesh
          geometry={nodes.CC_Base_TearLine001_primitive0.geometry}
          material={materials["Std_Tearline_R.001"]}
        />
        <mesh
          geometry={nodes.CC_Base_TearLine001_primitive1.geometry}
          material={materials["Std_Tearline_L.001"]}
        />
        <mesh
          geometry={nodes.CC_Base_Teeth001_primitive0.geometry}
          material={materials["Std_Upper_Teeth.001_B106"]}
        />
        <mesh
          geometry={nodes.CC_Base_Teeth001_primitive1.geometry}
          material={materials["Std_Lower_Teeth.001_B107"]}
        />
        <mesh
          geometry={nodes.Custom_Eye001_primitive0.geometry}
          material={materials["__Cornea.001_B110"]}
        />
        <mesh
          geometry={nodes.Custom_Eye001_primitive1.geometry}
          material={materials["__Eyes.001_B111"]}
        />
        <mesh
          geometry={nodes.Custom_Eye001_primitive2.geometry}
          material={materials["__Iris.001_B112"]}
        />
        <mesh
          geometry={nodes.Custom_Eye001_primitive3.geometry}
          material={materials["__Pupil.001_B113"]}
        />
        <mesh
          geometry={nodes.Female_Angled001_primitive0.geometry}
          material={materials["Female_Angled_Transparency.001_B114"]}
        />
        <mesh
          geometry={nodes.Female_Angled001_primitive1.geometry}
          material={materials["Female_Angled_Base_Transparency.001_B115"]}
        />
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[0, -0.38, 100.16]} rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[0.13, 0, 0]}>
              <group
                position={[9.95, -1.79, -1.38]}
                rotation={[-0.11, 0, 3.12]}
              >
                <group position={[0, 47.57, 0]} rotation={[-0.02, 0, 0.01]}>
                  <group
                    position={[0.01, 46.81, 0]}
                    rotation={[1.29, -0.02, 0.11]}
                  >
                    <group
                      position={[0, 15.41, 0]}
                      rotation={[0.34, 0.04, -0.06]}
                    />
                  </group>
                </group>
              </group>
              <group
                position={[-9.95, -1.79, -1.38]}
                rotation={[-0.11, 0, -3.12]}
              >
                <group position={[0, 47.52, 0]} rotation={[-0.02, 0, -0.01]}>
                  <group
                    position={[-0.01, 46.86, 0]}
                    rotation={[1.29, 0.02, -0.11]}
                  >
                    <group
                      position={[0, 15.41, 0]}
                      rotation={[0.34, -0.04, 0.06]}
                    />
                  </group>
                </group>
              </group>
            </group>
            <group position={[0, 7.99, 1.04]} rotation={[0.22, 0, 0]}>
              <group position={[0, 4.44, 0]} rotation={[-0.37, 0, 0]}>
                <group position={[0, 14.48, 0]}>
                  <group position={[0, 26.64, -0.04]} rotation={[0.42, 0, 0]}>
                    <group position={[0, 3.22, 0]} rotation={[-0.08, 0, 0]}>
                      <group position={[0, 3.99, 0]} rotation={[-0.19, 0, 0]}>
                        <group rotation={[1.57, Math.PI / 2, 0]}>
                          <group
                            position={[1.26, 2.37, -0.02]}
                            rotation={[0, 0, 1.57]}
                          >
                            <group
                              position={[3.25, 0.69, -0.01]}
                              rotation={[0, -0.02, 0.06]}
                            >
                              <group
                                position={[1.13, 0, 0]}
                                rotation={[0, 0.01, 0.17]}
                              />
                            </group>
                          </group>
                          <group
                            position={[3.05, 6.4, -0.02]}
                            rotation={[0, 0, 1.57]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    position={[5.24, 20.87, 0.07]}
                    rotation={[0.19, 0.22, -1.58]}
                  >
                    <group
                      position={[0, 13.3, 0]}
                      rotation={[0.21, 0.01, -0.51]}
                    >
                      <group position={[0, 29.87, 0]} rotation={[0.03, 0, 0]}>
                        <group
                          position={[0.04, 24.31, 0.01]}
                          rotation={[-0.13, 0, 0.03]}
                        >
                          <group
                            position={[0.84, 9.64, -1.89]}
                            rotation={[0.12, 0, -0.02]}
                          >
                            <group
                              position={[0, 3.05, 0]}
                              rotation={[-0.01, 0, -0.04]}
                            />
                          </group>
                          <group
                            position={[0, 9.71, 0]}
                            rotation={[0.12, 0, -0.01]}
                          >
                            <group
                              position={[0, 4.4, 0]}
                              rotation={[-0.01, 0, -0.06]}
                            />
                          </group>
                          <group
                            position={[-0.62, 10, 1.96]}
                            rotation={[0.13, -0.01, -0.02]}
                          >
                            <group
                              position={[0, 4.77, 0]}
                              rotation={[0, 0.01, -0.02]}
                            />
                          </group>
                          <group
                            position={[-0.43, 9.8, 4.42]}
                            rotation={[0.11, -0.01, -0.03]}
                          >
                            <group
                              position={[0, 4.65, 0]}
                              rotation={[0.02, 0.01, -0.04]}
                            />
                          </group>
                          <group
                            position={[0.47, 1.41, 2.97]}
                            rotation={[0.94, -0.28, 0.01]}
                          >
                            <group
                              position={[0, 7.25, 0]}
                              rotation={[-0.35, 0, 0.1]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    position={[11.03, 3.39, 10.58]}
                    rotation={[-1.43, 0, 3.14]}
                  />
                  <group
                    position={[-11.03, 3.4, 10.58]}
                    rotation={[-1.43, 0, 3.14]}
                  />
                  <group
                    position={[-5.24, 20.87, 0.07]}
                    rotation={[0.19, -0.22, 1.58]}
                  >
                    <group
                      position={[0, 13.3, 0]}
                      rotation={[0.21, -0.01, 0.51]}
                    >
                      <group position={[0, 29.87, 0]} rotation={[0.03, 0, 0]}>
                        <group
                          position={[-0.04, 24.31, 0.01]}
                          rotation={[-0.13, 0, -0.03]}
                        >
                          <group
                            position={[0, 9.71, 0]}
                            rotation={[0.12, 0, 0.01]}
                          >
                            <group
                              position={[0, 4.4, 0]}
                              rotation={[-0.01, 0, 0.06]}
                            />
                          </group>
                          <group
                            position={[0.62, 10, 1.96]}
                            rotation={[0.13, 0.01, 0.02]}
                          >
                            <group
                              position={[0, 4.77, 0]}
                              rotation={[0, -0.01, 0.02]}
                            />
                          </group>
                          <group
                            position={[-0.47, 1.41, 2.97]}
                            rotation={[0.94, 0.28, -0.01]}
                          >
                            <group
                              position={[0, 7.25, 0]}
                              rotation={[-0.35, 0, -0.1]}
                            />
                          </group>
                          <group
                            position={[0.43, 9.8, 4.42]}
                            rotation={[0.11, 0.01, 0.03]}
                          >
                            <group
                              position={[0, 4.65, 0]}
                              rotation={[0.03, -0.01, 0.04]}
                            />
                          </group>
                          <group
                            position={[-0.84, 9.64, -1.89]}
                            rotation={[0.12, 0, 0.02]}
                          >
                            <group
                              position={[0, 3.05, 0]}
                              rotation={[-0.01, 0, 0.04]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
        <mesh
          geometry={nodes.CC_Base_Tongue001.geometry}
          material={materials["Std_Tongue.001_B108"]}
        />
        <mesh
          geometry={nodes.Chin_Curtain_Sparse001.geometry}
          material={materials["Beard_Transparency.001_B109"]}
        />
        <mesh
          geometry={nodes.Ramesses_M_Cuirass_L001.geometry}
          material={materials["Ramesses_M_Cuirass_L.001_B116"]}
        />
        <mesh
          geometry={nodes.Ramesses_M_Headress_L001.geometry}
          material={materials["Ramesses_M_Headress_L.001_B117"]}
        />
        <mesh
          geometry={nodes.Ramesses_M_Pants_L001.geometry}
          material={materials["Ramesses_M_Pants_L.001_B118"]}
        />
        <mesh
          geometry={nodes.Ramesses_M_Pouldrons_L001.geometry}
          material={materials["Ramesses_M_Pouldrons_L.001_B119"]}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/ThorClothGold-transformed.glb");
