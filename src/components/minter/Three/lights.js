// Component: Lights
// Def: Lights for our canvas

import React from "react";

const Lights = () => {
    return (
        <>
            <fog attach="fog" args={["#fff", 0, 22]} />
            <ambientLight intensity={5} />
            <directionalLight
                color="lightblue"
                castShadow
                position={[0, 8, 2]}
                intensity={20}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={100}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />
            <pointLight color="lightblue" position={[0, 50, 0]} intensity={2} />
        </>
    );
};

export default Lights;
