import { getCommands } from '../utility/commandLoader';
import { IBotRoutedCommand } from '../api/IRoutedCommand';
import { IBot } from './botClient';
import { ICommand } from '../api/ICommand';
import { logger, MESSAGE_TYPE } from '../logger/logger';
import { BOT_LOG } from '../appconfig';

const commands: IBotRoutedCommand[] = [];

(async () => {
    commands.push(
        ...(await getCommands('bot/commands/'))
            .filter((cmd) => !!cmd && 'command' in cmd)
            .map((cmd) => cmd as unknown as IBotRoutedCommand)
    );
})();

export const routeMessage = async (incomingMessage: string, socket: IBot) => {
    const request = JSON.parse(incomingMessage) as ICommand;
    const routedCommand = commands.find((cmd) => cmd.route === request.type);
    if (!routedCommand) {
        if (BOT_LOG)
            logger.log(MESSAGE_TYPE.ERROR, `${request.type} command not found`);
        return;
    }
    const command = routedCommand?.command;
    if (BOT_LOG) logger.log(MESSAGE_TYPE.REQUEST, request);

    await command(request.data, socket);
};
