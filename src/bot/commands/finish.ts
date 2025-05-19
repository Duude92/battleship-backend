import { IBot } from '../botClient';
import { IBotRoutedCommand } from '../../api/IRoutedCommand';

const finish = async (input: string, bot: IBot) => {
    bot.client.close();
    return [];
};
export const createCommand = (): IBotRoutedCommand => ({
    route: 'finish',
    command: finish
});
