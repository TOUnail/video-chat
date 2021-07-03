import React, { createContext, useState, useRef, useEffect } from "react";

import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callDeclined, setCallDeclined] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mute, setMute] = useState(false);
  const [camera, setCamera] = useState(true);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(
          { video: true, audio: true },
          (stream) => {
            let video = document.querySelector("video");
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
              video.play();
            };
          },
          (err) => {
            alert(err.name);
          }
        )
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
          setMute(!currentStream.getAudioTracks()[0].enabled);
        });
    }
    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const muteBtn = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };
  const stopVideo = () => {
    const enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setCamera(false);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setCamera(true);
    }
  };
  const answerCall = () => {
    // console.log(`answerCall id: ${me}`);
    setRoom(me);
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const declineCall = () => {
    socket.emit("declineCall", { from: call.from, name: me });
    setCall({});
  };
  const callUser = (id) => {
    // console.log(`callUser id: ${id}`);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setRoom(id);
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
    socket.on("declineCall", () => {
      setCallDeclined(true);
      connectionRef.current.destroy();
    });
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        room,
        mute,
        muteBtn,
        stopVideo,
        declineCall,
        callDeclined,
        camera,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
