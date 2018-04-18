var socket = io();

socket.on('connect', function() {
  console.log('connceted to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messageDiv').append(li);
});

// socket.emit('createMessage', {
//   from: 'Biswajit',
//   text: 'I am testing.'
// }, function(data) {
//   console.log(`Data send from local. Response from server is ${data}`);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Biswajit',
    text: jQuery('[name=message]').val()
  }, function(data) {
    console.log(`Data send from local. Response from server is ${data}`);
  });
});
