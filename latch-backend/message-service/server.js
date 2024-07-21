const app = require('./app');
const http = require('http');
const { initSocket } = require('./socket');

const port = process.env.PORT || 3006;
const server = http.createServer(app);

const io = initSocket(server);

server.listen(port, () => {
  console.log(`Message service running on port ${port}`);
});

module.exports = { app, io };
