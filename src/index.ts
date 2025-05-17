import { startServer } from './server/server';
import { logger, MESSAGE_TYPE } from './logger/logger';
import { SERVER_PORT } from './appconfig';

logger.setup(process.stdout);

const server = startServer(SERVER_PORT);
const closeServer = () => server.close();
process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
process.on('SIGUSR1', closeServer);
process.on('SIGUSR2', closeServer);
process.on('uncaughtException', (error) => {
    logger.log(MESSAGE_TYPE.ERROR, 'Uncaught exception: ' + error);
    closeServer();
});
