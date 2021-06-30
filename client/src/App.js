import React, { useContext } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import Chat from "./components/Chat/Chat";
import { SocketContext } from "./SocketContext";

const App = () => {
  const { callAccepted, callEnded, name, room } = useContext(SocketContext);
  // const id = me;
  return (
    <div className="container">
      <div
        className="columns is-multiline"
        style={!callAccepted ? { alignItems: "center" } : {}}
      >
        <div className="column is-9">
          <VideoPlayer />
        </div>
        <div className="column is-3 is-flex">
          <Options>
            <Notifications />
          </Options>
          {callAccepted && !callEnded && <Chat name={name} room={room} />}
        </div>
      </div>
    </div>
  );
};

export default App;
