const http = require('http');
const SocketIO = require('socket.io');
const logger = require('../utils/logger');
const audioHandler = require('./audio/handler');

const server = http.createServer();
const io = SocketIO(server);

function create({ subtitlesService }) {
  io.on('connection', socket => {
    logger.info('socket connected');
    const handleAudio = audioHandler.create(socket, subtitlesService);
    socket.on('audio chunk', chunk => {
      handleAudio(chunk);
    });
  });
  return server;
}

module.exports.create = create;
