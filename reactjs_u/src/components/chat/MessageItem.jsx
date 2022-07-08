import { Grid, ListItem, ListItemText } from '@mui/material'
import React from 'react'

export default function MessageItem({message,currentUser}) {
  return (
    <ListItem>
        <Grid container>
        <Grid item xs={12}>
            <ListItemText align={message.sender.id === currentUser.id ? "right" : "left"} primary={message.message}/>
        </Grid>
        <Grid item xs={12}>
            <ListItemText align={message.sender.id === currentUser.id ? "right" : "left"} secondary="09:30"/>
        </Grid>
    </Grid>
    </ListItem>
  )
}
