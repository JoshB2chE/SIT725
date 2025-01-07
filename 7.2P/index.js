const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('message', 'System: USER CONNECTED');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('message', 'System: USER DISCONNECTED');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', `System: ${msg}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});