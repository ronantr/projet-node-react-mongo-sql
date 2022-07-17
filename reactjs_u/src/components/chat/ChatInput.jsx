import { Fab, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = () => {
  const [msg, setMsg] = useState("");

  const handleSendChat = (e) => {
    e.preventDefault();
    if(msg.length > 0) {
        setMsg("");
    }
    console.log(msg);
    }

const handleMsgChange = (e) => {
    setMsg(e.target.value);
}

    return (
        <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField onChange={handleMsgChange}
                                     value={msg} id="msg" label="Type Something"  fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon onClick={handleSendChat}/></Fab>
                    </Grid>
                </Grid>
    );
}

export default ChatInput;
