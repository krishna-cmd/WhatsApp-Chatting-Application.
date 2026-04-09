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

## Setup

1. Install dependencies: `npm install`
2. Set up PostgreSQL database
3. Run the schema.sql to create tables
4. Update .env with your DATABASE_URL and SECRET
5. Start server: `npm start`

## Testing

### API Testing
Use Postman or curl to test auth endpoints:

Register: POST http://localhost:3000/auth/register
Body: {"name": "Test User", "email": "test@example.com", "password": "password"}

Login: POST http://localhost:3000/auth/login
Body: {"email": "test@example.com", "password": "password"}

### Chat Testing
1. Open src/test-client.html in two browser tabs
2. Register/login two users, get tokens
3. Enter token in each tab's prompt
4. Enter the other user's ID as receiver
5. Send messages and see real-time updates
