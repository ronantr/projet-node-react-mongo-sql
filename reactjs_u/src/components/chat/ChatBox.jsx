import { Divider, Fab, Grid, List, TextField } from '@mui/material'
import React, { useState } from 'react'
import MessageItem from './MessageItem'
import ChatInput from './ChatInput';

const classes = {
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
};

export default function ChatBox({currentChat}) {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (msg) => {
        setMessages([...messages, msg]);
    }

  return (
    <>
    {/* <List style={classes.messageArea}>
                    {currentChat.messages.map(message => (
                            <MessageItem key={message.id} message={message} />
                    ))}
                </List>

                <Divider />
                
            <ChatInput handleSendMessage={handleSendMessage} /> */}
        </>

  )
}
