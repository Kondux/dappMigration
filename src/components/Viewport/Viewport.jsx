import {
  Suspense,
  useRef,
  setState,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// import { ReactMediaRecorder } from "react-media-recorder";

import { AwesomeButton } from "react-awesome-button";
import * as THREE from "three";
import { HexColorPicker } from "react-colorful";
// import { StandardReality } from "spacesvr";
// import {
//     ARCanvas,
//       Hands,
//       useXR,
//       Interactive,
//       useHitTest,
//       DefaultXRControllers,
// } from "@react-three/xr";
// import { LayerMaterial, Depth } from "lamina";
// import { MeshStandardMaterial, setAutoUpdateWorldMatrix } from "three";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import Button from "@ui/button";

// import {
//     Selection,
//     EffectComposer,
//     Select,
//     Outline,
//     DepthOfField,
//     Bloom,
//     Noise,
//     Vignette,
// } from "@react-three/postprocessing";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
// import "antd/dist/antd.css";
import {
  HStack,
  VStack,
  Box,
  Spacer,
  Text as TextCha,
  Flex,
  Icon,
  useColorMode,
  Center,
  Skeleton,
  Container,
  SimpleGrid,
  IconButton,
  Button,
} from "@chakra-ui/react";
// import { StandardReality, Interactable } from "spacesvr";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { suspend } from "suspend-react";
import {
  Box as BoxVR,
  Text as TextVR,
  // softShadows,
  useGLTF,
  Environment,
  Loader,
  OrbitControls,
  useAnimations,
  MeshReflectorMaterial,
  Html,
  useProgress,
  useFBX,
  Stars,
  Cloud,
  Sky,
  PresentationControls,
  Sparkles,
  Shadow,
  ContactShadows,
  Billboard,
  BakeShadows,
  Preload,
  PointerLockControls,
  PerspectiveCamera,
  useHelper,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";

// Screen Recorder Imports

// import { CanvasCapture } from "canvas-capture";
// import { Image, Modal } from "react-bootstrap";
// import Watermark from "../Images/Watermark.png";
// import "video-react/dist/video-react.css";
// import { Player } from "video-react";
// // import { RecordRTCPromisesHandler } from "recordrtc";
// import { saveAs } from "file-saver";

// Icon Imports
import { AiFillPlayCircle } from "react-icons/ai";
import { RiSpaceShipFill, RiPlayLine, RiPauseLine } from "react-icons/ri";
import { BiFullscreen, BiVideoRecording, BiStopCircle } from "react-icons/bi";
import { ImEnter } from "react-icons/im";
import {
  GiMusicalNotes,
  GiSpaceShuttle,
  GiUfo,
  GiInterceptorShip,
  GiRocketFlight,
} from "react-icons/gi";
import { VscScreenFull, VscDebugPause } from "react-icons/vsc";
import { SiStarship } from "react-icons/si";
import {
  BsFullscreen,
  BsFullscreenExit,
  BsFillStopBtnFill,
} from "react-icons/bs";

import { FaVideoSlash, FaDownload, FaCamera } from "react-icons/fa";

// import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
// import { KernelSize, BlendFunction } from "postprocessing";
import { RectAreaLightUniformsLib, FlakesTexture } from "three-stdlib";

// import GreyFull from "./VPComponents/Grey_Full";
// import WasdControls from "./WasdControls";

//Rept with Weapon
import ReptWeapon from "./VPComponents/ReptNew";

//Grey with Weapon
import GreyWeapon from "./VPComponents/DemoGreyFixed";

//Test //

import Test from "./VPComponents/TestFinal";
import Test2 from "./VPComponents/TestFinal2";

//
import GreyV1 from "./VPComponents/GreyV1";

import HDGrey from "./VPComponents/HDGrey";

import PleiadianBase from "./VPComponents/PleiadianBase";

import KonduxGearAmber from "./VPComponents/KonduxGear";
import Amber from "./VPComponents/Amber";
import CyGrey from "./VPComponents/CyGrey";
import ThorBase from "./VPComponents/ThorBaseNew";
import Thor from "./VPComponents/Thor";
import ThorClothGold from "./VPComponents/ThorClothGold";
import Princess from "./VPComponents/Princess";
import Seated from "./VPComponents/Seated";
// import CyGrey from "./VPComponents/CYGREY_X";
// import Xeno from "./VPComponents/Xeno";
import BAYC2 from "./VPComponents/BAYC2";
// import Twerk from "./VPComponents/Twerk";
// import Test from "./VPComponents/Test";

// import * as Models from "./VPComponents/Models";
import {
  Leva,
  useControls,
  useCreateStore,
  folder,
  buttonGroup,
  button as BTON,
} from "leva";
// import Particles from "./VPComponents/Particles";
// import DamagedHelmet from "./VPComponents/DamagedHelmet";
// import Helmet from "./VPComponents/Helmet";
// import Sword from "./VPComponents/Sword";
// import Hatchet from "./VPComponents/Hatchet";
// import Jetpack from "./VPComponents/Jetpack";
import Cow from "./VPComponents/Cow";
import UFO from "./VPComponents/UFO";
import XUFO from "./VPComponents/XUFO";

import Moon from "./VPComponents/Moon";

// import Abduction from "./VPComponents/Abduction";
import Nucleus from "./VPComponents/Nucleus";
import Space from "./VPComponents/SpaceStation";
import Vaporware from "./VPComponents/Vaporware";
import Neon from "./VPComponents/Neon";
import CyberCity from "./VPComponents/CyberCity";
import Pyramids from "./VPComponents/Pyramids";
import Gallery2 from "./VPComponents/Gallery2";
import Island from "./VPComponents/Island";
import FirstContact from "./VPComponents/FirstContact";
import MarbleHallway from "./VPComponents/MarbleHallway";

import AudioTrack2 from "./sounds/Skullbeatz___Bad_Cat_Master.mp3";
// import AudioTrack3 from "./sounds/Skullbeatz = Don't Try This.mp3";
import AudioTrack4 from "./sounds/ProbetheBooty.mp3";
import AudioTrack5 from "./sounds/Mylo-Sunworshipper.mp3";
import AudioTrack6 from "./sounds/01_-_So_Easy.mp3";
import AudioTrack7 from "./sounds/214-2_heads_-_out_of_the_city_starchaser_.mp3";
// import AudioTrack from "./sounds/Skullbeatz_Lateralus.mp3";
// import AudioTrack3 from "./sounds/Skullbeatz = Don't Try This.mp3";
import Ship from "./VPComponents/Ship";

// import { useAsset } from "use-asset";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import "./CharaterTab.css";

RectAreaLightUniformsLib.init();
THREE.Vector2.prototype.equals = function (v, epsilon = 0.001) {
  return Math.abs(v.x - this.x) < epsilon && Math.abs(v.y - this.y) < epsilon;
};

// function useLerpedMouse() {
//   const mouse = useThree((state) => state.mouse);
//   const lerped = useRef(mouse.clone());
//   const previous = new THREE.Vector2();
//   useFrame((state) => {
//     previous.copy(lerped.current);
//     lerped.current.lerp(mouse, 0.1);
//     // Regress system when the mouse is moved
//   });
//   return lerped;
// }

const HPI = Math.PI / 2;

// FOR LOADING SCREEN ---///

// function ShipLoader() {
//   const { progress } = useProgress();
//   return (
//     <Html center prepend zIndexRange={[100, 0]}>
//       <Box></Box>
//       <VStack align="center" justify="center">
//         <TextCha fontSize="6xl" style={{ color: "white" }}>
//           ENTERING SHIP...
//         </TextCha>
//         <Spacer p={5} />
//         <Progress
//           type="circle"
//           strokeColor="#60c23f"
//           width={200}
//           percent={progress.toPrecision(4)}
//           center="true"
//         />
//       </VStack>
//     </Html>
//   );
// }

const Lights = () => {
  const lights1 = useRef();

  // useHelper(lights1, THREE.DirectionalLightHelper, 1);
  // const mouse = useLerpedMouse();
  // useFrame((state) => {
  //   lights.current.rotation.x = (mouse.current.x * Math.PI) / 2;
  //   lights.current.rotation.y =
  //     Math.PI * 0.25 - (mouse.current.y * Math.PI) / 2;
  // });
  return (
    <>
      <directionalLight
        ref={lights1}
        intensity={0.25}
        position={[-40, 50, 25]}
        color="white"
        // distance={10}
        castShadow
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize={[5480, 5480]}
      />
      {/* <spotLight
        intensity={1}
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <group>
        <rectAreaLight
          intensity={0.75}
          position={[50, 0, -100]}
          width={200}
          height={500}

          // onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        <rectAreaLight
          intensity={0.75}
          position={[-10, 2, -10]}
          width={15}
          height={15}
          // onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </group> */}
    </>
  );
};

const ShipLights = () => {
  const lights = useRef();
  // const mouse = useLerpedMouse();
  // useFrame((state) => {
  //   lights.current.rotation.x = (mouse.current.x * Math.PI) / 2;
  //   lights.current.rotation.y =
  //     Math.PI * 0.25 - (mouse.current.y * Math.PI) / 2;
  // });
  return (
    <>
      <directionalLight
        intensity={2.5}
        position={[-4, 2, -10]}
        color="lightblue"
        distance={10}
      />

      <directionalLight
        intensity={3}
        position={[5, 0, 30]}
        rotation={[0, 0, 0]}
        color="purple"
        distance={10}
      />
      <spotLight
        intensity={6}
        position={[2, 2, -20]}
        angle={0.7}
        penumbra={1}
        castShadow
        color="blue"
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        intensity={6}
        position={[4, 2, -10]}
        angle={0.7}
        penumbra={1}
        castShadow
        color="white"
        shadow-mapSize={[2048, 2048]}
      />

      <spotLight
        intensity={1}
        position={[0, 5, -25]}
        angle={-0.2}
        penumbra={0.5}
        castShadow
        color="grey"
        shadow-mapSize={[2048, 2048]}
      />

      <group ref={lights}>
        <rectAreaLight
          intensity={5}
          position={[0, 2, 2]}
          width={200}
          height={500}
          color="blue"
          // onUpdate={(self) => self.lookAt(0, -2, -0.1)}
        />
        <rectAreaLight
          intensity={4}
          position={[0, -2, -20]}
          width={15}
          height={15}
          // color="white"
          // onUpdate={(self) => self.lookAt(0, -2, -0.1)}
        />
      </group>
    </>
  );
};

// function Effects() {
//     const ref = useRef();
//     return (
//         <EffectComposer multisampling={4}>
//             <SSAO
//                 ref={ref}
//                 intensity={1}
//                 radius={10}
//                 luminanceInfluence={0}
//                 bias={0.035}
//             />
//             <Bloom
//                 kernelSize={KernelSize.LARGE}
//                 exposure={1}
//                 strength={0.6}
//                 radius={0.01}
//                 luminanceThreshold={0.75}
//                 luminanceSmoothing={0.9}
//             />
//         </EffectComposer>
//     );
// }

// function ShipEffects() {
//     const ref = useRef();
//     return (
//         <EffectComposer multisampling={1}>
//             <SSAO
//                 ref={ref}
//                 intensity={0.5}
//                 radius={15}
//                 luminanceInfluence={0}
//                 bias={0.035}
//             />
//             <Bloom
//                 kernelSize={KernelSize.LARGE}
//                 strength={0.2}
//                 radius={0.2}
//                 luminanceThreshold={0.7}
//                 luminanceSmoothing={0.3}
//             />
//         </EffectComposer>
//     );
// }

// Ground Component
function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        receiveShadow
        blur={[300, 100]}
        resolution={2048}
        mixBlur={0.25}
        mixStrength={60}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.25}
        maxDepthThreshold={1}
        color="#151515"
        metalness={0.5}
      />

      {/* <MeshReflectorMaterial
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
            /> */}
    </mesh>
  );
}
// FBX Animated Component
// use useRef to reference group instead of primitive obj
// need .reset() when we use more than one animations.

