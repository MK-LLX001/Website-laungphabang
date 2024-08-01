const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"]
  }
}); // Initialize Socket.IO with the HTTP server

const PORT = 4000;

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" // Your frontend URL
}));

// Serve static images
app.use('/images', express.static('Images-uploads'));

// Router
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('notification', (data) => {
    console.log('Notification received:', data); // Log notification data
    io.emit('notification', data);
  });

  socket.on('like', (data) => {
    console.log('Like received:', data); // Log like data
    io.emit('notification', { ...data, notification_type: 'like' });
  });

  socket.on('comment', (data) => {
    console.log('Comment received:', data); // Log comment data
    io.emit('notification', { ...data, notification_type: 'comment' });
  });


 // Listen for registration events
 socket.on('registerManager', (data) => {
  console.log('register received:', data);
  io.emit('notification_register_manager', { ...data, notification_type: 'registerManager' });
});

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
