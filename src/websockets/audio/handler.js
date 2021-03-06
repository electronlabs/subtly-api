function create(socket, service) {
  return async function handleAudio(chunk) {
    const result = await service.transcribe(chunk.audio);
    socket.emit('subtitles', { audio: result.audio, text: result.text });
  };
}

module.exports.create = create;
