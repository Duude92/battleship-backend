import { configDotenv } from 'dotenv';
import { startServer } from './server/server';
import { logger } from './logger/logger';

configDotenv();
logger.setup(process.stdout);

const serverPort = Number(process.env.SERVER_PORT) || 3000;

startServer(serverPort);
