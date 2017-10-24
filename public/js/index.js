var socket = io(); // create a connection

socket.on('connect', function(){
    console.log('Connected to server!');

    socket.emit('createEmail', {
        to: 'anh@example.com',
        text: 'I am from the Client'
    });

    socket.emit('createMessage', {
        from: 'linh@lichtenberg.com',
        text: 'I like you!'
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server!');
});

socket.on('newEmail', function(email) {
    console.log('New Email!', email);
});

socket.on('newMessage', function(message){
    console.log('New Message: ', message);
});
