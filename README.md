# Basic Realtime Chat Server

Goal: Two users can send messages to each other instantly.
Architecture for Phase 1:
Browser Client
      │
      │ WebSocket
      ▼
Node.js + Socket.io Server
      │
      ▼
Broadcast message

Later we will add:
# Redis pub/sub
# PostgreSQL storage
# typing indicators
# group chat
# user presence

# Project Structure
Create folders:
realtime-chat-backend
│
├── src
│   ├── sockets
│   │   └── chat.socket.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── README.md
