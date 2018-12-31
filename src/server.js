require('dotenv').config();

const { port, aws } = require('./config');
const logger = require('./utils/logger');
const subtitlesRepository = require('./data/subtitles/repository');
const subtitlesService = require('./domain/subtitles/service');
const socketServer = require('./websockets');

const subsRepo = subtitlesRepository.create(aws);
const subsSvc = subtitlesService.create(subsRepo);

const app = socketServer.create({ subtitlesService: subsSvc });

app.listen(port, () => {
  logger.info(`Server listening on port *:${port}`);
});
