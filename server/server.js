const path     = require('path');    // include a built-in module
const http     = require('http');
const express  = require('express'); // include express
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); // join the elements to create a relative path
const port       = process.env.PORT || 3000;

var app    = express(); // app is an express function
var server = http.createServer(app);
var io     = socketIO(server); // web socket server

const { generateMessage } = require('./utils/message');

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

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
        /*
        io.emit('newMessage', { // to every single connection
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        */

        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

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
