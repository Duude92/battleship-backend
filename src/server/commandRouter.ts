import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { connectionProvider } from './server';
import { logger, MESSAGE_TYPE } from '../logger/logger';
import { container } from './container';

const commands: IRoutedCommand[] = [];
(async () => {
    const newcommands =
        await container.getMany<IRoutedCommand>('IRoutedCommand').then(result => commands.concat(result!))
    commands.push(...newcommands!);
})();
export const routeMessage = async (
    incomingMessage: string,
    socket: WebSocket
) => {
    const request = JSON.parse(incomingMessage) as ICommand;
    const routedCommand = commands.find((cmd) => cmd.route === request.type);
    if (!routedCommand) {
        throw new Error(`${request.type} command not found`);
    }
    const command = routedCommand?.command;
    logger.log(MESSAGE_TYPE.REQUEST, request);
    const userId = connectionProvider.connections.find(
        (conn) => conn.socket === socket
    )!.userId;

    const result = await command(request.data, userId);
    result.forEach((res) => connectionProvider.unicast(userId, res));
};
