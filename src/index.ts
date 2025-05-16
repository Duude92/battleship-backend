import { configDotenv } from 'dotenv';
import { startServer } from './server/server';
import { logger } from './logger/logger';

configDotenv();
logger.setup(process.stdout);

const serverPort = Number(process.env.SERVER_PORT) || 3000;

const server = startServer(serverPort);

const closeServer = () => server.close();
process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
process.on('SIGUSR1', closeServer);
process.on('SIGUSR2', closeServer);
process.on('uncaughtException', closeServer);
