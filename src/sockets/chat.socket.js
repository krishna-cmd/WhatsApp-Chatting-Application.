// sockets/chatSocket.js
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const getSocketUserId = (user = {}) => user.id ?? user.userID ?? null;
const getSocketUserName = (user = {}) => user.username ?? user.name ?? null;

const initSocket = (io) => {
  //  Middleware for authentication (ADVANCED)
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("No token");

      const decoded = jwt.verify(token, process.env.SECRET);
      const normalizedUserId = getSocketUserId(decoded);
      if (!normalizedUserId) throw new Error("Invalid token payload");

      socket.user = {
        ...decoded,
        id: String(normalizedUserId),
      };

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const currentUserId = getSocketUserId(socket.user);
    if (!currentUserId) {
      logger.error(`Socket ${socket.id} connected without a valid user id`);
      socket.disconnect(true);
      return;
    }

    logger.info(`User connected: ${socket.id}, UserId: ${currentUserId}`);

    // Join a stable personal room based on the authenticated user id.
    socket.join(String(currentUserId));
    const currentUserName = getSocketUserName(socket.user);
    if (currentUserName) {
      socket.join(String(currentUserName).trim());
    }

    socket.on("send_message", ({ receiverId, message }) => {
      const senderId = getSocketUserId(socket.user);
      const targetRoom = String(receiverId ?? "").trim();
      const text = String(message ?? "").trim();

      if (!senderId || !targetRoom || !text) {
        logger.warn(
          `Invalid message payload from ${socket.id}: sender=${senderId}, receiver=${receiverId}`,
        );
        return;
      }

      logger.info(`Message from ${senderId} to ${targetRoom}: ${text}`);

      const payload = {
        senderId: String(senderId),
        receiverId: targetRoom,
        message: text,
      };

      // Send message to receiver
      io.to(targetRoom).emit("receive_message", payload);

      // Echo message back to sender
      socket.emit("receive_message", payload);
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocket;
