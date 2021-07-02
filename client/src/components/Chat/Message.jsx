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
            <div className={styles.me}>
            {name}: {text}
        </div>
        ) : (
            <div className={styles.recipient}>
                {user} : {text}
            </div>
        )
        
    )
}

export default Message
