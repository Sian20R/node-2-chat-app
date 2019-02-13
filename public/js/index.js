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
    console.log('New Message', message);
});

socket.on('welcomeMessage', function(message) {
    console.log('Welcome Message', message);
});