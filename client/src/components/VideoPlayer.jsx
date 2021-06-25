import React, {useContext} from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const {name,callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext)
    return (
        <section>
            {
                stream && (
                    <div>
                        <p>{name || "Name"}</p>
                        <video playsInline muted ref={myVideo} autoPlay className="video" />
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
    )
}

export default VideoPlayer
