// sockets/chatSocket.js
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const initSocket = (io) => {
  //  Middleware for authentication (ADVANCED)
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("No token");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`User connected: ${socket.id}, UserId: ${socket.user.id}`);

    // Join personal room
    socket.join(socket.user.id);

    socket.on("send_message", ({ receiverId, message }) => {
      const senderId = socket.user.id;

      logger.info(`Message from ${senderId} to ${receiverId}: ${message}`);

      io.to(receiverId).emit("receive_message", {
        senderId,
        message,
      });
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocket;
