import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Spacer,
  Flex,
  Icon,
  useColorMode,
  Center,
  Skeleton,
  Container,
} from "@chakra-ui/react";
import {
  ARCanvas,
  Hands,
  useXR,
  Interactive,
  useHitTest,
  DefaultXRControllers,
} from "@react-three/xr";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Loader,
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { proxy, useProxy } from "valtio";
import {
  A11y,
  useA11y,
  A11yAnnouncer,
  useUserPreferences,
  A11ySection,
  A11yUserPreferencesContext,
} from "@react-three/a11y";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { useRoute, useLocation } from "wouter";
import getUuid from "uuid-by-string";
import { AwesomeButton } from "react-awesome-button";
import { useStore } from "./NFTBalance";

const GOLDENRATIO = 1.61803398875;

export default function Gallery({ images, nftImages, ...props }) {
  const [isFullScreenHeight, setFullScreenHeight] = useState("35vh");
  const [isFullScreenWidth, setFullScreenWidth] = useState("100%");
  const [isFullScreenPosition, setFullScreenPosition] = useState("static");

  const [arrowWidth, setArrowWidth] = useState(2);
  const [arrowHeight, setArrowHeight] = useState(1);
  const [size, setSize] = useState("medium");
  const [zIndex, setZIndex] = useState(0);

  const { count, inc, dec } = useStore();

  function fullscreenButton() {
    if (isFullScreenHeight === "35vh") {
      setFullScreenPosition("fixed");
      setFullScreenHeight("100vh");
      setFullScreenWidth("100vw");
      setArrowWidth(-8);
      setArrowHeight(3);
      setZIndex(1);
      // console.log("This is full screen", isFullScreen);
    } else {
      setFullScreenPosition("static");
      setFullScreenHeight("35vh");
      setFullScreenWidth("100%");
      setArrowWidth(2);
      setArrowHeight(1);
      setZIndex(0);
      // console.log("This is full screen", isFullScreen);
    }
  }

  // checks to see if width for buttons

  const checkWidth = () => {
    // check to see if there is an instance for ethAddress
    if (window.innerWidth < 1000) {
      setSize("small");
      // console.log("This is window width:", window.innerWidth);
    } else {
      setSize("medium");
      // console.log("This is window width:", window.innerWidth);
    }
  };

  const state = proxy({
    dark: false,
    motionDisabled: false,
    active: 0,
    rotation: 0,
    multiplier: 0,
  });

  // useEffect(() => {
  //   props.setMultiplier(state.multiplier);
  // }, [state.multiplier]);

  function Diamond({ position, rotation }) {
    const a11y = useA11y();
    return (
      <mesh position={position} rotation={rotation}>
        <tetrahedronBufferGeometry />
        <meshStandardMaterial
          metalness={1}
          roughness={0.8}
          color={a11y.focus || a11y.hover ? "#cc66dd" : "#ffffff"}
          emissive={a11y.focus ? "#cc4444" : a11y.hover ? "#339922" : "#003399"}
        />
      </mesh>
    );
  }

  function DecLogic() {
    const marker = count;
    if (marker > 0) {
      dec();
    } else {
      return;
    }
  }

  function IncLogic() {
    const marker = count + 7;
    if (marker < nftImages - 1) {
      inc();
    } else {
      return;
    }
  }

  function LeftNav({ left }) {
    // const snap = useProxy(state)
    const { viewport } = useThree();
    const radius = Math.min(16, viewport.width / 2.5);
    return (
      <A11y
        role="button"
        description={`Spin ${left ? "left" : "right"}`}
        dragThreshold={10}
        actionCall={() => {
          state.active = left ? DecLogic() : console.log(state.multiplier);
        }}
      >
        <Diamond
          position={[left ? -radius / 2 : radius, arrowHeight, arrowWidth]}
          rotation={[0, 0, -Math.PI / 4]}
          scale={[1, 1, 1]}
        >
          <meshBasicMaterial color="aqua" />
        </Diamond>
      </A11y>
    );
  }

  function RightNav({ left, right }) {
    // const snap = useProxy(state)
    const { viewport } = useThree();
    const radius = Math.min(16, viewport.width / 2.5);
    return (
      <A11y
        role="button"
        description={`Spin ${left ? "left" : "right"}`}
        dragThreshold={10}
        actionCall={() => {
          state.active = right ? IncLogic() : console.log(state.multiplier);
        }}
      >
        <Diamond
          position={[left ? -radius : radius / 2, arrowHeight, arrowWidth]}
          rotation={[0, 0, -Math.PI / 4]}
          scale={[1, 1, 1]}
        >
          <meshBasicMaterial color="aqua" />
        </Diamond>
      </A11y>
    );
  }

  return (
    <Box>
      <Canvas
        gl={{ alpha: false }}
        style={{
          display: "block",
          background: "#191920",
          height: `${isFullScreenHeight}`,
          width: `${isFullScreenWidth}`,
          position: `${isFullScreenPosition}`,
          left: 0,
          top: 0,
          zIndex: `${zIndex}`,
        }}
        dpr={[1, 1.5]}
        camera={{ fov: 70, position: [0, 2, 15] }}
      >
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#9c9cff", 0, 15]} />
        <Environment preset="city" />
        <LeftNav left />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
        </group>
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -5, 0]}
          opacity={0.4}
          width={30}
          height={30}
          blur={1}
          far={15}
        />
        <RightNav right />
      </Canvas>
      <Loader />
      <Flex mt={-20} p={5} align="center" justify="center">
        {isFullScreenHeight === "100vh" ? (
          <AwesomeButton
            style={{
              position: "fixed",
              top: "90vh",
              fontSize: "20px",
              zIndex: 20,
              marginRight: "-12px",
            }}
            size={size}
            type="primary"
            onPress={() => fullscreenButton()}
          >
            <Icon
              className="Icons"
              as={BsFullscreenExit}
              boxSize="6"
              color="on-accent-subtle"
            />

            {/* <Icon as={RiPauseLine} /> */}
          </AwesomeButton>
        ) : (
          <AwesomeButton
            style={{ fontSize: "20px", zIndex: 20, marginRight: "-12px" }}
            size={size}
            type="primary"
            onPress={() => fullscreenButton()}
          >
            <Icon
              className="Icons"
              as={BiFullscreen}
              boxSize="6"
              color="on-accent-subtle"
            />

            {/* <Icon as={RiPlayLine} /> */}
          </AwesomeButton>
        )}
      </Flex>
    </Box>
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  // useEffect(() => {
  //   console.log("This is IMAges", images);
  // }, [images]);

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? "/" : "/item/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map((props, i) => (
        <Frame key={i} id={props.id} title={props.name} {...props} />
      ))}
    </group>
  );
}

