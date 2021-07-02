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
        className={`columns is-variable is-0 is-3-desktop is-multiline${
          !callAccepted ? " is-align-items-center" : ""
        }`}
      >
        <div className="column is-full is-two-thirds-desktop py-0">
          <VideoPlayer />
        </div>
        <div className="column py-0">
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
