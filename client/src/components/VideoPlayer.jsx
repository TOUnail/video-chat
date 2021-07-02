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
        leaveCall,
        muteBtn,
        stopVideo
        // call,
    } = useContext(SocketContext)
    //console.log(call)
    return (
        <>
        <section className={styles.videoContainer}>
            {
                callAccepted && !callEnded && (
                    <div onMouseEnter={()=>setShowHangUp(true)} onMouseLeave={()=>setShowHangUp(false)} className={styles.userVideo}>
                        <div className={`${styles.controls}${showHangUp ? "" : " is-hidden"}`}>
                            <div className="buttons is-right">
                            <button className={`button is-small is-danger ${styles.hangUp}`} onClick={leaveCall}>Hang Up</button></div>
                            <div className="buttons is-right">
                            <button className={`button is-small is-info ${styles.mute}`} onClick={muteBtn}>Mute</button></div>
                            <div className="buttons is-right">
                            <button className={`button is-small is-info is-light ${styles.hideVid}`} onClick={stopVideo}>Stop Video</button></div>
                        </div>
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
