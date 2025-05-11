import React, { useState, useEffect } from 'react';

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const msgData = {
        room,
        author: username,
        message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('send_message', msgData);
      setChat((prev) => [...prev, msgData]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.author === username ? 'own' : 'other'}`}
          >
            <div className="meta">{msg.author} • {msg.time}</div>
            <div className="text">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
