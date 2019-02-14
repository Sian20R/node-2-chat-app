var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
})

// Client Listener
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
   
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

// Client Emit
var messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(data) {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!navigator.geolocation)
        return alert('Geolocation not supported by your browser');

    locationButton.attr('disabled', 'disabled').text('Sending location....');

    navigator.geolocation.getCurrentPosition(function(position) {       // Get coordinates for the user
        locationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        }, function(data) {
            console.log('Got it', data);
        });
    }, function() {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch the location').text('Send location');
    })     
});