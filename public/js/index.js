var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jenny@example.com',
    //     text: 'This is for you'
    // });

    socket.emit('createMessage', {
        to: 'sumheimun@example.com',
        text: 'This is a new message'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
})

// // Custom Listen Event
// socket.on('newEmail', function(email) {
//     console.log('New Email', email);
// });

socket.on('newMessage', function(message) {
    console.log('New Message', message);
});