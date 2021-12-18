import React, {useState, useEffect} from 'react'

import {mainUser, contactsMessages, Message} from './generateFakeData'
import Avatar from './components/Avatar'
import ContactBox from './components/ContactBox'
import MessagesBox from './components/MessagesBox'
import ChatInputBox from './components/ChatInputBox'
import Search from './components/Search'
import Welcome from './components/Welcome'
import db from "./firebaseConfig";

import './App.css'
import Login from "./components/Login";

function App() {
    const [currentUser, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [messages, setAllMessages] = useState([]);
    const [data, setData] = useState(contactsMessages)
    const [contactSelected, setContactSelected] = useState("")
    const [currentMessages, setCurrentMessages] = useState([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [filteredContacts, setFilterContacts] = useState([])

    useEffect(() => {
        const currContact = data.find((d) => d.contact.id === contactSelected.id)
        db.collection('users').onSnapshot(snapShot => (
            setAllUsers(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        db.collection('message').onSnapshot(snapShot => (
            setAllMessages(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        setCurrentMessages((currContact && currContact.messages) || [])
        filterContacts(data, search)
    }, [contactSelected, data, search])

    function pushMessage() {

        db.collection("message").add({
            name: currentUser,
            msg: message,
            to:contactSelected,
            timestamp: new Date().getTime()
        })
        //
        // setData(newData)
        setMessage('')
    }

    function filterContacts(data, search) {
        const result = data.filter(({contact}) => {
            return !search || contact.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilterContacts(result)
    }

    const getCurrentUserdetails = () => {
        console.log(allUsers);
        return allUsers.filter(user => user.data.userName === currentUser)[0];
    }

    const createUserIfNotExists = (userName) => {
        setUser(userName);
        console.log(allUsers);
        const filters = allUsers.filter(user => user.data.userName === userName)
        if(filters.length == 0) {
            db.collection("users").add({
                userName: userName
            })
        }

    }

    const updateLastViewedTime = (userName) => {
        const currUserDet = getCurrentUserdetails().data;
        // if(currUserDet.)
        db.collection("users").add({

        })
    }

    const filterUserMessages = (messages, userName) => {
        console.log(" All Message - " + userName)
        console.log(messages)
        console.log(" Messages end ....  ")
        return messages.filter(user => user.data.name === userName )
    }

    const showOtherUsersContacts = (user) => {
        if(user.data.userName !==currentUser)
            return <ContactBox
                userName={user.data.userName}
                messages={filterToUserMessages(messages, currentUser)}
                key={user.id}
                currentUser={getCurrentUserdetails()}
                setContactSelected = {setContactSelected}
            />
    }

    const filterToUserMessages = (messages, userName) => {
        console.log(" All Message - " + userName)
        console.log(messages)
        console.log(" Messages end ....  ")
        return [...messages.filter(user => user.data.to === currentUser &&  user.data.name === contactSelected ),...messages.filter(user => user.data.name === currentUser &&  user.data.to === contactSelected )]
    }

    return (
        <>
            {!currentUser ? (
                <Login createUserIfNotExists={createUserIfNotExists} allUsers={allUsers}/>
            ) : (
                <div className="app">
                    <aside>
                        <header>
                            <Avatar user={{name: currentUser}} showName/>
                        </header>
                        <Search search={search} setSearch={setSearch}/>
                        <div className="contact-boxes">
                            {allUsers.map(user => (
                                showOtherUsersContacts(user)
                            ))}
                        </div>
                    </aside>
                    {contactSelected !== "" ? (
                        <main>
                            <header>
                                <Avatar user={{name:contactSelected}} showName/>
                            </header>
                            <MessagesBox messages={filterToUserMessages(messages, currentUser)} currentUser={currentUser} />
                            <ChatInputBox message={message} setMessage={setMessage} pushMessage={pushMessage}/>
                        </main>
                    ) : (
                        <Welcome/>
                    )}
                </div>
            )}
        </>
    )
}

export default App
