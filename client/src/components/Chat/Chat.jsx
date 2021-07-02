import React, {useState, useEffect} from 'react';
import Messages from "./Messages";
import io from 'socket.io-client';

import styles from "./Chat.module.css"
const ENDPOINT = 'localhost:5000';
let socket;
const Chat = ({name, room}) => {
    const [chatName, setChatName] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        
    // const {name, room} = props;
        socket = io(ENDPOINT);
        
        setChatName(name);
        setChatRoom(room);
        socket.emit('join', {name, room}, (error)=> {
            if (error) {
                alert(error)
            }
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[]) // eslint-disable-line 

    useEffect(()=>{
        socket.on('message', (message) => {
            console.log(messages)
            setMessages([...messages, message])
        })
        return () => {
            socket.off('message')
        }
    },[messages])

    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, chatName, chatRoom, ()=>setMessage(''))
        }
    }
    //console.log(messages)
    return (
        <div className={`${styles.chatContainer} is-flex is-flex-direction-column is-justify-content-space-between`}>
            <div className={`${styles.messageContainer} is-flex is-justify-content-flex-end is-align-items-flex-end`}>
                <Messages messages={messages} name={chatName} />
                {/* {messages.map((mes,i)=><div key={i}>
                    <div>{mes.user}</div>
                    <div>{mes.text}</div>
                </div>)} */}
            </div>
            {/* TODO Set height to Messages component */}
            <div className={styles.inputContainer}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    className="input is-medium"
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyPress={e=>e.key==="Enter" ? sendMessage(e) : null}
                />
                    </div>
                    <div className="control">
                <button className="button is-info is-medium" disabled={message.length === 0} onClick={e=>sendMessage(e)}>Send</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
