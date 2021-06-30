import React, {useContext,useState} from 'react';
import { SocketContext } from '../SocketContext';

import styles from "./VideoPlayer.module.css";
// import Chat from "./Chat"
// import Options from "./Options";
// import Notifications from "./Notifications"

const VideoPlayer = () => {
    const [showHangUp, setShowHangUp] = useState(false);
    const {
        // name,
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        stream,
        leaveCall
        // call,
    } = useContext(SocketContext)
    //console.log(call)
    return (
        <>
        <section className={styles.videoContainer}>
            {
                callAccepted && !callEnded && (
                    <div onMouseEnter={()=>setShowHangUp(true)} onMouseLeave={()=>setShowHangUp(false)} className={styles.userVideo}>
                        <button className={`button is-danger ${styles.hangUp}${showHangUp ? "" : " is-hidden"}`} onClick={leaveCall}>Hang Up</button>
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
            
        </section>
        
      {/* <Options>
        <Notifications />
      </Options> */}
        </>
    )
}

export default VideoPlayer
