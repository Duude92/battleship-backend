import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { getCommands } from '../utility/commandLoader';
import { connectionProvider } from './server';
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
    const command = commands.find((cmd) => cmd.route === request.type)?.command;
    if (!command) {
        throw new Error(`${request.type} command not found`);
    }
    const userId = connectionProvider.connections.find(
        (conn) => conn.socket === socket
    )!.userId;

    const result = await command(request.data, userId);
    result.forEach((res) => connectionProvider.unicast(userId, res));
};
