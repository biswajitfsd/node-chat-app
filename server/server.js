const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connceeted');

  socket.on('disconnect', () => {
    console.log('Connection got Disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up and ruiing on port ${port}`);
});
