import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../SocketContext';
import styles from "./Notifications.module.css"

const Overlay = (props) => {
    return (
        <div className={`${styles.notifications} modal is-active`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                    <p>{props.name} is calling</p>
                    <button onClick={props.answerCall}>Answer</button>
                </div>
            </div>
        </div>
    )
}

const Notifications = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
    
    // console.log(call)
    return (
        <>
            {call.isReceivingCall && !callAccepted &&
                ReactDOM.createPortal(<Overlay name={call.name} answerCall={answerCall} />, document.getElementById('modal-root'))
                
             } 
        </>
    )
}

export default Notifications
