import React from 'react'

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    if (user === name) {
        isSentByCurrentUser = true
    }
    return (
        isSentByCurrentUser ? 
        (
            <div style={{textAlign: 'right'}}>
            {name}: {text}
        </div>
        ) : (
            <div>
                {user} : {text}
            </div>
        )
        
    )
}

export default Message
