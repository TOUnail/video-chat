import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
let socket;
const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000';
    useEffect(()=>{
        // console.log(props.call)
        const {name, room} = props;
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => {
            
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT, props])
    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    },[messages])
    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }
    }
    console.log(message, messages)
    return (
        <div>
            <div>
                {room}
                <input
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyPress={e=>e.key==="Enter" ? sendMessage(e) : null}
                />
            </div>
        </div>
    )
}

export default Chat
