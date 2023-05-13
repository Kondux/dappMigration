/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: DaveAlmz (https://sketchfab.com/DavidAlmanza)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/80s-warehouse-a05aff011ef04f1797013781437c18cf
title: 80s Warehouse
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Warehouse({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/warehouse.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.06, 0, 10.21]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box029_ladrillo_0.geometry}
              material={materials.ladrillo}
            />
          </group>
          <group position={[15.48, 0, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Line001_ladrillo_0.geometry}
              material={materials.ladrillo}
            />
          </group>
          <group
            position={[1.32, 0, -5.58]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 0.24, 1]}
          >
            <mesh
              geometry={nodes._escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group
            position={[13.12, 3.05, -7.03]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={nodes.Line002_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[27.71, 0, -7.03]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["Line004_Material_#458_0"].geometry}
              material={materials.Material_458}
            />
          </group>
          <group position={[20.47, 3.29, -7.6]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Line006_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[8.35, 3.45, -7.82]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Rectangle002_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[13.12, 5.2, -7.03]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Line007_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[24.94, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle005_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[20.23, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle006_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[15.46, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle007_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[10.75, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle008_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[29.57, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle010_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[3.7, 5.6, 2.32]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Line013_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[-0.85, 5.6, 2.32]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Line014_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[1.32, 0, -1.27]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box030_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[3.66, 0, 4.47]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box035_ladrillo_0.geometry}
              material={materials.ladrillo}
            />
          </group>
          <group position={[3.67, 3.19, 7.84]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 5.52, 0.15]}>
              <mesh
                geometry={nodes.Line022_ladrillo_0.geometry}
                material={materials.ladrillo}
              />
            </group>
          </group>
          <group position={[20.12, 3.2, 7.84]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Rectangle011_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[10.75, 4.32, -5.55]}>
            <mesh
              geometry={nodes.Rectangle012_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[6.04, 4.32, -5.55]}>
            <mesh
              geometry={nodes.Rectangle013_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[15.45, 4.32, -5.55]}>
            <mesh
              geometry={nodes.Rectangle014_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group
            position={[20.91, 3.45, -7.87]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={nodes["Line024_Material_#26_0"].geometry}
              material={materials.Material_26}
            />
          </group>
          <group
            position={[18.74, 3.41, -6.48]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={nodes.Line025_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[5.6, 2.15, -3.54]} rotation={[3.06, -1.02, 3.07]} />
          <group position={[15.42, 0, 0.13]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["piso_Material_#28_0"].geometry}
              material={materials.Material_28}
            />
          </group>
          <group position={[31.46, 0, -0.14]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["pantalla_Material_#407_0"].geometry}
              material={materials.Material_407}
            />
            <mesh
              geometry={nodes["pantalla_Material_#411_0"].geometry}
              material={materials.Material_411}
            />
          </group>
          <group position={[3.98, 1.18, -6.52]} rotation={[0, -1.13, 0]} />
          <group
            position={[3.67, 3.23, -7.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 0.92, 0.74]}
          >
            <group position={[0, 5.52, 0.15]}>
              <mesh
                geometry={nodes.Line031_escaleras_0.geometry}
                material={materials.escaleras}
              />
            </group>
          </group>
          <group
            position={[-1.07, 3.23, -7.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 0.92, 0.74]}
          >
            <group position={[0, 5.52, 0.15]}>
              <mesh
                geometry={nodes.Line032_escaleras_0.geometry}
                material={materials.escaleras}
              />
            </group>
          </group>
          <group position={[13.49, 2, -3.62]} rotation={[-2.98, -1.01, -3]} />
          <group
            position={[14.72, 1.04, -0.37]}
            rotation={[1.76, -1.46, 1.76]}
          />
          <group position={[24.88, 1.6, 10.1]}>
            <mesh
              geometry={nodes.Cylinder002_SixBack_0.geometry}
              material={materials.SixBack}
            />
          </group>
          <group position={[15.53, 1.6, 9.91]}>
            <mesh
              geometry={nodes.Cylinder004_morrisey_0.geometry}
              material={materials.morrisey}
            />
          </group>
          <group
            position={[13.21, 1.33, -1.45]}
            rotation={[-Math.PI, -0.87, Math.PI]}
          />
          <group position={[6.07, 3.67, 5.3]}>
            <mesh
              geometry={nodes.Rectangle036_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group position={[5.27, 1.15, 1.04]} rotation={[3.05, -0.18, 3.13]} />
          <group position={[8.49, 0, 7.67]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box063_ladrillo_0.geometry}
              material={materials.ladrillo}
            />
          </group>
          <group position={[13.04, 0, 7.67]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box064_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group
            position={[10.54, 1.09, 4.36]}
            rotation={[3.13, -0.03, 3.14]}
          />
          <group position={[10.67, 1.14, -7.73]} rotation={[0, -1.56, 0]} />
          <group
            position={[17.93, 1.64, -0.39]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <group position={[9.13, 1.53, 4]} rotation={[-3.02, -0.48, -3.09]} />
          <group
            position={[17.83, 1.16, -2.12]}
            rotation={[2.93, -1.4, 2.94]}
          />
          <group
            position={[1.75, 1.22, -6.66]}
            rotation={[-0.57, -0.67, -0.38]}
          />
          <group
            position={[9.19, 3.08, 2.8]}
            rotation={[-0.71, -0.87, -0.58]}
          />
          <group
            position={[15.83, 1.58, -1.02]}
            rotation={[0.37, 1.33, -0.37]}
          />
          <group
            position={[-1, 0, -3.01]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              geometry={nodes.Box072_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group
            position={[-1, 0, -7.64]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              geometry={nodes.Box073_escaleras_0.geometry}
              material={materials.escaleras}
            />
          </group>
          <group
            position={[3.95, 0, -3.01]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              geometry={nodes["mrWrl_Material_#436_0"].geometry}
              material={materials.Material_436}
            />
          </group>
          <group position={[15.46, 5.7, 0.09]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Rectangle043_techo_0.geometry}
              material={materials.techo}
            />
          </group>
          <group
            position={[20.18, 1.51, 5.45]}
            rotation={[Math.PI, 0, Math.PI]}
          >
            <mesh
              geometry={nodes.Plane002_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[22.13, 3.79, -0.8]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[22.52, 0.12, 4.9]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[27.19, 0.12, 4.94]} rotation={[0, 0, Math.PI]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[30.88, 0.12, 4.94]} rotation={[0, 0, Math.PI]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[17.68, 0.12, 4.9]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[12.74, 0.12, 4.9]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[8.39, 0.12, 4.9]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[8.39, 0.12, -0.11]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[8.39, 0.12, -5.06]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[13.14, 0.12, -5.06]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[17.83, 0.12, -5.06]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[24.32, 0.12, -5.06]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[27.27, 0.12, -5.06]} rotation={[0.01, 0.64, 3.13]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group
            position={[21.77, 1.96, 5.34]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.4}
          >
            <mesh
              geometry={nodes["Line146_Material_#434_0"].geometry}
              material={materials.Material_434}
            />
          </group>
          <group
            position={[19.27, 1.55, 1.17]}
            rotation={[3.05, -0.16, 3.13]}
          />
          <group position={[0.13, 0.91, -9.83]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.lamparas_lamparas_0.geometry}
              material={materials.lamparas}
            />
          </group>
          <group position={[20.18, 1.6, 10.03]}>
            <mesh
              geometry={nodes.Cylinder005_ianBck_0.geometry}
              material={materials.ianBck}
            />
          </group>
          <group
            position={[4.34, -1.25, -1.67]}
            rotation={[0.03, -1.08, -3.12]}
          >
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[4.34, -1.25, -4]} rotation={[0.03, -1.08, -3.12]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[10.59, 3.79, -0.8]}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group position={[28.74, 3.06, -5.48]}>
            <mesh
              geometry={nodes["NonRos_Material_#457_0"].geometry}
              material={materials.Material_457}
            />
          </group>
          <group position={[28.95, 2.59, -5.48]}>
            <mesh
              geometry={nodes["NonAzl2_Material_#456_0"].geometry}
              material={materials.Material_456}
            />
          </group>
          <group position={[26.3, 1.44, 0.7]} rotation={[0.19, -0.45, 0.09]} />
          <group position={[29.86, 1.6, 10.1]}>
            <mesh
              geometry={nodes["Cylinder006_Material_#529_0"].geometry}
              material={materials.Material_529}
            />
          </group>
          <group position={[20.07, 1.54, 5.51]}>
            <mesh
              geometry={nodes["Line167_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group position={[24.83, 1.54, 5.51]} scale={[0.96, 1, 1]}>
            <mesh
              geometry={nodes["Line168_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[24.94, 1.51, 5.45]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane007_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[29.43, 1.54, 5.51]} scale={[0.92, 1, 1]}>
            <mesh
              geometry={nodes["Line169_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[29.54, 1.51, 5.45]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.92, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane008_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[15.35, 1.54, 5.51]} scale={[0.96, 1, 1]}>
            <mesh
              geometry={nodes["Line170_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[15.46, 1.51, 5.45]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane009_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[15.35, 1.54, -7.8]} scale={[0.96, 1, 1]}>
            <mesh
              geometry={nodes["Line171_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[15.46, 1.51, -7.85]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane010_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group
            position={[13.16, 1.54, -7.86]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.86, 1, 1]}
          >
            <mesh
              geometry={nodes["Line172_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[13.22, 1.51, -7.76]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.86, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane011_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group
            position={[17.56, 1.54, -7.92]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes["Line173_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[17.62, 1.51, -7.82]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane012_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[20.03, 1.54, -5.31]} scale={[0.96, 1, 1]}>
            <mesh
              geometry={nodes["Line174_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[20.13, 1.51, -5.37]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.96, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane013_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[24.45, 1.54, -5.31]} scale={[1.06, 1, 1]}>
            <mesh
              geometry={nodes["Line175_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[24.56, 1.51, -5.37]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.06, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane014_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group
            position={[8.44, 1.54, -7.86]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.86, 1, 1]}
          >
            <mesh
              geometry={nodes["Line176_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[8.49, 1.51, -7.76]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.86, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane015_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[10.8, 1.54, -7.8]} scale={[1.08, 1, 1]}>
            <mesh
              geometry={nodes["Line177_Material_#462_0"].geometry}
              material={materials.Material_462}
            />
          </group>
          <group
            position={[10.92, 1.51, -7.85]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.08, 1, 1]}
          >
            <mesh
              geometry={nodes.Plane016_reja_0.geometry}
              material={materials.reja}
            />
          </group>
          <group position={[29.74, 5, 2.71]}>
            <mesh
              geometry={nodes.lmpTech_lamparas_techo_0.geometry}
              material={materials.lamparas_techo}
            />
          </group>
          <group position={[12.63, 3.53, 4.93]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder007_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[17.39, 3.53, 4.93]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder008_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[22.28, 3.53, 4.93]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder009_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[26.88, 3.53, 4.93]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder010_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[27.52, 3.53, -5]} rotation={[Math.PI, 0, Math.PI]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder011_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[22.98, 3.53, -5]} rotation={[Math.PI, 0, Math.PI]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder012_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[19.02, 3.53, -5]} rotation={[Math.PI, 0, Math.PI]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder013_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[8.4, 2.84, 0.42]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["NonRos_Material_#456_0"].geometry}
              material={materials.Material_456}
            />
          </group>
          <group position={[3.71, 2.75, -5.58]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["NonAzl_Material_#457_0"].geometry}
              material={materials.Material_457}
            />
          </group>
          <group
            position={[22.16, 0.06, -5.05]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={nodes["torre_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group position={[18.2, 0.06, -5.05]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["torre009_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[26.69, 0.06, -5.05]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={nodes["torre010_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[27.69, 0.06, 4.96]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              geometry={nodes["torre011_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[23.1, 0.06, 4.96]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              geometry={nodes["torre012_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[18.2, 0.06, 4.96]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              geometry={nodes["torre013_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[13.45, 0.06, 4.98]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              geometry={nodes["torre014_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group
            position={[23.47, 0, -5.46]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[-1, 1, 1]}
          >
            <mesh
              geometry={nodes["escalera_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
          <group position={[9.46, 3.53, -5]} rotation={[Math.PI, 0, Math.PI]}>
            <group position={[0, 0, -0.4]}>
              <mesh
                geometry={nodes["Cylinder014_Material_#475_0"].geometry}
                material={materials.Material_475}
              />
            </group>
          </group>
          <group position={[8.65, 0.06, -5.05]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes["torre015_Material_#121_0"].geometry}
              material={materials.Material_121}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/warehouse.glb");