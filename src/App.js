import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat'; // Correct file name and import

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', room);
      setJoined(true);
    }
  };

  return (
    <div className="app">
      {!joined ? (
        <div className="join-room">
          <h2>Join a Chat Room</h2>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
