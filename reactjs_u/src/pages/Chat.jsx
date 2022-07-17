import React, { useEffect } from 'react';

// import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Contacts from '../components/chat/Contacts';
import { getAllUsersRoute } from '../utils/ApiRoutes';
import Welcome from '../components/chat/Welcome';
import ChatBox from '../components/chat/ChatBox';
const classes = {

    container: {
        height:"100vh",
        width:"100vw",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        gap:"1rem",
        alignItems:"center",
        backgroundColor:"#131324"},
    paper:{
        height: "85vh",
        width: "85vw",
        backgroundColor: "#00000076", 
        display: "grid",
    },
  table: {
    minWidth: 650,
    width: "100%",
    margin:"0 auto",
    justifyContent:"center",
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
const [currentUser, setCurrentUser] = React.useState(null);
const [contacts, setContacts] = React.useState([]);
const [currentChat, setCurrentChat] = React.useState(null);


useEffect(() => {

    // let user=null;
    // const getCurrentFromLocalStorage = async () => {
    //    user= await JSON.parse(localStorage.getItem('app-user'))
    // }
    let user = null;
    user= JSON.parse(localStorage.getItem('app-user'))
    setCurrentUser(
        user
     );
}, []);

useEffect(() => {
    async function fetchDataJson() {
        let contacts = null
        await fetch(`${getAllUsersRoute}/${currentUser._id}`)
            .then(res => res.json())
            .then(data => {
             contacts=data
        })
        return contacts
      }
      if( currentUser !== null){
        fetchDataJson().then(data => {
            setContacts(data)
        })
    }


}, [currentUser]);

// const [chat, setChat] = React.useState(dataChats[0]);

const handleChatChange = (chat) => {
    console.log(chat.messages);
    // setChat(chat);
    setCurrentChat(chat);
}

  return (
    <div style={classes.container}>
                <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" sx={{textAlign:"center",color:"#fff"}} className="header-message">Chat</Typography>
            </Grid>
        </Grid>
      <Paper style={classes.paper}>
        <Grid container component={Paper} sx={{justifyContent:"center",margin:"0 auto",width:"100%"}}>
            <Grid item xs={3} style={classes.borderRight500}>
                
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <Contacts contacts={contacts} onChatChange={handleChatChange} />
            </Grid>
            <Grid item xs={9}>
                {currentChat === null ? (
                   <Welcome />
                ) : (
                    <ChatBox chat={currentChat}/>
                )}
            </Grid>
        </Grid>
      </Paper>
      </div>
  );
}
export default Chat


