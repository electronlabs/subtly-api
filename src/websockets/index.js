const http = require('http');
const SocketIO = require('socket.io');
const audioHandler = require('./audio/handler');

const server = http.createServer();
const io = SocketIO(server);
const namespace = io.of('/transcribe');

function create({ subtitlesService }) {
  namespace.on('connection', socket => {
    const handleAudio = audioHandler.create(subtitlesService);
    socket.on('audio chunk', handleAudio);
  });
  return server;
}

module.exports.create = create;
