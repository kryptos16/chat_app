const socket = io();  // Connect to the server

let username = '';
let room = '';

// Function to join a room
function joinRoom() {
  username = document.getElementById('username').value;
  room = document.getElementById('room').value;

  if (username && room) {
    socket.emit('joinRoom', { username, room });  // Emit join room event

    // Show the chat box
    document.getElementById('chatBox').style.display = 'block';
    document.querySelector('.room-selection').style.display = 'none';
  } else {
    alert('Please enter both username and room');
  }
}

// Function to send a message
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  if (message) {
    socket.emit('sendMessage', {
      username,
      text: message,
      room
    });
    document.getElementById('messageInput').value = '';  // Clear input field
  }
}

// Listen for incoming messages
socket.on('receiveMessage', (msg) => {
  const chatMessages = document.getElementById('chatMessages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${msg.username}: ${msg.text}`;
  chatMessages.appendChild(messageElement);

  // Scroll to the bottom of the chat messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
