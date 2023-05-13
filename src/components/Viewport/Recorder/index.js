import React, { FC, memo, useState, useEffect } from "react";
// import Button from "@ui/button";
import {
  Flex,
  Box,
  Icon,
  Theme,
  SimpleGrid,
  IconButton,
  Button,
} from "@chakra-ui/react";
import Moralis from "moralis";
import { useMoralis, useMoralisFile } from "react-moralis";
import { FaVideoSlash, FaDownload, FaCamera } from "react-icons/fa";
import { BiVideoRecording, BiStopCircle } from "react-icons/bi";
import { BsFillStopBtnFill } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { Image, Modal } from "react-bootstrap";
import Watermark from "../../../../public/images/Watermark.png";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { RecordRTCPromisesHandler } from "recordrtc";
import { saveAs } from "file-saver";
import { Share } from "react-twitter-widgets";
import { _fetchData } from "ethers/lib/utils";
import axios from "axios";

const Recorder = () => {
  const { user, authenticate } = useMoralis();
  const { saveFile, moralisFile } = useMoralisFile();
  const [isRecording, setIsRecording] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoBlob, setVideoUrlBlob] = useState(null);
  const [type, setType] = useState("screen");
  const [videoURL, setVideoURL] = useState(null);
  const [shortLink, setShortenLink] = useState(null);
  const [videoLink, setVideoLink] = useState(null);

  useEffect(() => {
    // console.log("THIS IS SHORT LINK", shortLink);
    if (user.attributes?.videoLink !== undefined) {
      const tweet = "Powered by $KNDX " + user.attributes?.videoLink;
      setVideoLink(tweet);
    }
  }, [user]);

  const cssStyles = {
    overlayRecButton: {
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
      top: "40vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },
    overlayRecPreviewButton: {
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
      top: "50vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },
    overlayRecDownloadButton: {
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
      top: "60vh",
      right: 50,
      // right: "0",
      zIndex: "4",
    },

    overlayTopLogo: {
      position: "fixed",
      // flexDirection: "row-reverse",
      // right: "0",
      objectFit: "contain",
      width: "25%",
      height: "10%",
      zIndex: 1,
      opacity: "25%",
      top: "10vh",
      left: "37%",
    },

    overlayBottomLogo: {
      position: "fixed",
      // flexDirection: "row-reverse",
      // right: "0",
      objectFit: "contain",
      width: "25%",
      height: "10%",
      zIndex: 1,
      opacity: "25%",
      bottom: "10vh",
      left: "37%",
    },
  };

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream =
      type === "video"
        ? await mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        : await mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });

    await recorder.startRecording();
    setRecorder(recorder);
    setStream(stream);
    setVideoUrlBlob(null);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob = await recorder.getBlob();
      stream.stop();
      setVideoUrlBlob(blob);
      setStream(null);
      setRecorder(null);
      setIsRecording(false);
    }
  };

  const downloadVideo = async (e) => {
    if (videoBlob) {
      const mp4File = new File([videoBlob], "Kondux_Scene.mp4", {
        type: "video/mp4",
      });

      saveAs(mp4File, `Kondux_Scene-${Date.now()}.mp4`);
    }
  };

  const previewVideo = async (e) => {
    if (videoBlob) {
      const mp4File = new File([videoBlob], "Kondux_Scene.mp4", {
        type: "video/mp4",
      });

      // setTimeout(() => {
      //     alert(`Video download ready!`);
      // }, 700);

      setModalShow(true);
    }
  };

  async function UploadToCloud() {
    if (videoBlob) {
      const mp4File = new File([videoBlob], "Kondux_Scene.mp4", {
        type: "video/mp4",
      });

      const shortenLink = async (freshLink) => {
        try {
          const res = await axios(
            `https://api.shrtco.de/v2/shorten?url=${freshLink}`
          );
          console.log("THIS IS RES", res);
          setShortenLink(res.data.result.full_short_link3);

          console.log("THIS IS NEW SHORT LINK", shortLink);

          if (shortLink !== null) {
            user.set("videoLink", shortLink);
            await user.save();
          }
        } catch (err) {
          console.log("THIS IS ERR", err);
        } finally {
          console.log("LINK SHORTEN");
        }
      };

      const file = mp4File;
      const name = `Kondux_Scene-${Date.now()}.mp4`;
      let fileIpfs = await saveFile(name, file, { saveIPFS: true });
      user.set("recordedVideo", fileIpfs);
      await user.save();

      const freshLink = user.attributes.recordedVideo._url;
      shortenLink(freshLink);

      // setTimeout(() => {
      //     alert(`Video download ready!`);
      // }, 700);

      setShowShareModal(true);
    }
  }

  function ShareModal(props) {
    return (
      <Modal {...props} className="rn-popup-modal share-modal-wrapper" centered>
        {props.show && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={props.onHide}
          >
            <i className="feather-x" />
          </button>
        )}

        <Modal.Header className="share-area">
          <h5 className="modal-title">Share this video!</h5>
        </Modal.Header>
        <Modal.Body>
          <ul className="social-share-default">
            <li>
              <a href="#!">
                <span className="icon">
                  <i className="feather-facebook" />
                </span>
                <span className="text">facebook</span>
              </a>
            </li>
            <li>
              <a href="#!">
                <span className="icon">
                  <i className="feather-twitter" />
                </span>
                <Share
                  url={videoLink}
                  options={{
                    hashtags: "KNDX,KONDUX",
                  }}
                />
              </a>
            </li>

            <li>
              <a href="#!">
                <span className="icon">
                  <i className="feather-instagram" />
                </span>
                <span className="text">instagram</span>
              </a>
            </li>
            <li>
              <a href="#!">
                <span className="icon">
                  <i className="feather-youtube" />
                </span>
                <span className="text">youtube</span>
              </a>
            </li>
            <li>
              <a target="_blank" href={shortLink}>
                <span className="icon">
                  <i className="feather-link" />
                </span>
                <span className="text">link</span>
              </a>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    );
  }

  function VideoModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Watch Your Recorded Video!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!videoBlob && (
            <Player src={window.URL.createObjectURL(videoBlob)} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              UploadToCloud();
            }}
          >
            Upload And Share
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      {isRecording === false ? (
        <></>
      ) : (
        <>
          {" "}
          <Image
            src={"/Watermark.png"}
            alt="watermark"
            style={cssStyles.overlayTopLogo}
          />
          <Image
            src={"/Watermark.png"}
            alt="watermark2"
            style={cssStyles.overlayBottomLogo}
          />
        </>
      )}

      <Box style={cssStyles.overlayRecButton}>
        {isRecording === true ? (
          <div className="icon-box">
            <Button
              color="primary-alta"
              className="connectBtn"
              size="small"
              style={{
                fontSize: "20px",
                zIndex: 9999,
              }}
              onClick={() => stopRecording()}
            >
              <Icon
                className="Icons"
                as={BsFillStopBtnFill}
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
              onClick={() => startRecording()}
            >
              <Icon
                className="Icons"
                as={BiVideoRecording}
                boxSize="6"
                color="on-accent-subtle"
              />
            </Button>
          </div>
        )}
      </Box>

      <Box style={cssStyles.overlayRecPreviewButton}>
        <div className="icon-box">
          <Button
            disabled={!!!videoBlob}
            color="primary-alta"
            className="connectBtn"
            size="small"
            style={{
              fontSize: "20px",
              zIndex: 9999,
            }}
            onClick={() => previewVideo()}
          >
            <Icon
              className="Icons"
              as={MdOutlineVideoLibrary}
              boxSize="6"
              color="on-accent-subtle"
            />
          </Button>
        </div>
      </Box>

      <Box style={cssStyles.overlayRecDownloadButton}>
        <div className="icon-box">
          <Button
            disabled={!!!videoBlob}
            color="primary-alta"
            className="connectBtn"
            size="small"
            style={{
              fontSize: "20px",
              zIndex: 9999,
            }}
            onClick={() => downloadVideo()}
          >
            <Icon
              className="Icons"
              as={FaDownload}
              boxSize="6"
              color="on-accent-subtle"
            />
          </Button>
        </div>
      </Box>

      <VideoModal show={modalShow} onHide={() => setModalShow(false)} />

      {showShareModal === true ? (
        <ShareModal
          show={showShareModal}
          onHide={() => setShowShareModal(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Recorder;
