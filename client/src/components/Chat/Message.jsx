import React from 'react';
import styles from "./Message.module.css"

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    if (user === name) {
        isSentByCurrentUser = true
    }
    return (
        isSentByCurrentUser ? 
        (
            <div className={`is-justify-content-flex-end my-2 mr-1 ${styles.messageWrapper}`}>
                <div className={`py-2 px-4 ${styles.me}`}>
                    {text}<br /><small className="is-size-7">{name}</small>
                </div>
            </div>
        ) : (
            
            <div className={`my-2 ${styles.messageWrapper}`}>
                <div className={`py-2 px-4 ${styles.recipient}`}>
                    {text}<br /><small className="is-size-7">{user}</small>
                </div>
            </div>
        )
        
    )
}

export default Message
