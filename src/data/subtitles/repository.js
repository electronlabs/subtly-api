const aws4 = require('aws4');
const http2 = require('http2');
const logger = require('../../utils/logger');

const getSignedRequestOptions = (awsConfig, body) => {
  const host = 'https://transcribestreaming.eu-west-1.amazonaws.com';
  const path = '/stream-transcription';
  const method = 'POST';
  const contentType = 'application/json';
  const contentLength = body.length;

  const headers = {
    'Content-Type': contentType,
    'Content-Length': contentLength,
    [http2.constants.HTTP2_HEADER_SCHEME]: 'https',
    [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
    [http2.constants.HTTP2_HEADER_PATH]: path,
    'x-amzn-transcribe-language-code': 'en-US',
    'x-amzn-transcribe-sample-rate': '16000',
    'x-amzn-transcribe-media-encoding': 'pcm',
  };

  const options = { host, path, method, headers };

  const signedOptions = aws4.sign(options, {
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  return signedOptions;
};

function create(awsConfig) {
  async function transcribe(data) {
    const body = Buffer.from([
      JSON.stringify({
        AudioStream: {
          AudioEvent: {
            AudioChunk: data,
          },
        },
      }),
    ]);

    const signedRequestOptions = getSignedRequestOptions(awsConfig, body);
    const clientSession = http2.connect(`${signedRequestOptions.host}`);
    const { headers } = signedRequestOptions;
    delete headers.Host;

    const req = clientSession.request(headers);
    req.setEncoding('utf8');
    req.write(body);
    req.end();

    req.on('response', resHeaders => {
      logger.info('response');
      logger.info(resHeaders[':status']);
    });

    req.on('headers', () => {
      logger.info('headers');
    });

    req.on('push', () => logger.info('push'));
  }

  return {
    transcribe,
  };
}

module.exports.create = create;
