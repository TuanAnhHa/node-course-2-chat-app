var socket = io(); // create a connection

socket.on('connect', function(){
    console.log('Connected to server!');

    socket.emit('createEmail', {
        to: 'anh@example.com',
        text: 'I am from the Client'
    });
    /*
    socket.emit('createMessage', {
        from: 'linh@lichtenberg.com',
        text: 'I like you!'
    });
    */
});

socket.on('disconnect', function(){
    console.log('Disconnected from server!');
});

socket.on('newEmail', function(email) {
    console.log('New Email!', email);
});

socket.on('newMessage', function(message){
    console.log('New Message: ', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});
/*
socket.emit('createMessage', {
    from: 'Frank',
    text: 'HI'
}, function(data) {
    console.log('GOT IT!',data);
});
*/
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User Anonymous',
        text: jQuery('[name=message]').val()
    }, function(){ // acknowledgement

    });
});
