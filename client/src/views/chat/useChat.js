import { useEffect, useState } from "react";
import { RoomService } from "../../services/api/rooms";
import { useSnackbar } from "notistack";

const useChat = () => {
  const [rooms, setRooms] = useState([{ name: "roomTest" }]);
  const [room, setRoom] = useState({
    name: "roomTest",
    messages: [{ userId: "1", message: "Bonjour Tom", createdAt: Date.now }],
  });
  const [isNameUpdating, setIsNameUpdating] = useState(false);

  // const sendMsg = (roomId, message) => {

  // }

  const updateName = () => {
    setIsNameUpdating(true);
  };

  const valideName = () => {
    setIsNameUpdating(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  // La room doit contenir les mx dernier message
  useEffect(() => {
    const currentURL = window.location.pathname;

    async function getRoomById() {
      const getRoom = await RoomService.getOneById(currentURL);
      setRoom(getRoom);
    }
    // Function call when start component
    async function getRooms() {
      try {
        const allRooms = await RoomService.getAll();
        setRooms(allRooms);
      } catch (err) {
        enqueueSnackbar(err, { variant: "Immpossible de récuperer les rooms" });
      }
    }
    getRooms();
    getRoomById();
  }, []);

  return {
    rooms,
    room,
    authUser: { id: "1" },
    isNameUpdating,
    updateName,
    valideName,
    // authUser: { login: authContext.authLogin, id: authContext.id },
  };
};
export default useChat;
