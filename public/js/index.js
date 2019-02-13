var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     to: 'sumheimun@example.com',
    //     text: 'This is a new message'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message) {
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     to: 'Frank',
//     text: 'Hello, im Frank'
// }, function(data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data) {
        console.log('Got it', data);
    });
});