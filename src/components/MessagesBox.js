import React, { useRef, useEffect } from 'react'
import Message from './Message'

export default function MessagesBox({ messages , currentUser}) {
    const endDiv = useRef(null)
    console.log(messages)
    useEffect(() => {
        endDiv.current.scrollIntoView()
    }, [messages])

    return (
        <div className="chats">
            {messages
                .sort((a, b) => a.data.timestamp - b.data.timestamp)
                .map((m) => (
                    <Message message={m.data} key={m.id} currentUser={currentUser} />
                ))}
            <div style={{ float: 'right', clear: 'both' }} ref={endDiv}></div>
        </div>
    )
}
