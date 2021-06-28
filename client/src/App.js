import React, { useContext } from "react";
import VideoPlayer from "./components/VideoPlayer";
// import Options from "./components/Options";
// import Notifications from "./components/Notifications";
import Chat from "./components/Chat/Chat";
import { SocketContext } from "./SocketContext";

const App = () => {
  const { callAccepted, callEnded, name, room } = useContext(SocketContext);
  // const id = me;
  return (
    <div className="container">
      <VideoPlayer />
      {callAccepted && !callEnded && <Chat name={name} room={room} />}
    </div>
  );
};

export default App;
