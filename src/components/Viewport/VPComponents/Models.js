import React, { useRef, useEffect } from "react";
import {
  Text,
  useGLTF,
  OrbitControls,
  AdaptiveDpr,
  useAnimations,
  Sphere,
  Reflector,
  useTexture,
  Stats,
  MeshReflectorMaterial,
  Html,
  useProgress,
  useFBX,
  Stars,
  Cloud,
  Sky,
  PresentationControls,
  Center,
} from "@react-three/drei";

export function CyberCity({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/CyberCity.fbx");
  const { animations } = useFBX("/CyberCity.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    // actions["metarig.001|metarigAction"].play();
    // actions["mixamo.com"].play();
    // actions["Armature|Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.012}
        position={[0, -1.5, -0.1]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function AnimatedCow({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/AnimatedCow.fbx");
  const { animations } = useFBX("/AnimatedCow.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    // console.log("This is MODEL ACTIONS", actions);
    setTimeout(() => {
      actions["grp1|Action"].play();
    }, 0);
  });
  return (
    <group ref={fbxRef} {...props}>
      <primitive
        object={fbx}
        scale={0.0015}
        position={[0, 0, 0]}
        rotation={[-1.6, 0, 0]}
      />
    </group>
  );
}

export function AnimatedCow2({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/AnimatedCow2.fbx");
  const { animations } = useFBX("/AnimatedCow2.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["grp1|Action"].play();
    }, 0);
    // console.log("This is MODEL ACTIONS", actions);
  });
  return (
    <group ref={fbxRef} {...props}>
      <primitive
        object={fbx}
        scale={0.0015}
        position={[0, 0, 0]}
        rotation={[-1.6, 0, 0]}
      />
    </group>
  );
}

// Real Cows

export function AnimatedRealCow({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/AnimatedRealCow.fbx");
  const { animations } = useFBX("/AnimatedRealCow.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["cow.1|Action"].play();
    }, 0);
    // console.log("This is MODEL ACTIONS", actions);
  });
  return (
    <group ref={fbxRef} {...props}>
      <primitive
        object={fbx}
        scale={0.0051}
        position={[0, 0, 0]}
        rotation={[-1.6, 0, 0]}
      />
    </group>
  );
}

export function AnimatedRealCow2({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/AnimatedRealCow2.fbx");
  const { animations } = useFBX("/AnimatedRealCow2.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["cow.1|Action"].play();
    }, 0);
    // console.log("This is MODEL ACTIONS", actions);
  });
  return (
    <group ref={fbxRef} {...props}>
      <primitive
        object={fbx}
        scale={0.0051}
        position={[0, 0, 0]}
        rotation={[-1.6, 0, 0]}
      />
    </group>
  );
}

