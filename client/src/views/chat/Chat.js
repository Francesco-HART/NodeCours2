import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
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

/**
 * View of chat page
 * @type {(props?: any) => ClassNameMap<"headBG"|"chatSection"|"messageArea"|"borderRight500"|"table">}
 */
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
        height: "85vh",
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

    let {id} = useParams();
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
        navigate("/room/" + id, {replace: true});
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
            {/*grid container principale*/}
            <Grid container component={Paper} className={classes.chatSection}>
                {/*grid de gauche*/}
                <Grid item xs={3} className={classes.borderRight500}>
                    {/* nom et tout les boutons*/}

                    <List>
                        <ListItem key={blocChat.authUser.name}  style={{display:"flex", justifyContent: "space-between"}}>
                            <Avatar
                                alt={blocChat.authLogin}
                                src="https://material-ui.com/static/images/avatar/1.jpg"
                            />
                            <TextField
                                onChange={blocChat.onchangeName}
                                margin="normal"
                                id="name"
                                label="Nom"
                                name="name"
                                value={blocChat.name ? blocChat.name : "  "}
                                autoComplete="name"
                                autoFocus
                                disabled={blocChat.isNameUpdating ? false : true}
                                size="small"
                            />
                            <Button
                                disabled={!blocChat.isNameUpdating}
                                color="secondary"
                                onClick={blocChat.valideName}
                            >
                                Valider
                            </Button>
                        </ListItem>
                    </List>
                    <List alignItems="flex-end">
                        <ListItem  style={{display:"flex", justifyContent: "space-between"}}>
                            <Button
                                disabled={blocChat.isNameUpdating}
                                color="primary"
                                onClick={blocChat.updateName}
                            >
                                Modifier
                            </Button>
                            <Button color="secondary" onClick={blocChat.logOut}>
                                Se Deconnecter
                            </Button>
                        </ListItem>
                    </List>

                    <Divider/>
                    <Grid item xs={12} style={{padding: "10px"}}>
                        <TextField
                            id="outlined-basic-email"
                            label="Rechercher"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider/>

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
                {/* grid de droite */}
                <Grid item xs={9}>
                    {/*===========================================room message zone zoneeeeeeeee====================================================================*/}

                    <List className={classes.messageArea}>
                        {blocChat.room.messages.map((msg, index) => {
                            return (
                                <ListItem key={index}>
                                    <Grid container justifyContent={isMyMessage(blocChat, msg)}>
                                        <Grid item xs={12}>
                                            <ListItemText
                                                align={isMyMessageSetName(blocChat, msg)}
                                                secondary={msg._userId.name}
                                            ></ListItemText>
                                        </Grid>
                                        <Grid item style={{
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 10,
                                            margin: 10,
                                        }}>
                                            <ListItemText
                                                align={isMyMessage(blocChat, msg)}
                                                primary={msg.message}
                                            ></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            );
                        })}

                        {/*===============================================================================================================*/}
                    </List>
                    <Divider/>
                    <Grid container style={{padding: "20px"}}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Entrez votre message ..."
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
                                <SendIcon/>
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
    if (msg._userId && msg._userId._id){
        return blocChat.authUser.id.toString() === msg._userId._id.toString()
            ? "flex-end"
            : "flex-start";
    }
    else{
        return blocChat.authUser.id.toString() === msg._userId.toString()
            ? "flex-end"
            : "flex-start";
    }

}

function isMyMessageSetName(blocChat, msg) {
    if (msg._userId && msg._userId._id){
        return blocChat.authUser.id.toString() === msg._userId._id.toString()
            ? "right"
            : "left";
    }
    else{
        return blocChat.authUser.id.toString() === msg._userId.toString()
            ? "right"
            : "left";
    }

}
