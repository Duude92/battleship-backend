import { createCommand } from './commands/playerReg';
import { IRoutedCommand } from '../api/IRoutedCommand';
import { IIncomingCommand } from '../api/IIncomingCommand';

const commands: IRoutedCommand[] = [createCommand()];
export const routeMessage = async (
    incomingMessage: string,
    socket: WebSocket
) => {
    const request = JSON.parse(incomingMessage) as IIncomingCommand;
    const command = commands.find((cmd) => cmd.route === request.type)?.command;
    if (!command) {
        throw new Error(`${request.type} command not found`);
    }
    const payload = JSON.parse(request.data);
    await command(payload, socket);
};
