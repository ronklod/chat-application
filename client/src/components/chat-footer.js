import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }

        //this will allow us to clean up the "{user} is typing..." since we have onblur event, so once the user sends a messgae we will make sure the input textbox has no focus
        document.getElementById("chatInputText").blur();

        setMessage('');
    };

    const onKeyDown = (e) => {
        socket.emit('userTyping', {
            text: `${localStorage.getItem('userName')} is typing`,
        });
    };

    const userStoppedTyping = () => {
        socket.emit('userStoppedTyping', {
            text: '',
        });
    }

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    id="chatInputText"
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={userStoppedTyping}

                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;