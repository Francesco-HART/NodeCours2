// Websocket server
const io = socketIo(server, { transports: ["websocket", "polling"] });
io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));
io.set("origins", "*:*");
app.io = io;

const connectToSocketRoom = (id) => {
  io.on("connection", async (socket) => {
    socket.on("/room/" + id, (data) => socket.join("/room/" + id));
  });
};
