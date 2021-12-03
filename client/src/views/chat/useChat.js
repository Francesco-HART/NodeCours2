import { useContext, useEffect, useState } from "react";
import { RoomService } from "../../services/api/rooms";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../services/store/authContext";
import { UserService } from "../../services/api/user";
import { typesUser } from "../../services/store/actionTypes";
import webSocket from "../../services/socket/socket";
import { AuthService } from "../../services/api/auth";

/**
 * View of use Chat
 * @returns {{setName: (value: unknown) => void, isRoomsCharging: boolean, rooms: *[], setIsMessageLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, isNameUpdating: boolean, message: string, setMessage: setMsg, authUser: *, getDefaultRoom: ((function(): Promise<void>)|*), onchangeName: onchangeName, updateName: updateName, isMessageLoading: boolean, room: undefined, addMessage: addMessage, name: unknown, valideName: valideName, getRooms: ((function(): Promise<void>)|*), socket: {socket: *, event: function(*=): void}, sendMsg: sendMsg, logOut: ((function(): Promise<void>)|*), getRoomById: ((function(*=): Promise<void>)|*)}}
 */
const useChat = () => {
  const socket = webSocket();
  const authContext = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState();
  const [isMessageLoading, setIsMessageLoading] = useState(true);
  const [isRoomsCharging, setIsRoomsCharging] = useState(true);

  const [isNameUpdating, setIsNameUpdating] = useState(false);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const setMsg = (e) => {
    setMessage(e.target.value);
  };

  const sendMsg = (roomId) => {
    RoomService.addMessage(roomId, message)
      .then(async (message) => {
        setMessage("");
      })
      .catch((err) => {
        enqueueSnackbar("Impossible d'envoyer le message", {
          variant: "error",
        });
      });
  };

  const logOut = async () => {
    await AuthService.logout();
    await authContext?.setAuthUser({
      type: typesUser.LOGOUT,
    });
  };

  async function getRooms() {
    try {
      const allRooms = await RoomService.getAll();
      setRooms(allRooms);
      setIsRoomsCharging(false);
    } catch (err) {
      enqueueSnackbar(err, { variant: "Immpossible de récuperer les rooms" });
      setIsRoomsCharging(false);
    }
  }

  const addMessage = (chat) => {
    let myRoom = { ...room };
    let messageIsInRoomIn = false;
    myRoom.messages.forEach((message) => {
      if (message !== undefined) {
        if (message._id.toString() === chat._id.toString())
          messageIsInRoomIn = true;
      }
    });
    if (messageIsInRoomIn) {
      return;
    } else {
      myRoom.messages.push(chat);
      setRoom(myRoom);
    }
  };

  async function getDefaultRoom() {
    const getRoom = await RoomService.getDefault();
    setRoom(getRoom);
    setIsMessageLoading(false);
  }

  async function getRoomById(id) {
    const getRoom = await RoomService.getOneById(id);
    setRoom(getRoom);
    setIsMessageLoading(false);
  }

  const updateName = () => {
    setIsNameUpdating(true);
  };

  const valideName = () => {
    // Parce que le Auth provider plante on ne peux pas mettre à jour le authUser
    UserService.updateInfos(authContext.authUser.id, { name })
      .then(async (user) => {
        const authUser = await AuthService.getAuthUser();
        await authContext?.setAuthUser({
          type: typesUser.UPDATE,
          authUser: authUser,
        });
        if (
          authContext &&
          authContext.authUser &&
          authContext.authUser.isLoggedIn
        ) {
          enqueueSnackbar("Nom mis à jour !", { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Impossible de changer votre nom", {
          variant: "error",
        });
      });
    setIsNameUpdating(false);
  };

  return {
    rooms,
    room,
    socket,
    setName,
    logOut,
    message,
    setMessage: setMsg,
    authUser: authContext.authUser,
    isNameUpdating,
    updateName,
    getRoomById,
    valideName,
    setIsMessageLoading,
    name: name,
    getDefaultRoom,
    addMessage,
    getRooms,
    isMessageLoading,
    isRoomsCharging,
    sendMsg,
    onchangeName: (e) => {
      setName(e.target.value);
    },
    // authUser: { login: authContext.authLogin, id: authContext.id },
  };
};
export default useChat;
