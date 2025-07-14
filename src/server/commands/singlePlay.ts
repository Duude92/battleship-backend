import { createBot } from '../../bot/botClient';
import { UserIdType } from '../../api/storage/IUser';
import { randomUUID } from 'node:crypto';
import { createSingleplayGame } from '../../bot/createSingleplayGame';
import { $ExportObject } from '@duude92/lazyinject';

const bots = [];

const singlePlay = async (payload: string, userId: UserIdType) => {
    const roomId = randomUUID();
    const bot = createBot();
    await createSingleplayGame(roomId, userId, await bot.sessionId);
    bots.push(bot);
    return [];
};

$ExportObject(
    {
        route: 'single_play',
        command: singlePlay
    },
    'IRoutedCommand'
);
