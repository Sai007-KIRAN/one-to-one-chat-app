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
    const [data, setData] = useState(contactsMessages)
    const [contactSelected, setContactSelected] = useState({})
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
        setCurrentMessages((currContact && currContact.messages) || [])
        filterContacts(data, search)
    }, [contactSelected, data, search])

    function pushMessage() {
        const index = data.findIndex((d) => d.contact.id === contactSelected.id)
        const newData = Object.assign([], data, {
            [index]: {
                contact: contactSelected,
                messages: [...data[index].messages, new Message(true, message, new Date())],
            },
        })
        setData(newData)
        setMessage('')
    }

    function filterContacts(data, search) {
        const result = data.filter(({contact}) => {
            return !search || contact.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilterContacts(result)
    }

    const createUserIfNotExists = (userName) => {
        setUser(userName);
        console.log(allUsers);
        allUsers.forEach(user => {
            if (user.data.name === userName) {
                db.collection("users").add({
                    userName: userName
                })
            }
        })
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
                            {filteredContacts.map(({contact, messages}) => (
                                <ContactBox
                                    contact={contact}
                                    key={contact.id}
                                    setContactSelected={setContactSelected}
                                    messages={messages}
                                />
                            ))}
                        </div>
                    </aside>
                    {contactSelected.id ? (
                        <main>
                            <header>
                                <Avatar user={contactSelected} showName/>
                            </header>
                            <MessagesBox messages={currentMessages}/>
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
