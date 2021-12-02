import { Manager } from "socket.io-client";

const webSocket = () => {
  try {
    const manager = new Manager("ws://localhost:8000", {
      reconnectionDelayMax: 10000,
      query: {
        "my-key": "my-value",
      },
    });

    const createRoom = (token) => {
      const socket = manager.socket("/room", {
        auth: {
          token: token,
        },
      });

      return socket;
    };

    // socket.on("connect", () => {
    //     console.log(socket.id); // "G5p5..."
    //   });

    // const getSocketEvent = (socket) => {
    //     socket.on("message", (...args) => {

    //       });
    //}

    const leaveRoom = (socket) => {
      socket.disconnect();
    };

    return {
      createRoom,
      leaveRoom,
    };
  } catch (err) {
    throw err;
  }
};

export default webSocket;
