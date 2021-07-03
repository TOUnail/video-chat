import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import { SocketContext } from '../SocketContext';
import styles from "./Notifications.module.css"

const Overlay = (props) => {
    return (
        <div className={`${styles.notifications} modal is-active`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="message is-success has-text-centered">
                    <div className="message-header is-justify-content-center">
                        <p>{props.name} is calling.</p>
                    </div>
                    <div className="message-body">
                        <button className="mx-2 button is-success" onClick={props.answerCall}><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg> Answer</button>
                        <button className={`mx-2 button is-danger is-outlined ${styles.declineCall}`} onClick={props.declineCall}>
                        <svg style={{transform: 'rotate(135deg)'}} className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg> Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const DeclineOverlay = (props) => {
    return (
        <div className={`${styles.notifications} modal is-active`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="message is-danger has-text-centered">
                    <div className="message-header is-justify-content-center">
                        <p>Call Declined</p>
                    </div>
                    <div className="message-body">
                    <p>Your call was declined.</p>
                    <button className="button mt-3 is-danger" onClick={()=>window.location.reload()}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Notifications = () => {
    const {answerCall, call, callAccepted, declineCall, callDeclined} = useContext(SocketContext);
    return (
        <>
            {call.isReceivingCall && !callAccepted &&
                ReactDOM.createPortal(<Overlay name={call.name} answerCall={answerCall} declineCall={declineCall} />, document.getElementById('modal-root'))
                
             } 
             {callDeclined && 
                ReactDOM.createPortal(<DeclineOverlay name={call.name} />, document.getElementById('modal-root'))
             }
        </>
    )
}

export default Notifications
