var socket = io();

function scrollToBottom() {
  // Selceters
  // console.log('Inside scrollToBottom function');
  var messages = jQuery('#messageDiv');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight =  messages.prop('clientHeight');
  // console.log('clientHeight', clientHeight);
  var scrollTop =  messages.prop('scrollTop');
  // console.log('scrollTop', scrollTop);
  var scrollHeight =  messages.prop('scrollHeight');
  // console.log('scrollHeight', scrollHeight);
  var newMessageHeight =  newMessage.innerHeight();
  // console.log('newMessageHeight',newMessageHeight);
  var lastMessageHeight = newMessage.prev().innerHeight();
  // console.log('lastMessageHeight',lastMessageHeight);
  // console.log('Total viewport height:', clientHeight + scrollTop + newMessageHeight + lastMessageHeight);
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('connceted to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  jQuery('#messageDiv').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });
  jQuery('#messageDiv').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'Biswajit',
    text: messageTextbox.val()
  }, function(data) {
    // console.log(`Data send from local. Response from server is ${data}`);
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
