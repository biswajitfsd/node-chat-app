const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var {generateMessage} = require('./utils/message.js');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connceeted');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat box'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat box'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('data send to users');
  });

  socket.on('disconnect', () => {
    console.log('Connection got Disconnected');
  })

});

server.listen(port, () => {
  console.log(`Server is up and ruiing on port ${port}`);
});
