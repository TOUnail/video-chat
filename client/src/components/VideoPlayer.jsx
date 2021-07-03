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
        mute,
        stopVideo,
        camera
        // call,
    } = useContext(SocketContext)
    //console.log(call)
    return (
        <>
        <section className={styles.videoContainer}>
            {
                callAccepted && !callEnded && (
                    <div onClick={()=>setShowHangUp(true)} onMouseEnter={()=>setShowHangUp(true)} onMouseLeave={()=>setShowHangUp(false)} className={styles.userVideo}>
                        <div className={`${styles.controls}${showHangUp ? "" : " is-hidden"}`}>
                            <div className="buttons is-right">
                                <button className={`button is-small is-danger ${styles.hangUp}`} onClick={leaveCall}>
                                <svg style={{transform: 'rotate(135deg)'}} className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Hang Up
                                </button>
                            </div>
                            <div className="buttons is-right">
                            <button className={`button is-small is-info ${styles.mute}`} onClick={muteBtn}>{mute ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-1">
<path d="M8 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H8L14 21V3L8 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17 9.35425C17.6224 10.0594 18 10.9856 18 12.0001C18 13.0145 17.6224 13.9408 17 14.6459" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21 8C21.6224 9.06603 22 10.4663 22 12C22 13.5337 21.6224 14.934 21 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg> Unmute
                                </>
                            ):(
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-1">
<path d="M22 10L20 12M20 12L18 14M20 12L18 10M20 12L22 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.5 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H8.5L15 21V3L8.5 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg> Mute
                                </>
                            )}</button></div>
                            <div className="buttons is-right">
                            <button className={`button is-small is-info is-light ${styles.hideVid}`} onClick={stopVideo}>{camera ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-1">
                                    <path d="M2 2L22 22" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>Camera Off
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-1">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="12" r="3" stroke="#296fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>Camera On
                                </>
                            )}</button></div>
                        </div>
                        <video playsInline ref={userVideo} autoPlay className={styles.video} />
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
