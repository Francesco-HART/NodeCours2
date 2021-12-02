import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@mui/icons-material/Send";
import useChat from "./useChat";
import { NavLink } from "react-router-dom";
import date from "date-and-time";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
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
});

const Chat = () => {
  const pattern = date.compile("MMM D YYYY h:m:s A");

  const classes = useStyles();
  const blocChat = useChat();
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            {blocChat.room.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem key={blocChat.authLogin}>
              {/*===============================================uSER lOGGED=========================================================*/}
              <ListItemIcon>
                <Avatar
                  alt={blocChat.authLogin}
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Nom"
                defaultValue="laaa"
                name="name"
                autoComplete="name"
                autoFocus
                disabled={blocChat.isNameUpdating ? false : true}
              />
              <ListItem>
                <Button
                  disabled={blocChat.isNameUpdating}
                  color="primary"
                  onClick={blocChat.updateName}
                >
                  Modifier
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disabled={!blocChat.isNameUpdating}
                  color="secondary"
                  onClick={blocChat.valideName}
                >
                  Valider
                </Button>
              </ListItem>

              <ListItemText primary={blocChat.authLogin}></ListItemText>
            </ListItem>
            {/*===============================================uSER lOGGED=========================================================*/}
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Rechercher"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />

          {/*===================================================Room section=====================================================*/}
          <List>
            {blocChat.rooms.map((room, index) => {
              return (
                <NavLink key={index} to="/">
                  <ListItem>
                    <ListItemIcon>
                      <Avatar
                        alt={room.name}
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary={room.name}>{room.name}</ListItemText>
                    <ListItemText
                      secondary="Ouverte"
                      align="right"
                    ></ListItemText>
                  </ListItem>
                </NavLink>
              );
            })}
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Room1">Room1</ListItemText>
              <ListItemText secondary="Ouverte" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Room2">Room2</ListItemText>
              <ListItemText secondary="Ouverte" align="right"></ListItemText>
            </ListItem>

            {/*========================================================================================================*/}
          </List>
        </Grid>
        <Grid item xs={9}>
          {/*===========================================room message zone zoneeeeeeeee====================================================================*/}

          <List className={classes.messageArea}>
            {blocChat.room.messages.map((msg) => {
              return (
                <ListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          blocChat.authUser.id.toString() ===
                          msg.userId.toString()
                            ? "right"
                            : "left"
                        }
                        primary={msg.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          blocChat.authUser.id.toString() ===
                          msg.userId.toString()
                            ? "right"
                            : "left"
                        }
                        // secondary={
                        //   date.format(Date.now, pattern) // => Mar 16 2020 6:24:56 PM
                        // }
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            {/*===============================================================================================================*/}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="c'est ici qu'il faut écrire..."
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
