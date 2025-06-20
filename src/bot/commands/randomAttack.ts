import { IBot } from '../botClient';
import { createCommandObject } from '../../api/ICommand';

const MAX_MS_DELAY = 2000;

export const randomAttack = async (bot: IBot) => {
    const response = createCommandObject('randomAttack', {
        gameId: bot.gameId,
        indexPlayer: await bot.sessionId
    });
    const randomTime = Math.random();
    setTimeout(() => bot.response(response), randomTime * MAX_MS_DELAY);
};
