require('./config/config');

const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));      //express.static (take the absolute path of the folder that you want to serve)

io.on('connection', (socket) => {
    console.log('Connected to server');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room))
            return callback('Name or Room name are required');
        
        params.room = params.room.toLowerCase();

        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // emit the new updated user list
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

         // socket.emit from Admin text Welcome to the chat app
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

         // socket.broadcast.emit from Admin text New User join
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', 'New User join'));
        callback();
    });

    
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text))
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
               
        callback();      
    });

    socket.on('createLocationMessage', (coords, callback) => {
        var user = users.getUser(socket.id);
        if (user)
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longtitude));

        callback('This is from the server');          
    });

    socket.on('disconnect', () => {
       // When a user left the room or disconnect, update the user list and inform in the chat
       var user = users.removeUser(socket.id);

       if (user) {
           io.to(user.room).emit('updateUserList', users.getUserList(user.room));
           io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
       }
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})
