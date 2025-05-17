import { configDotenv } from 'dotenv';

configDotenv();

const isTrue = (value: string | undefined): boolean =>
    value?.toLowerCase() === 'true';

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
export const BOT_LOG = isTrue(process.env.BOT_LOGS) || false;
