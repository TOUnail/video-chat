import React from 'react';
import Message from "./Message"
// import ScrollToBottom from 'react-scroll-to-bottom';
import ScrollableFeed from "react-scrollable-feed"

import styles from "./Messages.module.css"

const Messages = ({messages, name}) => {
    // TODO: fix design for responsive
    return (
        <ScrollableFeed className={styles.messages}>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollableFeed>
    )
}

export default Messages
