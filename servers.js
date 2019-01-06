const express = require('express');
const socketio = require('socket.io');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5000;

// Express Security Middleware (sets various HTTP headers)
app.use(helmet());

// Server public files
app.use(express.static(__dirname + '/public'));

// Start Express Server
const expressServer = app.listen(PORT, () => console.log(`Express/Socket.io Server connected on at http://localhost:${PORT}`));

// Start Socket.io
const io = socketio(expressServer);

// Export Express and Socket.io Servers
module.exports = {
  app,
  io,
};
