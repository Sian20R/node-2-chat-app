var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
})

// Client Listener
socket.on('newMessage', function(message) {
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('newLocationMessage: ', message);
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank"> My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

// Client Emit
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data) {
        console.log('Got it', data);
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!navigator.geolocation)
        return alert('Geolocation not supported by your browser');

    navigator.geolocation.getCurrentPosition(function(position) {       // Get coordinates for the user
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        }, function(data) {
            console.log('Got it', data);
        });
    }, function() {
        alert('Unable to fetch the location');
    })     
});