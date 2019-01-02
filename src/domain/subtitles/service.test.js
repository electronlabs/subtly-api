/* global it, describe, beforeEach, afterEach */
/* eslint-disable prefer-arrow-callback, func-names, no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const AudioSegment = require('./AudioSegment');
const subtitlesRepository = require('../../data/subtitles/repository');
const subtitlesService = require('./service');

const subtitlesRepo = subtitlesRepository.create();
const subtitlesSvc = subtitlesService.create(subtitlesRepo);

const segment = new AudioSegment({
  audio: '0x1234',
  text: 'Foo',
});

describe('subtitles service test', function() {
  describe('transcribe', function() {
    beforeEach(() => {
      sinon.stub(subtitlesRepo, 'transcribe');
    });

    afterEach(() => {
      subtitlesRepo.transcribe.restore();
    });

    it('should call the repository to fetch the transcribed segment', async function() {
      subtitlesRepo.transcribe.resolves(segment);
      const result = await subtitlesSvc.transcribe('0x1234');
      expect(result).to.eql(segment);
    });
  });
});
