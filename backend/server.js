const dotenv = require('dotenv');
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
dotenv.config;
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        // origin: "http://localhost:3000",
        origin: "https://chat-app-six-teal.vercel.app/",
        methods: ["GET","POST"], 
    },
});


io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`);
    });

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    });
});



const PORT = process.env.PORT||5000;
server.listen(PORT,console.log(`server started on PORT ${PORT}`))
