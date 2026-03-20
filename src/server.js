const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const logger = require("./utils/logger");

//creating http server manually as the socket need to interact with http
const server = http.createServer(app);

//connecting the socket server with node js server.
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  logger.info("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    logger.info(`User ${userId} joined the room`);
  });

  socket.on("send_message", ({senderId, receiverId, message}) => {
    logger.info(`Message from ${senderId} to ${receiverId}: ${message}`);

    io.to(receiverId).emit("receiver_message", {
      senderId,
      message,
    });
  });

  

  socket.on("disconnect", () => {
    logger.info("User Disconnect:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
 logger.info(`Server is running on the port ${PORT}`);
});
