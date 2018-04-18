var socket = io();

socket.on('connect', function() {
  console.log('connceted to server');

  // socket.emit('createEmail', {
  //   to: 'biswajit@co.in',
  //   text: 'From client side to server'
  // });
  socket.emit('createChat', {
    to: 'biswajit@co.in',
    text: 'From client side to server'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// });

socket.on('newChat', function(chat) {
  console.log('New Message', chat);
});
