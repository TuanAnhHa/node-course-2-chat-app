var socket = io(); // create a connection
/*
function scrollToBottom() {
    var messages     = jQuery('#messages');
    var newMessage   = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop    = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
*/
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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template      = jQuery('#message-template').html();
    var html          = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    /*
    console.log('New Message: ', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
    */
    // scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template      = jQuery('#location-message-template').html();
    var html          = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    /*
    var li = jQuery('<li></li>');
    var a  = jQuery('<a target="_blank">My current location</a>');


    li.text(`${message.from}: ${formattedTime} `);
    a.attr('href', message.url);

    li.append(a);

    jQuery('#messages').append(li);
    */
    // scrollToBottom();
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

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User Anonymous',
        text: messageTextbox.val()
    }, function(){ // acknowledgement
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(e){
    if(!navigator.geolocation){
        return alert('Geolocation not supported!');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location!');
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    });
});
