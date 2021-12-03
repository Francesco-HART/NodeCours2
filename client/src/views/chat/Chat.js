import React, { useEffect } from "react";
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
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();

  let { id } = useParams();
  const classes = useStyles();
  const blocChat = useChat();

  // La room doit contenir les mx dernier message
  useEffect(() => {
    blocChat.setName(blocChat.authUser.name);
    blocChat.getRooms();
    if (id) blocChat.getRoomById(id);
    else blocChat.getDefaultRoom();
  }, [id]);

  if (blocChat.isMessageLoading) return <div></div>;

  function handlePushRoom(id) {
    navigate("/room/" + id, { replace: true });
  }

  blocChat.socket.socket.on(blocChat.room._id, (arg) => {
    blocChat.addMessage(arg);
  });

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
            <ListItem key={blocChat.authUser.name}>
              {/*===============================================uSER lOGGED=========================================================*/}
              <ListItemIcon>
                <Avatar
                  alt={blocChat.authLogin}
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <TextField
                fullWidth
                onChange={blocChat.onchangeName}
                margin="normal"
                fullWidth
                id="name"
                label="Nom"
                name="name"
                value={blocChat.name ? blocChat.name : "  "}
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
              <Button color="secondary" onClick={blocChat.logOut}>
                Se Deconnecter
              </Button>

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
            {!blocChat.isRoomsCharging &&
              blocChat.rooms.map((elem, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar
                        alt={elem.name}
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary={elem.name}>{elem.name}</ListItemText>
                    <ListItemText align="right"></ListItemText>
                    {blocChat.room._id.toString() !== elem._id.toString() && (
                      <Button onClick={() => handlePushRoom(elem._id)}>
                        Rejoindre
                      </Button>
                    )}
                  </ListItem>
                );
              })}

            {/*========================================================================================================*/}
          </List>
        </Grid>
        <Grid item xs={9}>
          {/*===========================================room message zone zoneeeeeeeee====================================================================*/}

          <List className={classes.messageArea}>
            {blocChat.room.messages.map((msg, index) => {
              return (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={isMyMessage(blocChat, msg)}
                        primary={msg.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={isMyMessage(blocChat, msg)}
                        // secondary={
                        //   date.format(Date.now, pattern) // => Mar 16 2020 6:24:56 PM
                        // }
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}

            {/*===============================================================================================================*/}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="c'est ici qu'il faut écrire..."
                fullWidth
                disabled={blocChat.authUser.name ? false : true}
                value={blocChat.message}
                onChange={blocChat.setMessage}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                disabled={blocChat.message.length <= 0}
                onClick={() => blocChat.sendMsg(blocChat.room._id)}
              >
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
function isMyMessage(blocChat, msg) {
  return blocChat.authUser.id.toString() === msg._userId.toString()
    ? "right"
    : "left";
}
