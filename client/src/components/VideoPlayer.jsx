import React, {useContext} from 'react';
import { SocketContext } from '../SocketContext';

import styles from "./VideoPlayer.module.css";
import Chat from "./Chat"
import Options from "./Options";
import Notifications from "./Notifications"

const VideoPlayer = () => {
    const {
        name,
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        stream,
        call,
        room
    } = useContext(SocketContext)
    //console.log(call)
    return (
        <>
        <section>
            {
                stream && (
                    <div>
                        <p>{name || "Name"}</p>
                        <video playsInline muted ref={myVideo} autoPlay className={styles.video} />
                    </div>
                )
            }
            {
                callAccepted && !callEnded && (
                    <div>
                        <p>{call.name || "Name"}</p>
                        <video playsInline ref={userVideo} autoPlay className="video" />
                    </div>
                )
            }
        </section>
        <Options>
            <Notifications />
        </Options>
        {
                callAccepted && !callEnded && (
                <Chat name={name} room={room} />
                )
}
        </>
    )
}

export default VideoPlayer
