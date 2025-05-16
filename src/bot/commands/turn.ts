import { IBot } from '../botClient';
import { IBotRoutedCommand } from '../../api/IRoutedCommand';
import { UserIdType } from '../../api/storage/IUser';
import { randomAttack } from './randomAttack';

const turn = async (input: string, bot: IBot) => {
    const payload = JSON.parse(input) as { currentPlayer: UserIdType };
    if (payload.currentPlayer === (await bot.sessionId)) {
        await randomAttack(bot);
    }
    return [];
};
export const createCommand = (): IBotRoutedCommand => ({
    route: 'turn',
    command: turn
});
