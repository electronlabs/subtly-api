function create(subtitlesRepository) {
  async function transcribe(data) {
    return subtitlesRepository.transcribe(data);
  }

  return {
    transcribe,
  };
}

module.exports.create = create;
