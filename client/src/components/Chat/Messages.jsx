import React from 'react';
import Message from "./Message"
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from "./Messages.module.css"

const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom className={styles.messages}>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    )
}

export default Messages