export default function ViewPort() {
  const { isInitialized, isAuthenticated, user, chainId } = useMoralis();
  const ethAddress = user.get("ethAddress");

  const outlineRef = useRef();
  // console.log(hovered);

  // Background Parameters
  const [background, setBackground] = useState("");
  // Avatar Parameters
  const [base, setBase] = useState({});

  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedEyeColor, setSelectedEyeColor] = useState("white");

  const [avatarColor, setAvatarColor] = useState("white");
  const [armorSet, setArmorSet] = useState("");

  const [eyeColor, setEyeColor] = useState({});
  const [skinColor, setSkinColor] = useState({});
  const [magColor, setMagColor] = useState({});
  const [armorColor, setArmorColor] = useState({});

  // const [swapArmor, setSwapArmor] = useState({});
  // const [swapMag, setMag] = useState({});

  // this needs to be updated every time bg changes
  const [bgLink, setbgLink] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  const [skinLink, setSkinLink] = useState("");
  const [headLink, setHeadLink] = useState("");
  const [eyesLink, setEyesLink] = useState("");
  const [magLink, setMagLink] = useState("");
  const [armorLink, setArmorLink] = useState("");
  const [weaponLink, setWeaponLink] = useState("");

  // The actual component for music
  const [music, setMusic] = useState();

  const [hidden, set] = useState();
  const { colorMode, toggleColorMode } = useColorMode();
  const { progress } = useProgress();
  const [bg, setBG] = useState("dark");
  const [lightColor, setColor] = useState("purple");
  const [isPlaying, setPlaying] = useState(false);
  const [isFullScreenHeight, setFullScreenHeight] = useState("85vh");
  const [isFullScreenWidth, setFullScreenWidth] = useState("100vw");
  const [isFullScreenPosition, setFullScreenPosition] = useState("fixed");
  const [isFullScreenTop, setFullScreenTop] = useState("notIsFullScreenTop");
  const [buttonLocation, setButtons] = useState("15vh");

  const [size, setSize] = useState("medium");
  // const [zIndex, setZIndex] = useState(0);

  const [atHome, setAtHome] = useState(true);
  const [inShip, setInShip] = useState(false);
  const [inHallway, setInHallway] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceSelected, setDevice] = useState(true);

  // Screen Recorder Vars
  const [isRecording, setIsRecording] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoBlob, setVideoUrlBlob] = useState(null);
  const [type, setType] = useState("screen");

  // IF Avatar clicked, plays animation
  const [play, setPlay] = useState(false);

  // softShadows();

  const cssStyles = {
    overlay: {
      position: "fixed",
      flexDirection: "row-reverse",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
      opacity: "0.9",
      transition: ".3s ease",
      // fontFamily: "Roboto, sans-serif",
      // color: "#041836",
      // backgroundColor: "transparent",
      // top: "0",
      top: "30vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },
    overlayMusicButton: {
      position: "fixed",
      flexDirection: "row-reverse",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
      opacity: "0.9",
      transition: ".3s ease",
      // fontFamily: "Roboto, sans-serif",
      // color: "#041836",
      // backgroundColor: "transparent",
      // top: "0",
      top: "30vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },
    overlayFullScreen: {
      position: "fixed",
      flexDirection: "row-reverse",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
      opacity: "0.9",
      transition: ".3s ease",
      // fontFamily: "Roboto, sans-serif",
      // color: "#041836",
      // backgroundColor: "transparent",
      // top: "0",
      bottom: buttonLocation,
      right: 50,
      // right: "0",
      zIndex: "4",
    },

    overlayColorInput: {
      width: "170px",
      background: "white",
      color: "black",
      position: "fixed",
      flexDirection: "row-reverse",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
      opacity: "0.9",
      transition: ".3s ease",
      // fontFamily: "Roboto, sans-serif",
      // color: "#041836",
      // backgroundColor: "transparent",
      top: "85vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },

    loader: {
      position: "fixed",
      width: "100vw",
      height: "85vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    },

    overlayRecorder: {
      position: "absolute",
      top: "74px",
      left: "70px",
      width: "90px",
      height: "90px",
      zIndex: 9999,
    },

    overlayPicker: {
      position: "absolute",
      top: "74px",
      left: "70px",
      width: "90px",
      height: "90px",
    },

    overlayPickerTitle: {
      color: "white",
      position: "absolute",
      top: "34px",
      left: "70px",
      width: "90px",
      height: "45px",
    },

    overlayEyePicker: {
      position: "absolute",
      top: "474px",
      left: "70px",
      width: "90px",
      height: "90px",
    },

    overlayEyePickerTitle: {
      color: "white",
      position: "absolute",
      top: "434px",
      left: "70px",
      width: "90px",
      height: "45px",
    },
  };

  // Cursor showing current color
  const [hovered, setHovered] = useState(false);

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? "pointer" : "auto";
  // }, [hovered]);

  // useEffect(() => {
  //   console.log(overlayMenu);
  // }, [overlayMenu]);

  // Armor Color Picker

  function Picker() {
    return (
      //   <div style={{ display: snap.current ? "block" : "none" }}>
      <div>
        <h1 style={cssStyles.overlayPickerTitle}>Armor Color</h1>

        <HexColorPicker
          style={cssStyles.overlayPicker}
          color={selectedColor}
          onChange={(color) => {
            setSelectedColor(color);
          }}
        />
      </div>
    );
  }

  function EyePicker() {
    return (
      //   <div style={{ display: snap.current ? "block" : "none" }}>
      <div>
        <h1 style={cssStyles.overlayEyePickerTitle}>Eye Color</h1>

        <HexColorPicker
          style={cssStyles.overlayEyePicker}
          color={selectedEyeColor}
          onChange={(color) => {
            setSelectedEyeColor(color);
          }}
        />
      </div>
    );
  }

  const colorsStore = useCreateStore();
  const radiiStore = useCreateStore();
  const spaceStore = useCreateStore();
  const fontSizesStore = useCreateStore();
  const sizesStore = useCreateStore();
  const borderWidthsStore = useCreateStore();
  const fontWeightsStore = useCreateStore();

  const colors = useControls(
    {
      colors: folder({
        elevation1: "#c7c5c5",
        elevation2: "#1e1426",
        elevation3: "#372147",
        accent1: "#0066DC",
        accent2: "#007BFF",
        accent3: "#3C93FF",
        highlight1: "#535760",
        highlight2: "#8C92A4",
        highlight3: "#FEFEFE",
        vivid1: "#ffcc00",
      }),
    },
    { store: colorsStore }
  );

  const radii = useControls(
    {
      radii: folder({
        xs: "2px",
        sm: "3px",
        lg: "10px",
      }),
    },
    { store: radiiStore }
  );

  const space = useControls(
    {
      space: folder({
        sm: "6px",
        md: "10px",
        rowGap: "7px",
        colGap: "7px",
      }),
    },
    { store: spaceStore }
  );

  const fontSizes = useControls(
    {
      fontSizes: folder({
        root: "11px",
      }),
    },
    { store: fontSizesStore }
  );

  const sizes = useControls(
    {
      sizes: folder({
        rootWidth: "280px",
        controlWidth: "160px",
        scrubberWidth: "8px",
        scrubberHeight: "16px",
        rowHeight: "24px",
        folderHeight: "20px",
        checkboxSize: "16px",
        joystickWidth: "100px",
        joystickHeight: "100px",
        colorPickerWidth: "160px",
        colorPickerHeight: "100px",
        monitorHeight: "60px",
        titleBarHeight: "39px",
      }),
    },
    { store: sizesStore }
  );

  const borderWidths = useControls(
    {
      borderWidths: folder({
        root: "0px",
        input: "1px",
        focus: "1px",
        hover: "1px",
        active: "1px",
        folder: "1px",
      }),
    },
    { store: borderWidthsStore }
  );

  const fontWeights = useControls(
    {
      fontWeights: folder({
        label: { value: "bold", options: ["bold", "light"] },
        folder: { value: "normal", options: ["bold", "light"] },
        button: { value: "normal", options: ["bold", "light"] },
      }),
    },
    { store: fontWeightsStore }
  );

  const myTheme = {
    colors,
    radii,
    space,
    fontSizes,
    sizes,
    borderWidths,
    fontWeights,
  };

  // const canvas = document.getElementById("ViewportCanvas");
  // CanvasCapture.init(canvas, {
  //     showRecDot: true,
  //     showAlerts: true,
  //     showDialogs: true,
  //     verbose: false,
  //     ffmpegCorePath: "./dist/ffmpeg-core.js",
  // });

  const overlayMenu = useControls({
    // string: { value: 'hello', label: 'My string' },
    eyecolor: { value: "#ffffff", label: "Eye Color" },
    skincolor: { value: "#ffffff", label: "Skin Color" },
    armorcolor: { value: "#ffffff", label: "Primary Armor Color" },
    animationClip: {
      label: "Animations",
      options: ["Play", "Pause"],
    },
    armorVariant: {
      label: "Armor Variant",
      options: ["Normal", "Black"],
    },
    // TakeSnapshot: BTON(() =>
    //   newCC.takePNGSnapshot({
    //     name: "Kondux_Scene",
    //     dpi: 72,
    //     onExportProgress: (progress) =>
    //       console.log(`PNG frames export progress: ${progress}.`),
    //     onExportFinish: () => console.log(`Finished PNG frames zip.`),
    //   })
    // ),

    // armorcolor2: { value: "#ffffff", label: "Secondary Armor Color" },
    // opacity: { value: 0.5, label: <OpacityIcon /> },
    // size: { value: { width: 200, height: 300 }, label: <DimensionsIcon /> },

    // animationframe: {
    //     value: 1,
    //     min: 1,
    //     max: 60,
    //     step: 1,
    //     label: "Animation Frame",
    // },

    // Record: BTON(() => startRecording(), { disabled: isRecording }),
    // Stop: BTON(() => stopRecording(), { disabled: !isRecording }),
    // Preview: BTON(() => setModalShow(true)),
    // Download: BTON(() => downloadVideo()),

    // recordScreenGroup: buttonGroup({
    //     label: "Record Screen Controls",
    //     opts: {
    //         Record: (() => startRecording(), { disabled: isRecording }),
    //         Stop: (() => stopRecording(), { disabled: !isRecording }),
    //         Preview: () => setModalShow(true),
    //         Download: () => downloadVideo(),
    //     },
    // }),
  });

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

  // WASD LOGIC

  // const handleKeyPress = (event) => {
  //   console.log(event);
  //   console.log(event.code);

  //   if (event.code === 87) {
  //     console.log("W key was pressed.");
  //     //Z+
  //     event.preventDefault();
  //     // callMyFunction();
  //   } else if (event.code === 65) {
  //     console.log("A key was pressed.");
  //     //X-
  //     event.preventDefault();
  //     // callMyFunction();
  //   } else if (event.code === 83) {
  //     console.log("S key was pressed.");
  //     //Z-
  //     event.preventDefault();
  //     // callMyFunction();
  //   } else if (event.code === 68) {
  //     console.log("D key was pressed.");
  //     //X+
  //     event.preventDefault();
  //     // callMyFunction();
  //   }
  // };

  // useEffect(() => {
  //     function listener(event) {
  //         if (event.code === 87) {
  //             console.log("W key was pressed.");
  //             //Z+
  //             event.preventDefault();
  //             // callMyFunction();
  //         } else if (event.code === 65) {
  //             console.log("A key was pressed.");
  //             //X-
  //             event.preventDefault();
  //             // callMyFunction();
  //         } else if (event.code === 83) {
  //             console.log("S key was pressed.");
  //             //Z-
  //             event.preventDefault();
  //             // callMyFunction();
  //         } else if (event.code === 68) {
  //             console.log("D key was pressed.");
  //             //X+
  //             event.preventDefault();
  //             // callMyFunction();
  //         }
  //     }

  //     globalThis.addEventListener("keydown", listener);

  //     return () => {
  //         globalThis.removeEventListener("keydown", listener);
  //     };
  // }, []);

  // checks to see if newUser is undefined, if so makes it true.

  const newUserUndefined = async () => {
    // check to see if there is an instance for ethAddress
    const User = Moralis.Object.extend("User");
    const query = new Moralis.Query(User);
    //need to check newUser = true
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();
    let finalResult = parseFunctionNewUser(results);
    // console.log("THIS IS finalResult", finalResult);

    if (finalResult.newUser === undefined) {
      user.set("newUser", true);
      console.log("User is undefined");
      await user.save();
    } else {
      console.log("User is not undefined");
    }
  };

  // update subscription - watching background for when a instance is created

  const isNewUser = async () => {
    // check to see if there is an instance for ethAddress
    const User = Moralis.Object.extend("User");
    const query = new Moralis.Query(User);
    //need to check newUser = true
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();
    let finalResult = parseFunctionNewUser(results);
    // console.log("THIS IS finalResult", finalResult);

    if (finalResult.newUser === true) {
      // Create all blank none templates in backend
      console.log("NEW USER IN VIEWPORT");
      setAvatarLink("Model.fbx");
      setbgLink("Teleporter.fbx");
      setMusic(AudioTrack2);

      setSkinLink("None");
      setHeadLink("None");
      setEyesLink("None");
      setMagLink("None");
      setArmorLink("None");
      setWeaponLink("None");

      // Get updates

      getAvatarDataLive();
      getBGDataLive();
      getMusicDataLive();

      getSkinDataLive();
      getHeadDataLive();
      getEyesDataLive();
      // getMagDataLive();
      getArmorDataLive();
      getWeaponDataLive();
    } else {
      //Get all links
      await getAllLinks();

      //Get updates
      getAvatarDataLive();
      getBGDataLive();
      getMusicDataLive();

      getSkinDataLive();
      getHeadDataLive();
      getEyesDataLive();
      // getMagDataLive();
      getArmorDataLive();
      getWeaponDataLive();
      console.log("NOT NEW USER IN VIEWPORT");
      console.log("NOT NEW USER bgLink", bgLink);
    }
  };

  // Get Metadata and put in local variables
  async function getAllLinks() {
    const queryBg = new Moralis.Query("Metadata");
    queryBg.equalTo("ethAddress", ethAddress);
    const results = await queryBg.find();
    let finalResults = parseFunction(results);

    console.log("This is finalResults from getAllLinks()");

    let dataBackground = finalResults.Background;
    let dataAvatar = finalResults.Avatar;
    let dataMusic = finalResults.Music;

    let dataSkin = finalResults.Skin;
    let dataHead = finalResults.Head;
    let dataEyes = finalResults.Eyes;
    // let dataMag = finalResults.Mag;
    let dataArmor = finalResults.Armor;
    let dataWeapon = finalResults.Weapon;

    // console.log("THIS IS data from getAllLinks", data);
    const newBackgroundData = dataBackground.link;
    const newAvatarData = dataAvatar.link;
    const newMusicData = dataMusic.link;

    const newSkinData = dataSkin.name;
    const newHeadData = dataHead.name;
    const newEyesData = dataEyes.name;
    // const newMagData = dataMag.name;
    const newArmorData = dataArmor.name;
    const newWeaponData = dataWeapon.name;

    console.log("THIS IS data from newSkinData", newSkinData);
    console.log("THIS IS data from newHeadData", newHeadData);
    console.log("THIS IS data from newEyesData", newEyesData);
    // console.log("THIS IS data from newMagData", newMagData);
    console.log("THIS IS data from newArmorData", newArmorData);
    console.log("THIS IS data from newArmorData", newWeaponData);

    // LOGIC FOR BLANK PARAMETERS BELOW //
    //set up bg link
    if (newBackgroundData === "") {
      setbgLink("Teleporter.fbx");
    } else {
      setbgLink(newBackgroundData);
    }

    //set up avatar link
    if (newAvatarData === "") {
      setAvatarLink("Model.fbx");
    } else {
      setAvatarLink(newAvatarData);
    }

    //set up music link
    if (newMusicData === "") {
      setMusic(AudioTrack2);
    } else {
      setMusicData(newMusicData);
    }

    //set up skin link
    if (newSkinData === "None") {
      setSkinLink("None");
    } else {
      setSkinLink(newSkinData);
    }

    //set up headlink
    if (newHeadData === "None") {
      setHeadLink("None");
    } else {
      setHeadLink(newHeadData);
    }

    //set up eyes link
    if (newEyesData === "None") {
      setEyesLink("None");
    } else {
      setEyesLink(newEyesData);
    }

    //set up armor link
    if (newArmorData === "None") {
      setArmorLink("None");
    } else {
      setArmorLink(newArmorData);
    }

    //set up weapon link
    if (newWeaponData === "None") {
      setWeaponLink("None");
    } else {
      setWeaponLink(newWeaponData);
    }
    // console.log("THIS IS data from getAllLinks", newData);
  }

  // For updating bg data live
  const getBGDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    queryBg.equalTo("ethAddress", ethAddress);
    const subscriptionBg = await queryBg.subscribe();

    // Watching Background class for creation changes
    handleBackground(queryBg, subscriptionBg);
  };

  async function handleBackground(queryBg, subscription) {
    subscription.on("update", async function (data) {
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS LINK", finalResults.Background.link);

      //set local variable with link from backend
      setbgLink(finalResults.Background.link);
      console.log("THIS IS UPDATE RESULTS bgLINK", bgLink);
    });
  }

  // For updating avatar data live
  const getAvatarDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching Avatar class for creation changes
    handleAvatar(queryBg, subscriptionBg);
  };

  async function handleAvatar(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log(
        "THIS IS UPDATE RESULTS Avatar LINK",
        finalResults.Avatar.link
      );

      //set local variable with link from backend
      setAvatarLink(finalResults.Avatar.link);
      console.log("THIS IS UPDATE RESULTS avatarLINK", avatarLink);
    });
  }

  // For updating skin data live
  const getSkinDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching skin class for creation changes
    handleSkin(queryBg, subscriptionBg);
  };

  async function handleSkin(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Skin LINK", finalResults.Skin);

      //set local variable with link from backend
      setSkinLink(finalResults.Skin.name);
      console.log("THIS IS UPDATE RESULTS skinLINK", skinLink);
    });
  }

  // For updating head data live
  const getHeadDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching head class for creation changes
    handleHead(queryBg, subscriptionBg);
  };

  async function handleHead(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Head LINK", finalResults.Head);

      //set local variable with link from backend
      setHeadLink(finalResults.Head.name);
      console.log("THIS IS UPDATE RESULTS headLINK", headLink);
    });
  }

  // For updating eyes data live
  const getEyesDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching eyes class for creation changes
    handleEyes(queryBg, subscriptionBg);
  };

  async function handleEyes(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Eyes LINK", finalResults.Eyes);

      //set local variable with link from backend
      setEyesLink(finalResults.Eyes.name);
      console.log("THIS IS UPDATE RESULTS eyesLINK", eyesLink);
    });
  }

  // For updating mag data live
  const getMagDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching mag class for creation changes
    handleMag(queryBg, subscriptionBg);
  };

  async function handleMag(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS mag LINK", finalResults.Mag);

      //set local variable with link from backend
      setMagLink(finalResults.Mag.name);
      console.log("THIS IS UPDATE RESULTS magLINK", magLink);
    });
  }

  // For updating armor data live
  const getArmorDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching armor class for creation changes
    handleArmor(queryBg, subscriptionBg);
  };

  async function handleArmor(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Armor LINK", finalResults.Armor);

      //set local variable with link from backend
      setArmorLink(finalResults.Armor.name);
      console.log("THIS IS UPDATE RESULTS armorLINK", armorLink);
    });
  }

  // For updating weapon data live
  const getWeaponDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching weapon class for creation changes
    handleWeapon(queryBg, subscriptionBg);
  };

  async function handleWeapon(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Weapon LINK", finalResults.Weapon);

      //set local variable with link from backend
      setWeaponLink(finalResults.Weapon.name);
      console.log("THIS IS UPDATE RESULTS weaponLINK", weaponLink);
    });
  }

  // For updating music data live
  const getMusicDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const subscriptionBg = await queryBg.subscribe();

    // Watching Avatar class for creation changes
    handleMusic(queryBg, subscriptionBg);
  };

  async function handleMusic(queryBg, subscription) {
    subscription.on("update", async function (data) {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      console.log("THIS IS UPDATE RESULTS Music LINK", finalResults.Music.link);

      //set local variable with link from backend
      setMusicData(finalResults.Music.link);
      console.log("THIS IS UPDATE RESULTS musicLINK", music);
    });
  }

  // Function that set the music
  async function setMusicData(newMusicData) {
    if (newMusicData === "DayNNight") {
      await setMusic(AudioTrack5);
      console.log("THIS IS UPDATE music", music);
    } else if (newMusicData === "EmbraceTheMartian") {
      await setMusic(AudioTrack7);
      console.log("THIS IS UPDATE music", music);
    } else if (newMusicData === "Solitude") {
      await setMusic(AudioTrack6);
      console.log("THIS IS UPDATE music", music);
    } else if (newMusicData === "ProbeTheBooty") {
      await setMusic(AudioTrack4);
      console.log("THIS IS UPDATE music", music);
    }
    console.log("Music set!");
  }

  // FOR PARSING RESULTS
  function parseFunction(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  // FOR PARSING RESULTS FOR NEW USERS
  function parseFunctionNewUser(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  // Have to get query of the new bgLink

  function playButton() {
    setPlaying(!isPlaying);
    // console.log("THIS IS PLAYING", isPlaying);
  }

  function fullscreenButton() {
    if (isFullScreenHeight === "85vh") {
      setFullScreenTop("isFullScreenTop");
      setFullScreenPosition("fixed");
      setFullScreenHeight("100vh");
      setFullScreenWidth("100vw");
      setButtons("10vh");

      // setZIndex(10);
      // console.log("This is full screen", isFullScreen);
    } else {
      setFullScreenTop("notIsFullScreenTop");
      setFullScreenPosition("fixed");
      setFullScreenHeight("85vh");
      setFullScreenWidth("100vw");
      setButtons("23vh");

      // setZIndex(0);
      // console.log("This is full screen", isFullScreen);
    }
  }

  function getMobile() {
    setIsMobile(true);
    setDevice(true);
    console.log("THIS IS MOBILE", isMobile);
  }

  function getDesktop() {
    setIsMobile(false);
    setDevice(true);
    console.log("THIS IS MOBILE", isMobile);
  }

  let capName = user.get("username").toUpperCase();

  function getAtHome() {
    setAtHome(true);
    setInShip(false);
    setInHallway(false);

    // if (inShip === false) {
    //   alert("Entering ship!");
    // } else {
    //   alert("Exiting ship.");
    // }
    // console.log("THIS IS inShip", inShip);
  }

  function getInHallway() {
    setInShip(false);
    setInHallway(true);
    setAtHome(false);

    // if (inShip === false) {
    //   alert("Entering ship!");
    // } else {
    //   alert("Exiting ship.");
    // }
    // console.log("THIS IS inShip", inShip);
  }

  function getInShip() {
    setAtHome(false);
    setInShip(true);
    setInHallway(false);
    // if (inShip === false) {
    //   alert("Entering ship!");
    // } else {
    //   alert("Exiting ship.");
    // }
    // console.log("THIS IS inShip", inShip);
  }

  // Prompt to figure user device
  function DeviceLoader() {
    return (
      <Box>
        <AwesomeButton
          size={size}
          type="primary"
          ripple
          onPress={() => getMobile()}
        >
          <p>My device is mobile</p>

          {/*  */}
        </AwesomeButton>
        <Spacer p={3}></Spacer>
        <AwesomeButton
          size={size}
          type="primary"
          ripple
          onPress={() => getDesktop()}
        >
          <p>My device is NOT mobile</p>

          {/*  */}
        </AwesomeButton>
      </Box>
    );
  }

  function Track({
    url,
    y = 1000,
    space = 1.8,
    width = 0.01,
    height = 0.05,
    obj = new THREE.Object3D(),
    ...props
  }) {
    const ref = useRef();
    // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
    // integrates them with React suspense. You can use it as-is with or without r3f.
    const { gain, context, update, data } = suspend(
      () => createAudio(url),
      [url]
    );
    useEffect(() => {
      // Connect the gain node, which plays the audio
      gain.connect(context.destination);
      // Disconnect it on unmount
      return () => gain.disconnect();
    }, [gain, context]);

    useFrame((state) => {
      let avg = update();
      // Distribute the instanced planes according to the frequency daza
      for (let i = 0; i < data.length; i++) {
        obj.position.set(
          i * width * space - (data.length * width * space) / 2,
          data[i] / y,
          0
        );
        obj.updateMatrix();
        ref.current.setMatrixAt(i, obj.matrix);
      }
      // Set the hue according to the frequency average
      ref.current.material.color.setHSL(avg / 100, 0.75, 0.75);
      ref.current.instanceMatrix.needsUpdate = true;
    });
    return (
      <instancedMesh
        castShadow
        ref={ref}
        args={[null, null, data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    );
  }

  // function Track({
  //   url,
  //   y = 1000,
  //   space = 1.8,
  //   width = 0.01,
  //   height = 0.05,
  //   obj = new THREE.Object3D(),
  //   ...props
  // }) {
  //   const ref = useRef();
  //   // use-asset is the library that r3f uses internally for useLoader. It caches promises and
  //   // integrates them with React suspense. You can use it as-is with or without r3f.
  //   const { gain, context, update, data, source } = useAsset(
  //     () => createAudio(url),
  //     url
  //   );

  async function createAudio(url) {
    // Fetch audio data and create a buffer source
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createBufferSource();
    source.buffer = await new Promise((res) =>
      context.decodeAudioData(buffer, res)
    );
    source.loop = true;
    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first
    source.start(0);
    // Create gain node and an analyser
    const gain = context.createGain();
    const analyser = context.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyser.connect(gain);
    // The data array receive the audio frequencies
    const data = new Uint8Array(analyser.frequencyBinCount);
    return {
      context,
      source,
      gain,
      data,
      // This function gets called every frame per audio source
      update: () => {
        analyser.getByteFrequencyData(data);
        // Calculate a frequency average
        return (data.avg = data.reduce(
          (prev, cur) => prev + cur / data.length,
          0
        ));
      },
    };
  }

  //-----------------//
  // Random Color Generator
  const animateLight = () => {
    setInterval(randomColor, 15000);

    function randomColor() {
      let rainbowArray = [
        "violet",
        "indigo",
        "blue",
        "green",
        "yellow",
        "orange",
        "red",
      ];

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }

      setColor(rainbowArray[getRandomInt(0, 6)]); // set Random color
    }
  };

  // Runs on load
  // useEffect(() => {
  //   // Light Colors
  //   animateLight();
  // }, []);

  // FOR PARTICLES ---///
  // const props = useControls({
  //   focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
  //   speed: { value: 0.1, min: 0.1, max: 100, step: 0.1 },
  //   aperture: { value: 1.8, min: 1, max: 5.6, step: 0.1 },
  //   fov: { value: 60, min: 0, max: 200 },
  //   curl: { value: 0.25, min: 0.01, max: 0.5, step: 0.01 },
  // });

  // const Texture = ({ texture }) => {
  //   return (
  //     <mesh>
  //       <planeBufferGeometry attach="geometry" args={[5, 4]} />
  //       <meshBasicMaterial attach="material" map={texture} />
  //     </mesh>
  //   );
  // };

  // const Image = ({ url }) => {
  //   const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  //   return <Texture texture={texture} />;
  // };

  // runs on mount`
  useEffect(() => {
    checkWidth();
    newUserUndefined();
    isNewUser();

    // animateLight();
  }, []);

  useEffect(() => {
    checkWidth();

    // animateLight();
  }, [window.innerWidth]);

  ////--- Scene Models per Category ---///////

  //Background
  function Background({ bglink }) {
    const fbxBGRef = useRef();
    // console.log("THIS IS BG bgLink", link);

    let changeBG = "/Teleporter.glb";
    // console.log("THIS IS BG bgLink", link);
    if (bglink === "") {
      changeBG = "/Teleporter.glb";
    } else {
      changeBG = `/${bglink}`;
    }

    // console.log("THIS IS changeBG", changeBG);
    // const fbxBG = useFBX(changeBG);
    const fbxBG = useGLTF(changeBG);

    const [scale, setScale] = useState(0.012);
    const [position, setPosition] = useState([0, 0, 0]);
    const [rotation, setRotation] = useState([0, 0, 0]);

    // const { animations } = useFBX(`/${bgLink}`);
    // const { ref, mixer, names, actions, clips } = useAnimations(
    //   animations,
    //   fbxRef
    // );

    // This logic is breaking the viewport
    useEffect(() => {
      setTimeout(() => {
        if (changeBG === "/CyberCity.glb") {
          console.log("Inside Cyber");
          setCyber();

          function setCyber() {
            setScale(0.012);
            setPosition([0, -1.5, -0.1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeBG === "/FirstContact.glb") {
          setFirst();
          console.log("Inside First Contact");

          function setFirst() {
            setScale(3.5);
            setPosition([3.5, -6.5, 1.75]);
            setRotation([60, 91, 0]);
          }
        }

        if (changeBG === "/Vaporware.glb") {
          setVapor();

          function setVapor() {
            console.log("Inside Vapor");
            setScale(0.001);
            setPosition([0, -1, 0]);
            setRotation([0, 60, 0]);
          }
        }

        if (changeBG === "/Teleporter.glb") {
          setTele();

          function setTele() {
            setScale(0.0004);
            setPosition([0, -1, -1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeBG === "/Pyramids.glb") {
          setPyramidBg();

          function setPyramidBg() {
            console.log("Inside Pyramids");

            setScale(20);
            setPosition([-300, 4.7, 200]);
            setRotation([0, -4.5, 0]);
          }
        }

        if (changeBG === "/Gallery.glb") {
          setGalleryBg();

          function setGalleryBg() {
            console.log("Inside Gallery");

            setScale(0.3);
            setPosition([0, -2, 0]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeBG === "/Island.glb") {
          setIslandBg();

          function setIslandBg() {
            console.log("Inside Island");

            setScale(0.01);
            setPosition([0, -2.7, 0]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeBG === "") {
          setNoneBg();

          function setNoneBg() {
            console.log("Inside None Bg");
            setScale(0.007);
            setPosition([-12, 3, 12]);
            setRotation([0, 0, 0]);
          }
        }
      }, 0);
      return () => {
        console.log("BG DONE");
      };
    }, [bglink]);

    // useEffect(() => {
    //   // console.log("This is ACTIONS", actions);
    //   setTimeout(() => {
    //     actions["mixamo.com"].play();
    //   }, 0);

    //   // actions["Armature|Armature|mixamo.com|Layer0"].play();
    // });

    return (
      <group ref={fbxBGRef}>
        <primitive
          object={fbxBG}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </group>
    );
  }

  // Avatar
  function Avatar({ avatarlink }) {
    const fbxAvatarRef = useRef();

    // HAD TO TURN OFF ANIMATION SINCE IT WOULD BREAK THE VIEWPORT
    // NEED TO FIND OUT WHY? UseEffect?
    // Also Model.fbx breaks viewport when changing background
    let changeAvatar = "/Model.fbx";
    // console.log("THIS IS BG bgLink", link);
    if (avatarlink === "") {
      changeAvatar = "/Model.fbx";
    } else {
      changeAvatar = `/${avatarlink}`;
    }

    // console.log("THIS IS changeBG", changeBG);
    const fbxAvatar = useFBX(changeAvatar);
    const { animations } = useFBX("/Greylian.glb");
    const { ref, mixer, names, actions, clips } = useAnimations(
      animations,
      fbxAvatarRef
    );

    const [scale, setScale] = useState(0.012);
    const [position, setPosition] = useState([0, -1, 0]);
    const [rotation, setRotation] = useState([0, 0, 0]);

    // This logic is breaking the viewport
    useEffect(() => {
      setTimeout(() => {
        if (changeAvatar === "/BAYC.glb") {
          setBAYC();

          function setBAYC() {
            console.log("Inside Bored");
            setScale(0.01);
            setPosition([0, -1, 0.1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeAvatar === "/Robot.fbx") {
          console.log("Inside Robot");
          setRobot();
          function setRobot() {
            setScale(0.0006);
            setPosition([0, 1.09, -0.1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeAvatar === "/Greylian.glb") {
          setRunning();
          console.log("Running");

          function setRunning() {
            console.log("Inside Running");
            setScale(0.012);
            setPosition([0, -1, -0.22]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeAvatar === "/Model.fbx") {
          setModel();

          function setModel() {
            console.log("Inside Model");
            setScale(0.0055);
            setPosition([0, -1, 0.1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeAvatar === "/Xeno.glb") {
          setXeno();

          function setXeno() {
            console.log("Inside Xeno");
            setScale(0.01);
            setPosition([0, -1, 0.1]);
            setRotation([0, 0, 0]);
          }
        }

        if (changeAvatar === "") {
          setNoneAvatar();

          function setNoneAvatar() {
            console.log("None Avatar");
            setScale(0.0055);
            setPosition([0, -1, 0.1]);
            setRotation([0, 0, 0]);
          }
        }

        checkAnimation();

        function checkAnimation() {
          if (actions["mixamo.com"] !== undefined) {
            actions["mixamo.com"].play();
            console.log("PLAYING ACTION");
          } else {
            console.log("NO ACTIONS");
          }
        }

        console.log("Actions in Avatar", actions);
        console.log("Actions in Avatar actions length", actions.length);
      }, 0);

      // setTimeout(() => {
      //   actions["mixamo.com"].play();
      // }, 0);

      return () => {
        console.log("AVATAR DONE");
      };
    }, [avatarlink]);

    return (
      <group ref={fbxAvatarRef}>
        <primitive
          object={fbxAvatar}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </group>
    );
  }

  // function XLoader() {
  //   const { progress } = useProgress();
  //   return (
  //     <Html
  //       center
  //       prepend
  //       zIndexRange={[100, 0]}
  //       occlude
  //       onOcclude={set}
  //       style={{
  //         transition: "all 1s",
  //         opacity: hidden ? 0 : 1,
  //         // transform: `scale(${hidden ? 0.5 : 1})`,
  //       }}
  //     >
  //       <Box w="100%" p={2}>
  //         <VStack align="center" justify="center">
  //           <TextCha fontSize="6xl" style={{ color: "white" }}>
  //             LOADING ENVIRONMENT...
  //           </TextCha>
  //           <Spacer p={5} />
  //           <Progress
  //             type="circle"
  //             strokeColor="#60c23f"
  //             width={200}
  //             percent={progress.toPrecision(4)}
  //             center="true"
  //           />
  //         </VStack>
  //       </Box>
  //     </Html>
  //   );
  // }

  //--------------- XR STUFF ---------------------------------//

  // function ButtonVR(props) {
  //   const [hover, setHover] = useState(false);
  //   const [color, setColor] = useState(0x123456);

  //   return (
  //     <Interactive
  //       onSelect={() => setColor((Math.random() * 0xffffff) | 0)}
  //       onHover={() => setHover(true)}
  //       onBlur={() => setHover(false)}
  //     >
  //       <BoxVR
  //         scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
  //         args={[0.4, 0.1, 0.1]}
  //         {...props}
  //       >
  //         <meshStandardMaterial attach="material" color={color} />
  //         <TextVR
  //           position={[0, 0, 0.06]}
  //           fontSize={0.1}
  //           color="white"
  //           anchorX="center"
  //           anchorY="middle"
  //         >
  //           KONDUX IS A GAME CHANGER!!!
  //         </TextVR>
  //       </BoxVR>
  //     </Interactive>
  //   );
  // }

  // function PlayerExample() {
  //   const { player } = useXR();

  //   useFrame(() => {
  //     player.rotation.x = player.rotation.y += 0.01;
  //   });

  //   return null;
  // }

  // function HitTestExample() {
  //   const ref = useRef();

  //   useHitTest((hit) => {
  //     hit.decompose(
  //       ref.current.position,
  //       ref.current.rotation,
  //       ref.current.scale
  //     );
  //   });

  //   return <BoxVR ref={ref} args={[0.1, 0.1, 0.1]} />;
  // }

  // function Scene({ children }) {
  //   const outer = useRef(THREE.Group);
  //   const inner = useRef(THREE.Group);
  //   useFrame(({ camera, clock }) => {
  //     outer.current.position.y = THREE.MathUtils.lerp(
  //       outer.current.position.y,
  //       0,
  //       0.06
  //     );
  //     inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 4) * Math.PI;
  //     inner.current.position.z = 1 + -Math.sin(clock.getElapsedTime() / 4) * 10;
  //     inner.current.position.y = -1 + Math.sin(clock.getElapsedTime() / 4) * 2;
  //   });
  //   return (
  //     <group position={[0, -5, -2]} ref={outer}>
  //       <group ref={inner}>{children}</group>
  //     </group>
  //   );
  // }

  // Screen Record functions -------- //

  // Initialize and pass in canvas.

  // const canvas = document.getElementById("ViewportCanvas");

  // CanvasCapture.init(canvas, {
  //   showRecDot: true,
  //   showAlerts: true,
  //   showDialogs: true,
  //   verbose: false,
  //   ffmpegCorePath: "./dist/ffmpeg-core.js",
  // });

  // const mp4Capture = CanvasCapture.ACTIVE_CAPTURE;

  // function startRecording() {
  //   // Start recording.
  //   mp4Capture = CanvasCapture.beginVideoRecord({
  //     format: CanvasCapture.MP4,
  //     name: `Kondux_Rec${Date.now()}mp4`,
  //     fps: 60,
  //   });
  //   CanvasCapture.recordFrame();
  //   setIsRecording(true);
  // }

  // function stopRecording() {
  //   CanvasCapture.stopRecord(mp4Capture);
  //   mp4Capture = undefined;
  //   setIsRecording(false);
  // }

  // function downloadVideo() {
  //   if (mp4Capture) {
  //     const mp4File = new File([mp4Capture], "Kondux_Scene.mp4", {
  //       type: "video/mp4",
  //     });
  //     saveAs(mp4File, `Kondux_Scene-${Date.now()}.mp4`);
  //   }
  // }

  // function ShareModal(props) {
  //   return (
  //     <Modal {...props} className="rn-popup-modal share-modal-wrapper" centered>
  //       {props.show && (
  //         <button
  //           type="button"
  //           className="btn-close"
  //           aria-label="Close"
  //           onClick={props.onHide}
  //         >
  //           <i className="feather-x" />
  //         </button>
  //       )}

  //       <Modal.Header className="share-area">
  //         <h5 className="modal-title">Share this video!</h5>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <ul className="social-share-default">
  //           <li>
  //             <a href="#!">
  //               <span className="icon">
  //                 <i className="feather-facebook" />
  //               </span>
  //               <span className="text">facebook</span>
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#!">
  //               <span className="icon">
  //                 <i className="feather-twitter" />
  //               </span>
  //               <span className="text">twitter</span>
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#!">
  //               <span className="icon">
  //                 <i className="feather-linkedin" />
  //               </span>
  //               <span className="text">linkedin</span>
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#!">
  //               <span className="icon">
  //                 <i className="feather-instagram" />
  //               </span>
  //               <span className="text">instagram</span>
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#!">
  //               <span className="icon">
  //                 <i className="feather-youtube" />
  //               </span>
  //               <span className="text">youtube</span>
  //             </a>
  //           </li>
  //         </ul>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // }

  // function VideoModal(props) {
  //   return (
  //     <Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Watch Your Recorded Video!
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         {!!videoBlob && (
  //           <Player src={window.URL.createObjectURL(videoBlob)} />
  //         )}
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button
  //           onClick={() => {
  //             setShowShareModal(true);
  //           }}
  //         >
  //           Share
  //         </Button>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }

  ///-----------------VIEWPORT RETURN---------------------------/////////

  return (
    <>
      {deviceSelected === false ? (
        <></>
      ) : (
        // <Box w="100%" pt={40}>
        //   <Center>
        //     <VStack align="center" justify="center">
        //       <Center>
        //         <Box>
        //           <TextCha fontSize="6xl" style={{ color: "white" }}>
        //             Choose one below:
        //           </TextCha>
        //           <Spacer p={5} />

        //           <DeviceLoader />
        //         </Box>
        //       </Center>
        //     </VStack>
        //   </Center>
        // </Box>
        <>
          <Suspense fallback={null}>
            {deviceSelected === true && progress === 100 ? (
              <Box>
                <HStack
                  // align="center"
                  // justify="center"
                  width="100%"
                  style={cssStyles.overlay}
                >
                  <Box>
                    {atHome === true ? (
                      // <AwesomeButton
                      //   style={{ fontSize: "20px" }}
                      //   size={size}
                      //   type="primary"
                      //   ripple
                      //   onPress={() => getInShip()}
                      // >
                      //   <Icon
                      //     className="Icons"
                      //     as={GiUfo}
                      //     boxSize="6"
                      //     color="on-accent-subtle"
                      //   />
                      // </AwesomeButton>
                      <></>
                    ) : (
                      <></>
                    )}

                    {/* <Button
               size="large"
               shape="round"
               type="primary"
               style={{ background: "orange", borderColor: "orange" }}
               onClick={getInShip}
             >
               <Icon as={RiSpaceShipFill} />
             </Button> */}
                    {/* <Spacer p={2} /> */}

                    {inShip === true ? (
                      <AwesomeButton
                        style={{ fontSize: "20px" }}
                        size={size}
                        type="link"
                        ripple
                        onPress={() => getAtHome()}
                      >
                        <Icon
                          className="Icons"
                          as={GiUfo}
                          boxSize="6"
                          color="on-accent-subtle"
                        />
                        {/*  */}
                      </AwesomeButton>
                    ) : (
                      <></>
                    )}

                    {inShip === true ? (
                      <AwesomeButton
                        style={{ fontSize: "20px" }}
                        size={size}
                        type="primary"
                        ripple
                        onPress={() => getInHallway()}
                      >
                        {inHallway === true ? (
                          <Icon
                            className="Icons"
                            as={ImEnter}
                            boxSize="6"
                            color="on-accent-subtle"
                          />
                        ) : (
                          <Icon
                            className="Icons"
                            as={ImEnter}
                            boxSize="6"
                            color="on-accent-subtle"
                          />
                        )}

                        {/*  */}
                      </AwesomeButton>
                    ) : (
                      <></>
                    )}

                    {inHallway === true ? (
                      <>
                        <AwesomeButton
                          style={{ fontSize: "20px" }}
                          size={size}
                          type="link"
                          ripple
                          onPress={() => getInShip()}
                        >
                          <Icon
                            className="Icons"
                            as={GiUfo}
                            boxSize="6"
                            color="on-accent-subtle"
                          />
                        </AwesomeButton>
                        <AwesomeButton
                          style={{ fontSize: "20px" }}
                          size={size}
                          type="primary"
                          ripple
                          onPress={() => getAtHome()}
                        >
                          <Icon
                            className="Icons"
                            as={ImEnter}
                            boxSize="6"
                            color="on-accent-subtle"
                          />
                        </AwesomeButton>
                      </>
                    ) : (
                      <></>
                    )}

                    <Box style={cssStyles.overlayMusicButton}>
                      {isPlaying === true ? (
                        <div className="icon-box">
                          <Button
                            color="primary-alta"
                            className="connectBtn"
                            size="small"
                            style={{
                              fontSize: "20px",
                              zIndex: 9999,
                            }}
                            onClick={() => playButton()}
                          >
                            <Icon
                              className="Icons"
                              as={VscDebugPause}
                              boxSize="6"
                              color="on-accent-subtle"
                            />
                          </Button>
                        </div>
                      ) : (
                        <div className="icon-box">
                          <Button
                            color="primary-alta"
                            className="connectBtn"
                            size="small"
                            style={{
                              fontSize: "20px",
                              zIndex: 9999,
                            }}
                            onClick={() => playButton()}
                          >
                            <Icon
                              className="Icons"
                              as={GiMusicalNotes}
                              boxSize="6"
                              color="on-accent-subtle"
                            />
                          </Button>
                        </div>
                      )}
                    </Box>

                    <Box style={cssStyles.overlayFullScreen}>
                      {isFullScreenHeight === "100vh" ? (
                        <div className="icon-box">
                          <Button
                            color="primary-alta"
                            className="connectBtn"
                            size="small"
                            style={{
                              fontSize: "20px",
                              zIndex: 9999,
                            }}
                            onClick={() => fullscreenButton()}
                          >
                            <Icon
                              className="Icons"
                              as={BsFullscreenExit}
                              boxSize="6"
                              color="on-accent-subtle"
                            />
                          </Button>
                        </div>
                      ) : (
                        <div className="icon-box">
                          <Button
                            color="primary-alta"
                            className="connectBtn"
                            size="small"
                            style={{
                              fontSize: "20px",
                              zIndex: 9999,
                            }}
                            onClick={() => fullscreenButton()}
                          >
                            <Icon
                              className="Icons"
                              as={BiFullscreen}
                              boxSize="6"
                              color="on-accent-subtle"
                            />
                          </Button>
                        </div>
                      )}
                    </Box>

                    {/* {isFullScreen === true ? (
                    <AwesomeButton
                      size="medium"
                      type="secondary"
                      onPress={() => fullScreenButton()}
                    >
                      <p>MAX</p>
  
                    </AwesomeButton>
                  ) : (
                    <AwesomeButton
                      size="medium"
                      type="secondary"
                      onPress={() => fullScreenButton()}
                    >
                      <p>MIN</p>
  
                    </AwesomeButton>
                  )} */}
                  </Box>
                </HStack>
              </Box>
            ) : (
              <>
                <Center>
                  <Skeleton
                    speed="1.5"
                    startColor="black"
                    endColor="black"
                    height="20px"
                    width="20px"
                  ></Skeleton>
                </Center>
              </>
            )}

            {/* <StandardReality
              style={{
                background: "black",
                // width: "50vw",
                height: `${isFullScreenHeight}`,
                width: `${isFullScreenWidth}`,
                position: `${isFullScreenPosition}`,
                left: 0,
                // zIndex: 0,
              }}
            > */}
            <Canvas
              id="ViewportCanvas"
              // onCreated={(canvasCtx) => {
              //   canvasCtx.gl.physicallyCorrectLights = true;
              // }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              // onKeyDown={handleKeyPress}
              className={isFullScreenTop}
              // frameloop="demand"
              shadows
              shadowMap
              colorManagement
              style={{
                background: "black",
                height: `${isFullScreenHeight}`,
                width: `${isFullScreenWidth}`,
                position: `${isFullScreenPosition}`,
                left: 0,
                top: 0,
                zIndex: 0,
              }}
              dpr={Math.max(window.devicePixelRatio, 2)}
              // performance={{ current: 1, min: 0.1, max: 1, debounce: 200 }}
              gl={{
                alpha: true,
                premultipliedAlpha: false,
                preserveDrawingBuffer: true,
                antialias: true,
                powerPreference: "low-power",
                logarithmicDepthBuffer: true,
              }}
              camera={{
                rotation: [-Math.PI / 2, Math.PI / 10, 0],
                position: [0, 10, 4],
                fov: 40,
                near: 0.0000000000000000000001,
                far: 1000,
              }}
            >
              {/* <ambientLight /> */}

              {bgLink === "Moon.glb" ? (
                <>
                  <Lights />
                </>
              ) : (
                <>
                  <AccumulativeShadows
                    temporal
                    frames={100}
                    color="goldenrod"
                    alphaTest={0.65}
                    opacity={2}
                    scale={14}
                    position={[0, -0.5, 0]}
                  >
                    <RandomizedLight
                      amount={8}
                      radius={4}
                      ambient={0.5}
                      bias={0.001}
                      position={[5, 5, -10]}
                    />
                  </AccumulativeShadows>
                  {/* <directionalLight
                    intensity={2.5}
                    position={[-5, 5, 5]}
                    castShadow
                    // shadow-camera-left={-20}
                    // shadow-camera-right={20}
                    // shadow-camera-top={20}
                    // shadow-camera-bottom={-20}
                    shadow-camera-near={0.1}
                    shadow-camera-far={500}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                    shadow-mapSize-width={10240}
                    shadow-mapSize-height={10240}
                  /> */}
                </>
              )}

              <PerspectiveCamera
                makeDefault
                // ref={cameraRef}
                position={[0, 3, 5]}
              />

              {/* <color attach="background" args={["lightblue"]} /> */}
              {/* <PresentationControls
            global={true} // Spin globally or by dragging the model
            snap={false} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factor
            zoom={1.25} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[0, Math.PI / 2]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
            // config = { mass: 1, tension: 170, friction: 26 } // Spring config
          > */}
              {/* <ambientLight intensity={0.5} /> */}
              {/* <pointLight position={[5, 5, 5]} /> */}
              {/* <Hands
            /> */}
              {/* <Button position={[0, 0.8, -1]} /> */}
              {/* <DefaultXRControllers /> */}
              {/* {false && <PlayerExample />}
            {false && <HitTestExample />} */}
              {/* <ContactShadows
              renderOrder={2}
              color="black"
              resolution={1024}
              frames={1}
              scale={10}
              blur={1.5}
              opacity={0.65}
              far={0.5}
            /> */}
              {/* <Selection>
                                <EffectComposer
                                    multisampling={8}
                                    autoClear={false}
                                    disableNormalPass={true}
                                >
                                    <DepthOfField
                                        focusDistance={0.01}
                                        focalLength={5}
                                        bokehScale={0.5}
                                        height={640}
                                    />
                                    <Outline
                                        blur
                                        visibleEdgeColor="white"
                                        edgeStrength={100}
                                        width={500}
                                    />
                                    <Bloom
                                        luminanceThreshold={0.5}
                                        luminanceSmoothing={0.9}
                                        height={300}
                                        opacity={0.15}
                                    />
                                    <Noise opacity={0.005} />
                                    <Vignette
                                        eskil={false}
                                        offset={0.1}
                                        darkness={0.9}
                                    />
                                </EffectComposer> */}
              {atHome === true ? (
                // NOT IN SHIP - AT HOME
                <Suspense fallback={null}>
                  {colorMode === "dark" ? (
                    <>
                      <Environment
                        background={false} // Whether to affect scene.background
                        files={"satara_night_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      />
                      <Stars fade />
                    </>
                  ) : (
                    <>
                      <Environment
                        background={false} // Whether to affect scene.background
                        files={"lilienstein_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      />
                      <Sky sunPosition={[100, 15, 100]} />
                    </>
                  )}

                  {/* <Particles {...props} /> */}

                  {/* <Cloud
            opacity={0.5}
            speed={0.1} // Rotation speed
            width={2} // Width of the full cloud
            depth={-15} // Z-dir depth
            segments={10} // Number of particles
          /> */}

                  {/* <fog attach="fog" args={["black", 0, 100]} /> */}
                  {/* <fog attach="fog" args={["#A8DF9A", 0, 7]} /> */}
                  {/* Other Lights */}

                  {/* Disco Light  */}
                  {/* <spotLight
                    intensity={0.8}
                    position={[0, 0, 7]}
                    angle={110}
                    penumbra={0.5}
                    color={lightColor}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                  />
  
                  <spotLight
                    intensity={0.8}
                    position={[0, 0, -5]}
                    rotation={[180, 0, 0]}
                    angle={110}
                    penumbra={0.5}
                    color={lightColor}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                  /> */}

                  {/* <Ground /> */}

                  {/* <Image url={bgLink} /> */}
                  {/* <mesh scale={50} position={[0, -1, -1.5]}>
          <planeGeometry />
          <meshStandardMaterial
            color="#C93C07"
            toneMapped={false}
            fog={true}
            envMapIntensity={0}
          />
        </mesh> */}

                  {/* <Text
                    position={[0, 4.5, -5]}
                    fontSize={0.7}
                    color="white"
                    // font="/noto.woff"
                    material-fog={false}
                    letterSpacing={0.02}
                  >
                    BG LINK, {bgLink}!!!
                  </Text>
  
                  <Text
                    position={[0, 6.5, -5]}
                    fontSize={0.7}
                    color="white"
                    // font="/noto.woff"
                    material-fog={false}
                    letterSpacing={0.02}
                  >
                    AVATAR LINK, {avatarLink}!!!
                  </Text> */}

                  {/* <Ground /> */}

                  {/* TURNED OFF RECENTLY */}
                  {/* <Effects /> */}
                  {/* // NOT IN SHIP - AT HOME */}

                  <OrbitControls
                    makeDefault
                    minZoom={1.5}
                    maxZoom={5}
                    maxAzimuthAngle={Infinity}
                    minAzimuthAngle={-Infinity}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={-Math.PI}
                    // polar={[0, Math.PI / 2]} // Vertical limits
                    // azimuth={[2, 100]} // Horizontal limits
                    autoRotateSpeed={0}
                    autoRotate
                    zoomSpeed={0.5}
                  />

                  {/* <PointerLockControls /> */}

                  {/* Animated Greys */}
                  {isMobile === true ? (
                    <>
                      <Suspense>
                        {/* <Background bglink={bgLink} /> */}
                        {/* <Models.RunningMobile /> */}
                        {/* Audio Track Model */}
                        {isPlaying === true ? (
                          <Track
                            castShadow
                            scale={20}
                            position-x={1.25}
                            position-y={1}
                            position-z={-10}
                            url={music}
                          />
                        ) : (
                          <></>
                        )}
                      </Suspense>
                    </>
                  ) : (
                    <>
                      <Suspense>
                        {/* <Scene> */}
                        {/* <Background bglink={bgLink} /> */}

                        {bgLink === "FirstContact.glb" ||
                        bgLink === "Gallery.glb" ||
                        bgLink === "Teleporter.fbx" ||
                        bgLink === "None" ||
                        // bgLink === "CyberCity.glb" ||
                        bgLink === "" ? (
                          <>
                            {" "}
                            <Ground receiveShadow />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "BAYC.glb" &&
                        (bgLink === "CyberCity.glb" ||
                          bgLink === "Vaporware.glb" ||
                          bgLink === "Gallery.glb" ||
                          bgLink === "Moon.glb") ? (
                          <>
                            {/* <Models.Breakdance1 />
                            <Models.Breakdance2 /> */}

                            {/* Greys on top of UFO */}
                            <XUFO
                              castShadow
                              scale={2.5}
                              position={[0, 6.25, 0]}
                              // rotation={[0, 0, 0]}
                            />
                            {/* <Models.Animation2 />
                            <Models.Animation3 />
                            <Models.Animation4 /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        bgLink === "FirstContact.glb" ? (
                          <>
                            {/* <Models.Breakdance1 />
                            <Models.Breakdance2 /> */}

                            {/* Greys on top of UFO */}
                            <UFO
                              castShadow
                              scale={3.5}
                              position={[0.1, 7.5, -0.25]}
                              rotation={[0.2, 0, -0.21]}
                            />
                            {/* <Models.Animation2 />
                            <Models.Animation3 />
                            <Models.Animation4 /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        bgLink === "Moon.glb" ? (
                          <>
                            {/* <Models.Breakdance1 />
                            <Models.Breakdance2 /> */}

                            {/* Greys on top of UFO */}
                            <XUFO
                              castShadow
                              scale={2.5}
                              position={[0, 6.5, 0.5]}
                              // rotation={[0, 0, 0]}
                            />
                            {/* <Models.Animation2 />
                            <Models.Animation3 />
                            <Models.Animation4 /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {bgLink === "CyberCity.glb" ||
                        bgLink === "Gallery.glb" ? (
                          <>
                            {/* <Models.Breakdance1 />
                            <Models.Breakdance2 /> */}

                            {/* Greys on top of UFO */}

                            {/* <Models.DiscoBall /> */}
                            {/* <Models.Animation2 />
                            <Models.Animation3 />
                            <Models.Animation4 /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {colorMode === "dark" &&
                        (bgLink === "FirstContact.glb" ||
                          bgLink === "CyberCity.glb" ||
                          bgLink === "Vaporware.glb") ? (
                          <>
                            <Cow
                              castShadow
                              position={[-2.5, 0, 4.5]}
                              rotation={[0, -2.2, 0]}
                            />
                            <Cow
                              castShadow
                              position={[4.6, 0, 2.5]}
                              rotation={[0, 6, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {colorMode === "light" &&
                        (bgLink === "FirstContact.glb" ||
                          bgLink === "CyberCity.glb" ||
                          bgLink === "Vaporware.glb") ? (
                          <>
                            <Cow
                              castShadow
                              position={[-2.5, 0, 4.5]}
                              rotation={[0, -0.7, 0]}
                            />

                            <Cow
                              castShadow
                              position={[4.6, 0, 2.5]}
                              rotation={[0, -1.75, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {bgLink === "Vaporware.glb" ? (
                          <Vaporware
                            receiveShadow
                            scale={0.1}
                            position={[0, 0, 0]}
                            rotation={[0, 60, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "MarbleHallway.glb" ? (
                          <MarbleHallway
                            receiveShadow
                            scale={2}
                            position={[0, -0.45, 0]}
                            rotation={[0, 60, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "CyberCity.glb" ? (
                          // <CyberCity
                          //     receiveShadow
                          //     scale={0.01}
                          //     position={[
                          //         0, -1.5, -0.1,
                          //     ]}
                          //     rotation={[0, 0, 0]}
                          // />
                          <Neon
                            receiveShadow
                            scale={0.02}
                            position={[-4.6, 1.25, -30]}
                            rotation={[0, 30, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Nucleus.glb" ? (
                          <Nucleus
                            receiveShadow
                            scale={0.02}
                            position={[0, 1.6, 25]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Space.glb" ? (
                          <Space
                            receiveShadow
                            castShadow
                            scale={1.5}
                            position={[0, 0, -7.5]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Pyramids.glb" ? (
                          <Pyramids
                            receiveShadow
                            scale={400}
                            position={[0, 9.52, 0]}
                            rotation={[0, -4.5, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Island.glb" ? (
                          <Island
                            receiveShadow
                            scale={2}
                            position={[-0.5, -0, 1.5]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Gallery2.glb" ? (
                          <Gallery2
                            receiveShadow
                            scale={45}
                            position={[0, -0.2, 0.5]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "FirstContact.glb" ? (
                          <FirstContact
                            receiveShadow
                            scale={3.7}
                            position={[2, -3.2, 4.9]}
                            rotation={[0, 40.9, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {bgLink === "Moon.glb" ? (
                          <Moon
                            receiveShadow
                            scale={12}
                            position={[0, -0.4, 0]}
                            rotation={[0, 9.25, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Audio Track Model */}
                        {isPlaying === true ? (
                          <Track
                            castShadow
                            scale={25}
                            position-x={0}
                            position-y={1}
                            position-z={-10}
                            url={music}
                          />
                        ) : (
                          <></>
                        )}

                        {/* VVV --- THIS IS AVATAR SECTION --- VVV*/}

                        {/* <Avatar avatarlink={avatarLink} /> */}

                        {avatarLink === "Greylian.glb" ? (
                          <>
                            {/* <Twerk
                            scale={0.01}
                            position={[0, -1, 0.5]}
                            rotation={[0, 0, 0]}
                          /> */}

                            {/* <Test
                            color="green"
                            scale={1}
                            position={[0, -1, 0.5]}
                            rotation={[0, 0, 0]}
                          /> */}

                            {/* <FullAvatar> */}

                            {/* IN MAIN SCENE */}

                            {/* <GreyFull
                              eyeColor={eyesLink}
                              skinColor={skinLink}
                              magColor={magLink}
                              armorColor={armorLink}
                              scale={1.5}
                              position={[0, -1, 0.5]}
                              rotation={[0, 0, 0]}
                            /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Princess.glb" ? (
                          <Princess
                            scale={1.5}
                            position={[0, -1.1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Pleiadian Base Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        !skinLink.includes("Pleiadian") ? (
                          <PleiadianBase
                            scale={0.15}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Amber Base Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Amber" &&
                        !armorLink.includes("Pleiadian") &&
                        !armorLink.includes("CyGrey") ? (
                          <Amber
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Amber Gear Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Amber" &&
                        armorLink.includes("CyGrey") ? (
                          <KonduxGearAmber
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Thor Base Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Thor" &&
                        !armorLink.includes("Pleiadian") ? (
                          <ThorBase
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Pleiadian + Armor Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Thor" &&
                        armorLink === "Pleiadian Gun Metal" ? (
                          <Thor
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Pleiadian + Cloth Gold Armor Logic */}
                        {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Thor" &&
                        armorLink === "Pleiadian Cloth Gold" ? (
                          <ThorClothGold
                            scale={1.5}
                            position={[0, -0.9, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* Rameses Base Logic */}
                        {/* {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Rameses" &&
                        !armorLink.includes("Pleiadian") ? (
                          <RamesesFull
                            armor={armorLink}
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )} */}

                        {/* Rameses Base Logic */}
                        {/* {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Astra" &&
                        !armorLink.includes("Pleiadian") ? (
                          <AstraFull
                            armor={armorLink}
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )} */}

                        {/* {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Rameses" &&
                        armorLink.includes("Pleiadian") ? (
                          <RamesesFull
                            armor={armorLink}
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )} */}

                        {/* {avatarLink === "PleiadianBase.glb" &&
                        skinLink === "Pleiadian Astra" &&
                        armorLink.includes("Pleiadian") ? (
                          <AstraFull
                            armor={armorLink}
                            scale={1.5}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )} */}

                        {avatarLink === "CyGrey.glb" ? (
                          <CyGrey
                            scale={2}
                            position={[0, -1, 0]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {/* REAL AVATAR ASSETS */}

                        {avatarLink === "RealGrey.glb" &&
                        headLink === "None" &&
                        armorLink === "None" &&
                        weaponLink === "None" ? (
                          //Grey without any assets
                          <>
                            {/* <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            /> */}

                            <Test2
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              avatar={avatarLink}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />

                            {/* <Test
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            /> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        headLink !== "None" &&
                        armorLink === "None" &&
                        weaponLink !== "None" ? (
                          //Grey with helmet and weapon, no armor
                          <>
                            <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        headLink !== "None" &&
                        armorLink === "None" &&
                        weaponLink === "None" ? (
                          //Grey with helmet only
                          <>
                            <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        headLink === "None" &&
                        armorLink === "None" &&
                        weaponLink !== "None" ? (
                          //Grey with weapon only
                          <>
                            <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        armorLink !== "None" &&
                        weaponLink === "None" ? (
                          //Grey with armor, but no weapon
                          <>
                            <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "RealGrey.glb" &&
                        armorLink !== "None" &&
                        weaponLink !== "None" ? (
                          //Grey with armor and weapon
                          <>
                            <GreyWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        headLink === "None" &&
                        armorLink === "None" &&
                        weaponLink === "None" ? (
                          //Reptilian without any assets
                          <>
                            {/* <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            /> */}

                            <Test2
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              avatar={avatarLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        headLink !== "None" &&
                        armorLink === "None" &&
                        weaponLink !== "None" ? (
                          //Reptilian with helmet and weapon, no armor
                          <>
                            <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        headLink !== "None" &&
                        armorLink === "None" &&
                        weaponLink === "None" ? (
                          //Reptilian with helmet only
                          <>
                            <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        headLink === "None" &&
                        armorLink === "None" &&
                        weaponLink !== "None" ? (
                          //Reptilian with weapon only
                          <>
                            <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        armorLink !== "None" &&
                        weaponLink === "None" ? (
                          //Reptilian with armor, but no weapon
                          <>
                            <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Reptilian.glb" &&
                        armorLink !== "None" &&
                        weaponLink !== "None" ? (
                          //Reptilian with armor and weapon
                          <>
                            <ReptWeapon
                              castShadow
                              receiveShadow
                              color={overlayMenu.armorcolor}
                              eyecolor={overlayMenu.eyecolor}
                              skin={overlayMenu.skincolor}
                              armor={armorLink}
                              head={headLink}
                              weapon={weaponLink}
                              animationClip={overlayMenu.animationClip}
                              armorVariant={overlayMenu.armorVariant}
                              scale={1.5}
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "BAYC.glb" ? (
                          <></>
                        ) : (
                          // <Confu
                          //     scale={1}
                          //     position={[0, -1, 0.1]}
                          //     rotation={[0, 0, 0]}
                          // />
                          // <BAYC2
                          //     color="saddlebrown"
                          //     scale={1}
                          //     position={[0, -1, 0.1]}
                          //     rotation={[0, 0, 0]}
                          // />
                          <></>
                        )}

                        {/* </Scene> */}
                      </Suspense>
                    </>
                  )}
                </Suspense>
              ) : (
                <></>
              )}
              {/* </Selection> */}
              {inShip === true ? (
                <Suspense fallback={null}>
                  <Environment
                    background={false} // Whether to affect scene.background
                    files={"satara_night_2k.hdr"} // Array of cubemap files OR single equirectangular file
                    path={"/"} // Path to the above file(s)
                    preset={null} // Preset string (overrides files and path)
                    scene={undefined} // adds the ability to pass a custom THREE.Scene
                  />
                  <Stars />

                  {/* Audio Track Model */}
                  {isPlaying === true ? (
                    <Track
                      scale={0.001}
                      position-x={1.25}
                      position-y={1}
                      position-z={-10}
                      url={music}
                    />
                  ) : (
                    <></>
                  )}

                  {colorMode === "dark" ? (
                    <>
                      {/* <Stars
                    radius={300}
                    depth={10}
                    count={100}
                    factor={1}
                    saturation={0}
                    fade
                  /> */}
                    </>
                  ) : (
                    <>
                      {/* <Sky sunPosition={[100, 15, 100]} /> */}
                      {/* <Models.AnimatedRealCow
                          position={[-2.5, -0.7, 4.5]}
                          rotation={[0, -0.7, 0]}
                        />
            
                        <Models.AnimatedRealCow2
                          position={[4.6, -0.7, 2.5]}
                          rotation={[0, 1.3, 0]}
                        /> */}
                    </>
                  )}

                  {/* <Particles {...props} /> */}

                  {/* <Cloud
                    opacity={0.05}
                    speed={0.1} // Rotation speed
                    width={4.5} // Width of the full cloud
                    depth={0.9} // Z-dir depth
                    segments={25} // Number of particles
                  /> */}
                  <fog attach="fog" args={["grey", 50, 100]} />
                  <fog attach="fog" args={["#A8DF9A", 50, 100]} />

                  {/* Other Lights */}
                  <ShipLights />
                  <TextVR
                    position={[0, 15, -15]}
                    fontSize={2.5}
                    color="white"
                    // font="/noto.woff"
                    material-fog={false}
                    letterSpacing={0.02}
                  >
                    WELCOME TO YOUR SHIP, {capName}
                    !!!
                  </TextVR>

                  {/* Disco Light  */}

                  {/* <spotLight
                    intensity={0.8}
                    position={[0, 0, 7]}
                    angle={110}
                    penumbra={0.5}
                    color={lightColor}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                  />
  
                  <spotLight
                    intensity={0.8}
                    position={[0, 0, -5]}
                    rotation={[180, 0, 0]}
                    angle={110}
                    penumbra={0.5}
                    color={lightColor}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                  /> */}

                  {/* Models */}
                  {/* <Models.Ship2 /> */}
                  <Ship
                    scale={0.3}
                    position={[-0.45, -1.9, 0.85]}
                    rotation={[0, 3.1, 0]}
                  />

                  {/* <mesh scale={50} position={[0, -1, -1.5]}>
                    <planeGeometry />
                    <meshStandardMaterial
                      color="#C93C07"
                      toneMapped={false}
                      fog={true}
                      envMapIntensity={0}
                    />
                  </mesh> */}

                  {/* Animated Greys */}
                  {isMobile === true ? <Seated /> : <Seated />}

                  {/* TURNED OFF RECENTLY */}
                  {/* <ShipEffects /> */}
                  {/* // IN SHIP -  */}
                  <OrbitControls
                    makeDefault
                    minZoom={1.5}
                    maxZoom={5}
                    maxAzimuthAngle={Infinity}
                    minAzimuthAngle={-Infinity}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={-Math.PI}
                    // polar={[0, Math.PI / 2]} // Vertical limits
                    // azimuth={[2, 100]} // Horizontal limits
                    // autoRotateSpeed={1.5}
                    // autoRotate
                    zoomSpeed={0.5}
                  />
                </Suspense>
              ) : (
                <></>
              )}
              {inHallway === true ? (
                // IN HALLWAY - NOT IN SHIP OR HOME
                <Suspense fallback={null}>
                  {colorMode === "dark" ? (
                    <>
                      <Environment
                        background={false} // Whether to affect scene.background
                        files={"satara_night_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      />
                      <Stars />
                    </>
                  ) : (
                    <>
                      <Environment
                        background={false} // Whether to affect scene.background
                        files={"lilienstein_2k.hdr"} // Array of cubemap files OR single equirectangular file
                        path={"/"} // Path to the above file(s)
                        preset={null} // Preset string (overrides files and path)
                        scene={undefined} // adds the ability to pass a custom THREE.Scene
                      />
                      <Sky sunPosition={[100, 15, 100]} />
                    </>
                  )}

                  {/* Other Lights */}
                  <Lights />

                  {/* Disco Light  */}
                  {/* <spotLight
                  intensity={0.8}
                  position={[0, 0, 7]}
                  angle={110}
                  penumbra={0.5}
                  color={lightColor}
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                />

                <spotLight
                  intensity={0.8}
                  position={[0, 0, -5]}
                  rotation={[180, 0, 0]}
                  angle={110}
                  penumbra={0.5}
                  color={lightColor}
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                /> */}

                  {/* <Ground /> */}

                  {/* TURNED OFF RECENTLY */}
                  {/* <Effects /> */}
                  {/* // IN HALLWAY */}

                  {/* Animated Greys */}

                  {isMobile === true ? (
                    <>
                      <Suspense>
                        {/* <Background bglink={bgLink} /> */}
                        {/* <Models.RunningMobile /> */}
                        {/* Audio Track Model */}
                        {isPlaying === true ? (
                          <Track
                            scale={20}
                            position-x={1.25}
                            position-y={1}
                            position-z={-10}
                            url={music}
                          />
                        ) : (
                          <></>
                        )}
                      </Suspense>
                    </>
                  ) : (
                    <>
                      <Suspense>
                        {/* <Avatar avatarlink={avatarLink} /> */}

                        {avatarLink === "Greylian.glb" ? (
                          <>
                            {/* <FullAvatar> */}

                            {/* IN HALLWAY */}

                            {/* <GreyFull
                              eyeColor={eyesLink}
                              skinColor={skinLink}
                              magColor={magLink}
                              armorColor={armorLink}
                              scale={1}
                              position={[0, -1, 0.5]}
                              rotation={[0, 0, 0]}
                            /> */}

                            {/* </FullAvatar> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {avatarLink === "Princess.glb" ? (
                          <Princess
                            scale={0.95}
                            position={[0, -1.05, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {avatarLink === "CyGrey.glb" ? (
                          <CyGrey
                            scale={2}
                            position={[0, -1, 0]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        {avatarLink === "BAYC.glb" ? (
                          <BAYC2
                            color="saddlebrown"
                            scale={1}
                            position={[0, -1, 0.1]}
                            rotation={[0, 0, 0]}
                          />
                        ) : (
                          <></>
                        )}

                        <MarbleHallway
                          scale={2}
                          position={[0, -0.45, 0]}
                          rotation={[0, 60, 0]}
                        />

                        {/* Audio Track Model */}
                        {isPlaying === true ? (
                          <Track
                            castShadow
                            scale={20}
                            position-x={1.25}
                            position-y={1}
                            position-z={-10}
                            url={music}
                          />
                        ) : (
                          <></>
                        )}
                      </Suspense>
                    </>
                  )}
                </Suspense>
              ) : (
                <></>
              )}

              {/* <Preload all /> */}
              {/* <BakeShadows /> */}
              {/* <BoxVR castShadow receiveShadow position={[0, 4, 0]}>
                <meshStandardMaterial attach="material" color="white" />
              </BoxVR> */}
              <mesh
                rotation={[-0.5 * Math.PI, 0, 0]}
                position={[0, -1, 0]}
                receiveShadow
              >
                {/* <planeBufferGeometry args={[1, 1, 1, 1]} /> */}
                <meshPhongMaterial transparent opacity="1" attach="material" />
                {/* <shadowMaterial transparent attach="material" opacity={0.75} /> */}
              </mesh>
              {/* <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -5, 0]}
                opacity={0.4}
                width={30}
                height={30}
                blur={1}
                far={15}
              /> */}
              {/* <WasdControls /> */}
            </Canvas>
            {/* </StandardReality> */}
            <overlayMenu style={{ paddingLeft: "50px" }} />
          </Suspense>
          <Loader containerStyles={cssStyles.loader} />

          {/* Input for color */}
          {/* <Picker />
                    <EyePicker /> */}
          <Leva
            // className="LevaContainer"
            // style={{
            //   position: "absolute",
            //   zIndex: 9999,
            //   top: "20vh",
            //   left: "20vw",
            // }}
            collapsed={true}
            theme={myTheme} // you can pass a custom theme (see the styling section)
            titleBar={{ title: "Customize", filter: false }}
            oneLineLabels={true} // default = false, alternative layout for labels, with labels and fields on separate rows
          />

          {/* <VideoRecorder style={cssStyles.overlayRecorder} /> */}

          {/* <RecordView /> */}

          {/* <div
                        className="Scren-Record-Wrapper"
                        style={{ padding: "5px 20px" }}
                             // Dynamically load fuse.js

                    >
                        {async () => {const MediaRec = (await import('react-media-recorder')).default const Media = new MediaRec() RecordView()}}
                    </div> */}

          {/* <input
                        placeholder="Enter Color Here"
                        id="name"
                        type="text"
                        value={avatarColor}
                        style={cssStyles.overlayColorInput}
                        onChange={(e) => setAvatarColor(e.target.value)}
                    /> */}
        </>
      )}
    </>
  );
}
