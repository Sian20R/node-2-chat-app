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

    socket.on('disconnect', () => {
        console.log('Disconnect from server');
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})
