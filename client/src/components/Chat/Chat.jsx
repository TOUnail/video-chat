import React, {useState, useEffect} from 'react';
import Messages from "./Messages";
import io from 'socket.io-client';
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
            // console.log('back from emit')
            setMessages([...messages, message])
        })
    },[messages])

    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, chatName, chatRoom, ()=>setMessage(''))
        }
    }
    //console.log(messages)
    return (
        <div>
            <div>
                <Messages messages={messages} name={chatName} />
                {/* {messages.map((mes,i)=><div key={i}>
                    <div>{mes.user}</div>
                    <div>{mes.text}</div>
                </div>)} */}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyPress={e=>e.key==="Enter" ? sendMessage(e) : null}
                />
                <button disabled={message.length === 0} onClick={e=>sendMessage(e)}>Send</button>
            </div>
        </div>
    )
}

export default Chat
