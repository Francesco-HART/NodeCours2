import * as io from "socket.io-client";
const { Manager } = require("socket.io-client");

const webSocket = () => {
  try {
    const manager = new Manager("ws://localhost:5000", {
      reconnectionDelayMax: 10000,
      reconnection: false,
      transports: ["websocket", "polling"],
    });

    const socket = manager.socket("/", {
      transports: ["websocket", "polling"],
    });

    //socket join

    const event = (roomId) => {
      socket.on(roomId, (arg) => {
        console.log(arg, "iciiiiiiiiiiiiiiiiiiiiii"); // world
      });
    };

    return {
      event,
      socket,
    };
  } catch (err) {
    throw err;
  }
};

export default webSocket;
