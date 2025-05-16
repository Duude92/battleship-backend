import { getCommands } from '../utility/commandLoader';
import { IBotRoutedCommand } from '../api/IRoutedCommand';
import { IBot } from './botClient';
import { ICommand } from '../api/ICommand';
import { logger, MESSAGE_TYPE } from '../logger/logger';

getCommands('./bot/commands/').then((loadedCommands) =>
    commands.push(
        ...loadedCommands
            .filter((cmd) => !!cmd)
            .map((cmd) => cmd as unknown as IBotRoutedCommand)
    )
);
const commands: IBotRoutedCommand[] = [];

export const routeMessage = async (incomingMessage: string, socket: IBot) => {
    const request = JSON.parse(incomingMessage) as ICommand;
    const routedCommand = commands.find((cmd) => cmd.route === request.type);
    if (!routedCommand) {
        throw new Error(`${request.type} command not found`);
    }
    const command = routedCommand?.command;
    logger.log(MESSAGE_TYPE.REQUEST, request);

    // const result =
    await command(request.data, socket);
    // result.forEach((res) => connectionProvider.unicast(userId, res));
};
