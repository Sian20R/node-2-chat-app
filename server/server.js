require('./config/config');

const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT;

app.use(express.static(publicPath));      //express.static (take the absolute path of the folder that you want to serve)

io.on('connection', (socket) => {
    console.log('Connected to server');

    // // Emitting Custom Event
    // socket.emit('newEmail', {
    //     from: 'alex@exmaple.com',
    //     text: 'Hey, Whats going on?',
    //     createdAt: 23445
    // });

    // // Listening Custom Event 
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });


    socket.emit('newMessage', {
        from: 'seawkerboon@gmail.com',
        text: 'This is a new message',
        createdAt: Date.now()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from server');
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})
