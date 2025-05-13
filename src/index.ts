import { configDotenv } from 'dotenv';
import { startServer } from './server/server';

configDotenv();

const serverPort = Number(process.env.SERVER_PORT) || 3000;

startServer(serverPort);
