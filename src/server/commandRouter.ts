import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
// import { getCommands } from '../utility/commandLoader';
import { connectionProvider } from './server';
import { logger, MESSAGE_TYPE } from '../logger/logger';
import { moduleCommands as Commands } from './loadCommands';

// const commands: IRoutedCommand[] = [];
// (async () => {
//     commands.push(
//         ...(await getCommands('./server/commands/')).filter(
//             (cmd) => !!cmd && 'command' in cmd
//         )
//     );
// })();
const commands = Commands.map((command) => {
    const command2 = command as unknown as {
        createCommand: () => IRoutedCommand;
    };
    console.log(command);
    return command2.createCommand();
});
export const routeMessage = async (
    incomingMessage: string,
    socket: WebSocket
) => {
    const request = JSON.parse(incomingMessage) as ICommand;
    const routedCommand = commands.find((cmd) => cmd.route === request.type);
    console.log(commands);
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
