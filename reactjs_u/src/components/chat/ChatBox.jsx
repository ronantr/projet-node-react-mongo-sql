import {
  CircularProgress,
  Divider,
  Fab,
  Grid,
  List,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/ApiRoutes";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import { Box } from "@mui/system";

const classes = {
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
};

export default function ChatBox({ currentChat, socket }) {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const { token, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (msg) => {
    await axios.post(
      sendMessageRoute,
      {
        from: user._id,
        to: currentChat._id,
        message: msg,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    socket.current.emit("send-msg", {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    const getMessages = async () => {
      const messages = await axios.post(
        getAllMessagesRoute,
        {
          from: user._id,
          to: currentChat._id,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      return messages.data;
    };

    getMessages().then((res) => {
      setIsLoading(false);

      setMessages(res);
    });
  }, [setMessages, currentChat, user, token]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    console.log(arrivalMessage);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size={100} sx={{ my: "auto" }} />
        </Box>
      ) : (
        <>
          <List style={classes.messageArea}>
            {messages.length > 0 &&
              messages.map((message, index) => (
                <MessageItem key={index} message={message} />
              ))}
          </List>

          <Divider />
          <ChatInput handleSendMessage={handleSendMessage} />
        </>
      )}
    </>
  );
}
