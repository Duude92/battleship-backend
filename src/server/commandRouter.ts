import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { getCommands } from '../utility/commandLoader';
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
    const payload = JSON.parse(request.data);
    const result = await command(payload);
    result.forEach((res) => socket.send(JSON.stringify(res)));
};
