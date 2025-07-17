import { IRoutedCommand } from '../api/IRoutedCommand';
import { ICommand } from '../api/ICommand';
import { connectionProvider } from './server';
import { logger, MESSAGE_TYPE } from '../logger/logger';
import { Export, ImportMany } from '@duude92/lazyinject';

@Export('CommandRouter')
export class CommandRouter {
    constructor(
        @ImportMany('IRoutedCommand')
        private readonly commands: IRoutedCommand[]
    ) {}

    public routeMessage = async (
        incomingMessage: string,
        socket: WebSocket
    ) => {
        const request = JSON.parse(incomingMessage) as ICommand;
        const routedCommand = this.commands.find(
            (cmd) => cmd.route === request.type
        );
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
}
