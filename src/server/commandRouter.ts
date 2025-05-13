const commands: IRoutedCommand[] = [];
export const routeMessage = async (incomingMessage: string) => {
import { IRoutedCommand } from '../api/IRoutedCommand';
import { IIncomingCommand } from '../api/IIncomingCommand';
    const request = JSON.parse(incomingMessage) as IIncomingCommand;
    const command = commands.find((cmd) => cmd.route === request.type)?.command;
    if (!command) {
        throw new Error(`${request.type} command not found`);
    }
    await command(request.data);
};
