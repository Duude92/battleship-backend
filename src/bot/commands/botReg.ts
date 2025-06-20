import { IBotRoutedCommand } from '../../api/IRoutedCommand';
import { createCommandObject } from '../../api/ICommand';
import { IResponseRegister } from '../../server/commands/api/IPlayer';
import { IBot } from '../botClient';

const register = async (input: string, bot: IBot) => {
    const payload = JSON.parse(input) as IResponseRegister;
    bot.resolveSessionId(payload.index);
    return [];
};

export const createCommand = (): IBotRoutedCommand => ({
    route: 'reg',
    command: register
});
export const sendBotRegister = (bot: IBot): void => {
    const request = createCommandObject('reg', {
        name: 'bot',
        anonymous: true
    });
    bot.response(request);
};
