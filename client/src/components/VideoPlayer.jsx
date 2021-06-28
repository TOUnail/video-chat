import React, {useContext} from 'react';
import { SocketContext } from '../SocketContext';

import styles from "./VideoPlayer.module.css";
// import Chat from "./Chat"
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
    } = useContext(SocketContext)
    //console.log(call)
    return (
        <>
        <section className={styles.videoPlayer}>
            {
                callAccepted && !callEnded && (
                    <div className={styles.userVideo}>
                        <p>{call.name || "Name"}</p>
                        <video muted playsInline ref={userVideo} autoPlay className={styles.video} />
                    </div>
                )
            }
            {
                stream && (
                    <>
                    {/* <p>{name || "Name"}</p> */}
                    <div className={`${styles.videoWrapper} ${callAccepted && !callEnded && styles.startCall}`}>
                        <video playsInline muted ref={myVideo} autoPlay className={styles.video} />
                    </div>
                    </>
                )
            }
            
      <Options>
        <Notifications />
      </Options>
        </section>
        
        </>
    )
}

export default VideoPlayer
