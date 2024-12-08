import { Server, Socket } from "socket.io";

export default function socketMain(io: Server) {
  io.on("connection", (socket) => {
    console.log(`user connecting ${socket.id}`);

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log(`${socket.id} Joined room${roomName}`);
      socket.emit("Message", `Wollcom room${roomName}`);
    });

    socket.on("SendMassegeToRoom", (data) => {
      const { roomName, message, userName } = data;
      io.to(roomName).emit("receiveMessage", {
        userName,
        message,
        timestemp: new Date().toISOString,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnect ${socket.id}`);
    });
  });
}
