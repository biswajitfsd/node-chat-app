var socket = io();

socket.on('connect', function() {
  console.log('connceted to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  // console.log('New Message', message);
  var formatedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formatedTime} : ${message.text}`);
  jQuery('#messageDiv').append(li);
});

// socket.emit('createMessage', {
//   from: 'Biswajit',
//   text: 'I am testing.'
// }, function(data) {
//   console.log(`Data send from local. Response from server is ${data}`);
// });

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a')
  // console.log('New LocationMessage', message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formatedTime} : `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messageDiv').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'Biswajit',
    text: messageTextbox.val()
  }, function(data) {
    console.log(`Data send from local. Response from server is ${data}`);
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send_location');
locationButton.on('click', function(e) {
  e.preventDefault();
  if(!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location ......');
  navigator.geolocation.getCurrentPosition(function (postion) {
    console.log(postion);
    socket.emit('createLocationMessage', {
      latitude: postion.coords.latitude,
      longitude: postion.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send Location');
  }, function () {
    alert('Unable to featch location');
    locationButton.removeAttr('disabled').text('Send Location');
  });
});
