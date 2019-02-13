require('./config/config');

const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {generatedMessage} = require('./utils/message');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));      //express.static (take the absolute path of the folder that you want to serve)

io.on('connection', (socket) => {
    console.log('Connected to server');

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generatedMessage('Admin', 'Welcome to the Chat App'));

    // socket.broadcast.emit from Admin text New User join
    socket.broadcast.emit('newMessage', generatedMessage('Admin', 'New User join'));



    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generatedMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {           // Sends to everyone but except this socket
        //     from: message.from,
        //     text: message.text,
        //     createdAt: Date.now()
        // });               
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from server');
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})
