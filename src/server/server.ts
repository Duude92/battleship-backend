import * as ws from 'ws';
import { randomUUID } from 'node:crypto';
import { ICommand } from '../api/ICommand';
import { UserIdType } from '../api/storage/IUser';
import { logger, MESSAGE_TYPE } from '../logger/logger';
import { type CommandRouter } from './commandRouter';
import { container } from './container';

const __connections: { readonly socket: WebSocket; userId: UserIdType }[] = [];
export const connectionProvider = {
    get connections() {
        return __connections;
    },
    multicast(usersIds: (number | string)[], command: ICommand) {
        const commandString = JSON.stringify(command);
        logger.log(
            MESSAGE_TYPE.RESPONSE,
            'Multicast users: [' + usersIds + '] : ' + commandString
        );
        usersIds.forEach((user) => {
            connectionProvider.connections
                .find((conn) => conn.userId == user)
                ?.socket.send(commandString);
        });
    },
    unicast(userId: number | string, command: ICommand) {
        const commandString = JSON.stringify(command);
        logger.log(
            MESSAGE_TYPE.RESPONSE,
            'Unicast to: [' + userId + '] : ' + commandString
        );
        this.connections
            .find((conn) => conn.userId == userId)
            ?.socket.send(commandString);
    },
    broadcast(command: ICommand) {
        const commandString = JSON.stringify(command);
        logger.log(MESSAGE_TYPE.RESPONSE, 'Broadcast:' + commandString);
        this.connections.forEach((connection) =>
            connection.socket.send(commandString)
        );
    }
};
let router: CommandRouter;
container
    .get<CommandRouter>('CommandRouter')
    .then((commandRouter) => (router = commandRouter!));
export const startServer = (port: number) => {
    const srv = new ws.Server({ port: port });
    srv.on('connection', async (webs: WebSocket) => {
        const connection = {
            socket: webs,
            userId: randomUUID()
        };
        logger.log(
            MESSAGE_TYPE.SYSTEM,
            'New session started: ' + connection.userId
        );
        connectionProvider.connections.push(connection);
        webs.onmessage = async (msg) => {
            try {
                await router.routeMessage(msg.data.toString(), webs);
            } catch (error) {
                if (!(error instanceof Error)) return;
                logger.log(MESSAGE_TYPE.ERROR, '' + error.stack);
            }
        };
        webs.onclose = () => {
            const index = connectionProvider.connections.findIndex(
                (connection) => connection.socket === webs
            );
            logger.log(
                MESSAGE_TYPE.SYSTEM,
                'Player [' +
                    connectionProvider.connections[index].userId +
                    '] has been disconnected'
            );
            connectionProvider.connections.splice(index, 1);
        };
    });
    logger.log(MESSAGE_TYPE.SYSTEM, 'Server has been started on port: ' + port);
    return srv;
};
