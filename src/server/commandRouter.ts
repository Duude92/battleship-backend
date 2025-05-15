import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { getCommands } from '../utility/commandLoader';
import { connectionProvider } from './server';
import { logInputMessage } from '../logger/logger';
//TODO: Use of import-time dynamic import instead of resolving promise
getCommands('./server/commands/').then((loadedCommands) =>
    commands.push(...loadedCommands.filter((cmd) => !!cmd))
);
const commands: IRoutedCommand[] = [];
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
    logInputMessage(routedCommand);
    const userId = connectionProvider.connections.find(
        (conn) => conn.socket === socket
    )!.userId;

    const result = await command(request.data, userId);
    result.forEach((res) => connectionProvider.unicast(userId, res));
};
