import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { getCommands } from '../utility/commandLoader';
import { connectionProvider } from './server';
import { logger, MESSAGE_TYPE } from '../logger/logger';

const commands: IRoutedCommand[] = [];
(async () => {
    commands.push(
        ...(await getCommands('./server/commands/')).filter(
            (cmd) => !!cmd && 'createCommand' in cmd
        )
    );
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
