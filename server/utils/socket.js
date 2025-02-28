const socketIO = require("socket.io");

let io;

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*", // Adjust for security in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected via WebSocket");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const getSocketInstance = () => io;

module.exports = { initSocket, getSocketInstance };
