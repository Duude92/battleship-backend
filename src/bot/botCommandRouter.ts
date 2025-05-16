import { getCommands } from '../utility/commandLoader';
import { IRoutedCommand } from '../api/IRoutedCommand';

getCommands('./bot/commands/').then((loadedCommands) =>
    commands.push(...loadedCommands.filter((cmd) => !!cmd))
);
const commands: IRoutedCommand[] = [];

export const routeMessage = async (
    incomingMessage: string,
    socket: WebSocket
) => {};