export function Animation({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Running.fbx");
  const { animations } = useFBX("/Running.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // console.log("This is ACTIONS", actions);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.012}
        position={[0, -1, -0.22]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function Breakdance1({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Breakdance1.fbx");
  const { animations } = useFBX("/Breakdance1.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.012}
        position={[-3.5, -1, -6]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function Breakdance2({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Breakdance2.fbx");
  const { animations } = useFBX("/Breakdance2.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.012}
        position={[3.5, -1, -6]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Backup Dancer Greys
export function Animation2({ ...props }) {
  const fbxRef2 = useRef();
  const fbx2 = useFBX("/Twerk2.fbx");
  const { animations } = useFBX("/Twerk2.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef2
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // actions["Armature|Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={fbxRef2}>
      <primitive
        object={fbx2}
        scale={0.005}
        position={[-1.8, 3.5, 1.5]}
        rotation={[0, 2, 0]}
      />
    </group>
  );
}

export function Animation3({ ...props }) {
  const fbxRef3 = useRef();
  const fbx3 = useFBX("/Twerk3.fbx");
  const { animations } = useFBX("/Twerk3.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef3
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // actions["Armature|Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={fbxRef3}>
      <primitive
        object={fbx3}
        scale={0.005}
        position={[1.5, 3.5, 1.9]}
        rotation={[0, -2, 0]}
      />
    </group>
  );
}

export function Animation4({ ...props }) {
  const fbxRef4 = useRef();
  const fbx4 = useFBX("/Twerk4.fbx");
  const { animations } = useFBX("/Twerk4.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef4
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);

    // actions["Armature|Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={fbxRef4}>
      <primitive
        object={fbx4}
        scale={0.005}
        position={[1.2, 3.55, -2]}
        rotation={[0, -1, 0]}
      />
    </group>
  );
}

export function DiscoBall({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/disco_ball.fbx");
  const { animations } = useFBX("/disco_ball.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    // console.log("This is ACTIONS", actions);
    setTimeout(() => {
      actions["disco_ball|raotation"].play();
    }, 0);

    // actions["Armature|Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.004}
        position={[0, 1.91, -0.1]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function Ship({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Ship.fbx");
  // const { animations } = useFBX("/disco_ball.fbx");
  // const { ref, mixer, names, actions, clips } = useAnimations(
  //   animations,
  //   fbxRef
  // );
  // useEffect(() => {
  //   // console.log("This is ACTIONS", actions);
  //   setTimeout(() => {
  //     actions["disco_ball|raotation"].play();
  //   }, 0);

  //   // actions["Armature|Armature|mixamo.com|Layer0"].play();
  // });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.00025}
        position={[-7.25, -1.5, -4.5]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

export function Ship2({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Ship2.fbx");
  // const { animations } = useFBX("/disco_ball.fbx");
  // const { ref, mixer, names, actions, clips } = useAnimations(
  //   animations,
  //   fbxRef
  // );
  // useEffect(() => {
  //   // console.log("This is ACTIONS", actions);
  //   setTimeout(() => {
  //     actions["disco_ball|raotation"].play();
  //   }, 0);

  //   // actions["Armature|Armature|mixamo.com|Layer0"].play();
  // });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.004}
        position={[-23.89, 21.85, -21.6]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

export function Yelling({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Yelling.fbx");
  const { animations } = useFBX("/Yelling.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // console.log("This is ACTIONS", actions);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.012}
        position={[0, -0.8, 1]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function Seated({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/Seated.fbx");
  const { animations } = useFBX("/Seated.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // console.log("This is ACTIONS", actions);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.015}
        position={[0, -1, 1]}
        rotation={[-0.4, 0, 0]}
      />
    </group>
  );
}

// MOBILE LO-RES MODELS

export function RunningMobile({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/RunningMobile.fbx");
  const { animations } = useFBX("/RunningMobile.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // console.log("This is ACTIONS", actions);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.03}
        position={[0, -1, -0.1]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export function SeatedMobile({ ...props }) {
  const fbxRef = useRef();
  const fbx = useFBX("/SeatedMobile.fbx");
  const { animations } = useFBX("/SeatedMobile.fbx");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    fbxRef
  );
  useEffect(() => {
    setTimeout(() => {
      actions["mixamo.com"].play();
    }, 0);
    // console.log("This is ACTIONS", actions);
  });
  return (
    <group ref={fbxRef}>
      <primitive
        object={fbx}
        scale={0.03}
        position={[0, -0.6, 1.25]}
        rotation={[-0.8, 0, 0]}
      />
    </group>
  );
}
////

// useFBX.preload("/CyberCity.fbx");
// useFBX.preload("/RunningMobile.fbx");
// useFBX.preload("/Running.fbx");

// useFBX.preload("/Breakdance1.fbx");
// useFBX.preload("/Breakdance2.fbx");

// useFBX.preload("/AnimatedCow.fbx");
// useFBX.preload("/AnimatedCow2.fbx");
// useFBX.preload("/AnimatedRealCow.fbx");
// useFBX.preload("/AnimatedRealCow2.fbx");

// useFBX.preload("/Twerk2.fbx");
// useFBX.preload("/Twerk3.fbx");
// useFBX.preload("/Twerk4.fbx");

// useFBX.preload("/disco_ball.fbx");
// useFBX.preload("/Ship2.fbx");
// useFBX.preload("/Seated.fbx");
// useFBX.preload("/SeatedMobile.fbx");

// useFBX.preload("/Yelling.fbx");
