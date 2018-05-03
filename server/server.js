const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connceeted');

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat box'));
  //
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat box'));

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Room name and name is required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.leave(params.room);
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat box'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('data send to users');
  });

  socket.on('createLocationMessage', (coords) => {
    console.log('createMessage', coords);
    io.emit('newLocationMessage', generateLocationMessage('Biswajit', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Connection got Disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });


});

server.listen(port, () => {
  console.log(`Server is up and ruiing on port ${port}`);
});
