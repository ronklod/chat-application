const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

let users = [];

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', (data) => {
        console.log(`message data: ${JSON.stringify(data)}`);
        socketIO.emit('messageResponse', data);
    });

    //sends the message to all the users on the server
    socket.on('newUser', (data) => {
        //adding the new user to the users list
        users.push(data);
        //sending the updated list of users to all clients
        socketIO.emit('newUserResponse', users);
    })

    socket.on('userTyping', (data) => {
        //sending a notification that a user is typing
        //it sends to all users except the one who is typing
        socket.broadcast.emit('typingResposne', data);
    })

    socket.on('userStoppedTyping', (data) => {
        //sending a notification that a user is typing
        //it sends to all users except the one who is typing
        socket.broadcast.emit('typingStoppedResposne', '' );
    })

    socket.on('disconnect', () => {
        console.log(`🔥: ${socket.id} user just disconnected!`);
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
    });
});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});