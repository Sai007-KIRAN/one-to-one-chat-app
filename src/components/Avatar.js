import React from 'react'

export default function Avatar({ user, showName }) {
    console.log(user);
    return (
        <div className="avatar-component">
            {/*<img className="avatar" src={} alt="" />*/}
            {showName && <h3 className="avatar-title">{user.name}</h3>}
        </div>
    )
}
