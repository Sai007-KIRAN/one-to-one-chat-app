import React from 'react'
import doubleCheck from '../assets/done_all.svg'

export default function Message({ message , currentUser}) {

    function toDateTime(secs) {
        console.log(secs)
        var t = new Date(secs); // Epoch
        return t.toLocaleString();
    }

    return (
        <div className={`message ${message.name === currentUser ? 'sent' : 'received'}`}>
            {message.msg}
            <div className="metadata">
                <span className="date">{toDateTime(message.timestamp)}</span>
                {message.isMainUser && <img src={doubleCheck} alt="" className="icon-small" />}
            </div>
        </div>
    )
}
