import { Divider, Fab, Grid, List, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MessageItem from './MessageItem'
import ChatInput from './ChatInput';
import { getAllMessagesRoute, sendMessageRoute } from '../../utils/ApiRoutes';

const classes = {
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
};

export default function ChatBox({currentChat,currentUser}) {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async(msg) => {
        const data = await fetch(sendMessageRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from:currentUser._id,
                to:currentChat._id,
                message:msg
            })
        })   
        
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }

    useEffect( () => {

     const fetchAllMessages = async () => {
         let messages = null
        await fetch(getAllMessagesRoute)
            .then(res => res.json())
            .then(data => {
             messages=data
        })
        return messages
    }
    fetchAllMessages().then(data => {
        setMessages(data)
    })

})

  return (
    <>
    <List style={classes.messageArea}>
                    {messages.map(message => (
                            <MessageItem key={message.id} message={message} />
                    ))}
                </List>

                <Divider />
                
            <ChatInput handleSendMessage={handleSendMessage} />
        </>

  )
}
