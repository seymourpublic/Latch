const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
