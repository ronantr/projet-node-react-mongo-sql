import React, { useEffect } from 'react';

// import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import ChatList from '../components/chat/ChatList';
import MessageItem from '../components/chat/MessageItem';
const classes = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
};

const dataChats= [
    {
        id: "chat-1",
        participants: [
            {
                id: "user-1",
        name: 'John Doe',   
        avatar: 'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff',
            },
            {
                id: "user-2",
        name: 'Jane Doe',
        avatar: 'https://avatars.dicebear.com/api/male/jane.svg',
            }
        ],
        messages: [
            {
                id: "mes-1",
                message: 'Hello',
                sender: {
                    id: "user-1",
                    name: 'John Doe',
                }
            },
            {
                id: "mes-2",
                message: 'Hi',
                sender: {
                    id: "user-2",
                    name: 'Jane Doe',
                }   
            },
            {
                id: "mes-3",
                message: 'TEst 1',
                sender: {
                    id: "user-1",
                    name: 'John Doe',
                }
            },
            {
                id: "mes-4",
                message: 'test 2',
                sender: {
                    id: "user-2",
                    name: 'Jane Doe',
                }   
            }
        ]
    },
    {
        id: "chat-2",
        participants: [
            {
                id: "user-1",
        name: 'John Doe',   
        avatar: 'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff',
            },
            {
                id: "user-3",
        name: 'Alex',
        avatar:'https://avatars.dicebear.com/api/male/alex.svg?',
            }
        ],
        messages: [
            {
                id: "mes-5",
                message: 'Bonjour',
                sender: {
                   id: "user-1",
                    name: 'John Doe',
                }
            },
            {
                id: "mes-6",
                message: 'Bonjour',
                sender: {
                    id:"user-3",
                    name: 'Alex',
                }   
            },
            {
                id: "mes-7",
                message: 'Comment tu vas ?',
                sender: {
                   id: "user-1",
                    name: 'John Doe',
                }
            },
            {
                id: "mes-8",
                message: 'Je suis bien et toi ?',
                sender: {
                    id:"user-3",
                    name: 'Alex',
                }   
            }
        ]
    },
]

const Chat = () => {
//   const classes = useStyles();
const [currentUser, setCurrentUser] = React.useState( {
    id: "user-1",
name: 'John Doe',   
avatar: 'https://i.pravatar.cc/100',
});

const [chat, setChat] = React.useState(dataChats[0]);

const handleChangeChat = (chat) => {
    console.log(chat.messages);
    setChat(chat);
}

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} style={classes.chatSection}>
            <Grid item xs={3} style={classes.borderRight500}>
                
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    {dataChats.map(chat => 
                        (chat.participants.map(participant => {
                            if(participant.id !== currentUser.id){
                                return (
                                    <ChatList key={participant.id} handleChangeChat={handleChangeChat} chat={chat} participant={participant} />
                                )
                            }
                            return null
                        })
                        )
                    )}
                </List>
            </Grid>
            <Grid item xs={9}>
                <List style={classes.messageArea}>
                    {chat.messages.map(message => (
                            <MessageItem key={message.id} message={message} currentUser={currentUser} />
                    ))}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}
export default Chat


