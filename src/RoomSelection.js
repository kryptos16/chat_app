import React, { useState } from 'react';

function RoomSelection({ setUsername, setRoom }) {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleJoin = () => {
    if (name && roomName) {
      setUsername(name);
      setRoom(roomName);
    }
  };

  return (
    <div className="room-select">
      <h2>Join Chat Room</h2>
      <input placeholder="Username" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default RoomSelection;
