import React, {useContext} from 'react'
import { SocketContext } from '../SocketContext'

const Notifications = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
    // console.log(call)
    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{display: 'block'}}>
                    <p>{call.name} is calling</p>
                    <button onClick={answerCall}>Answer</button>
                </div>
            )}
        </>
    )
}

export default Notifications
