import React from 'react'
import doubleCheck from '../assets/done_all.svg'
import Avatar from './Avatar'

export default function ContactBox({userName, messages, currentUser, setContactSelected}) {

    const getMaxMsg = (messages) => {
        let lastMsg = {data: {msg: "No messages yet"}};
        let max = -1;
        if (messages === undefined)
            return lastMsg
        for (let i = 0; i < messages.length; i++) {
            let msg = messages[i]
            if (max < msg.data.timestamp) {
                max = max < msg.data.timestamp
                lastMsg = msg
            }
        }
        return lastMsg;
    }

    return (
        <div className="contact-box" onClick={() => setContactSelected(userName)}>
            <Avatar user={{name: "advadv"}}/>
            <div className="right-section">
                <div className="contact-box-header">
                    <h3 className="avatar-title">{userName}</h3>
                    {/*<span className="time-mark">{lastMsg.date.toLocaleDateString()}</span>*/}
                </div>
            </div>
        </div>
    )
}