function Frame({ id, url, title, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef();
  const frame = useRef();
  const stringID = `${id}`;
  const name = getUuid(stringID);
  useCursor(hovered);

  // check url
  useEffect(() => {
    async function checkURL(url) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function () {
        let status = request.status;
        console.log(request.status);

        if (request.status !== 200) {
          //if(statusText !== OK)
          // console.log("This is NOT reachable in Gallery.");
          // Delete array instance
          url.replace(
            url,
            "https://i.postimg.cc/DZjyfNJy/Kondux-Logo-Press-Pack-Wide-4.jpg"
          );
        } else {
          //if(statusText === OK)
          // console.log("This is reachable in Gallery.");
          return url;
        }
      };
    }

    checkURL(url);
  }, [url]);

  useFrame((state) => {
    // image.current.material.zoom =
    //   1 + Math.cos(rnd * 10000 + state.clock.elapsedTime / 6) / 2;

    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );

    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.9 : 1),
      0.1
    );

    frame.current.material.color.lerp(
      c.set(hovered ? "purple" : "white"),
      0.01
    );
  });

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, 1, 0.05]}
        position={[0, 0.75, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>

        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.9]}
          url={url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, 1, 0]}
        fontSize={0.025}
      >
        {title}
      </Text>
    </group>
  );
}
