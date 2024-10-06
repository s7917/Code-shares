const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
// sockit server
const server = http.createServer(app);
const io = new Server(server);

const Port = process.env.Port || 5000;

  const userSocketMap = {};

  const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username : userSocketMap[socketId],
        }
    });
  }
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-room", ({roomId, username})=>{
       userSocketMap[socket.id]= username;
         socket.join(roomId);
         const clients = getAllConnectedClients(roomId);
          // notify to all user that new user has joined
         clients.forEach(({socketId})=>{
              io.to(socketId).emit("joined-room" ,
                {
                    clients,
                    username,
                    socketId: socket.id,
                });
         });
    });
  
  });

server.listen(Port , ()=>{
    console.log(`Server is running on port ${Port}`);
})