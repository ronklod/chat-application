import React, { useEffect, useState } from 'react';
import ChatBar from './chat-bar';
import ChatBody from './chat-body';
import ChatFooter from './chat-footer';

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            setMessages([...messages, data])});
    }, [socket, messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} socket={socket} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;