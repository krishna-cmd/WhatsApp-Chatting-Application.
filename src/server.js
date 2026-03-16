const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

//creating http server manually as the socket need to interact with http
const server = http.createServer(app);

//connecting the socket server with node js server.
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message Received:", data);

    io.emit("recevie_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnect:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
