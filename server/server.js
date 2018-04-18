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

  // socket.emit('newEmail',{
  //   'from': 'biswajit@biswajit.web',
  //   'text': 'I am working towards mearn stack',
  //   'createdAt': new Date()
  // });
  socket.emit('newChat',{
    'from': 'Biswajit',
    'text': 'I am working towards mearn stack. From server to client',
    'createdAt': new Date()
  });
  //
  // socket.on('createEmail', (newEmail) => {
  //   newEmail.createdAt = new Date();
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createChat', (newChat) => {
    newChat.createdAt = new Date();
    console.log('createChat', newChat);
  });

  socket.on('disconnect', () => {
    console.log('Connection got Disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up and ruiing on port ${port}`);
});
