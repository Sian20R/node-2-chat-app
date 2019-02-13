require('./config/config');

const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));      //express.static (take the absolute path of the folder that you want to serve)

io.on('connection', (socket) => {
    console.log('Connected to server');

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    // socket.broadcast.emit from Admin text New User join
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User join'));


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();          
    });

    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longtitude));
        callback('This is from the server');          
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from server');
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})
