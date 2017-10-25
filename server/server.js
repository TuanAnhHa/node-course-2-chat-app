const path     = require('path');    // include a built-in module
const http     = require('http');
const express  = require('express'); // include express
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); // join the elements to create a relative path
const port       = process.env.PORT || 3000;

var app    = express(); // app is an express function
var server = http.createServer(app);
var io     = socketIO(server); // web socket server

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newEmail', {
        from: 'anh@gmail.com',
        text: 'I love NodeJS',
        createdAt: 12345
    });
    /*
    socket.emit('newMessage', { // to single connection
        from: 'nam@gmail.com',
        text: 'I am in Darmstadt',
        createdAt: 67890
    });
    */
    socket.on('createEmail', (newEmail) => {
        console.log('createdEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('Message is created: ', message);
        io.emit('newMessage', { // to every single connection
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('USER Disconnected from server!');
    });
});

app.use(express.static(publicPath)); // use the app.use method()

server.listen(port, () => {
    console.log(`Server is up on port ${port}...`);
});

// console.log(publicPath);
