require('./config/config');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');

var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));      //express.static (take the absolute path of the folder that you want to serve)


app.listen(port, () => {
    console.log(`Started on port ${port}`);
})
