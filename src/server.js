const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const logger = require("./utils/logger");
const initSocket = require("./sockets/chatSocket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// inject socket logic
initSocket(io);

const PORT = 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
