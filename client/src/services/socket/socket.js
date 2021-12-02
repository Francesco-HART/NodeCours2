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
    console.log(socket);

    const event = () => {
      socket.on("hello", (arg) => {
        console.log(arg, "iciiiiiiiiiiiiiiiiiiiiii"); // world
      });
    };

    console.log(socket);

    const emit = () => {
      console.log("iciiiiiiiiiiiiiii");
      socket.emit("hello", "world");
    };

    return {
      event,
      emit,
    };
  } catch (err) {
    throw err;
  }
};

export default webSocket;
