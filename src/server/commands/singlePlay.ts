import { IRoutedCommand } from '../../api/IRoutedCommand';
import { createBot } from '../../bot/botClient';
import { UserIdType } from '../../api/storage/IUser';
import { randomUUID } from 'node:crypto';
import { createSingleplayGame } from '../../bot/createSingleplayGame';

const bots = [];

const singlePlay = async (payload: string, userId: UserIdType) => {
    const roomId = randomUUID();
    const bot = createBot();
    await createSingleplayGame(roomId, userId, await bot.sessionId);
    bots.push(bot);
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: 'single_play',
    command: singlePlay
});
