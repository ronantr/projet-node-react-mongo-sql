import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";

// import { makeStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Contacts from "../components/chat/Contacts";
import { getAllUsersRoute, host } from "../utils/ApiRoutes";
import Welcome from "../components/chat/Welcome";
import ChatBox from "../components/chat/ChatBox";
import { AuthContext } from "../context/Auth";
import { io } from "socket.io-client";
import { disconnectSocket } from "../utils/socketioService";
const classes = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324",
  },
  paper: {
    height: "85vh",
    width: "85vw",
    backgroundColor: "#00000076",
    display: "grid",
  },
  table: {
    minWidth: 650,
    width: "100%",
    margin: "0 auto",
    justifyContent: "center",
  },

  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
};

const Chat = () => {
  const [contacts, setContacts] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const { token, user } = useContext(AuthContext);

  const socket = useRef();

  useEffect(() => {
    async function fetchDataJson() {
      let contacts = null;
      return await axios
        .get(`${getAllUsersRoute}/${user._id}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          contacts = res.data;
          return contacts;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (user !== null) {
      fetchDataJson().then((data) => {
        setContacts(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      socket.current = io(host);
      console.log(socket.current);
      socket.current.emit("add-user", user._id);
    }
    return () => {
      disconnectSocket();
    };
  }, [user]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div style={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "#fff" }}
            className="header-message"
          >
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Paper style={classes.paper}>
        <Grid
          container
          component={Paper}
          sx={{ justifyContent: "center", margin: "0 auto", width: "100%" }}
        >
          <Grid item xs={3} style={classes.borderRight500}>
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            {contacts.length > 0 && (
              <Contacts contacts={contacts} onChatChange={handleChatChange} />
            )}
          </Grid>
          <Grid item xs={9}>
            {!currentChat ? (
              <Welcome />
            ) : (
              <ChatBox currentChat={currentChat} socket={socket} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default Chat;
