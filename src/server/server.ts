import * as ws from 'ws';
import { routeMessage } from './commandRouter';
import { randomUUID } from 'node:crypto';
import { ICommand } from '../api/ICommand';
import { UserIdType } from '../api/storage/IUser';

const __connections: { readonly socket: WebSocket; userId: UserIdType }[] = [];
export const connectionProvider = {
    get connections() {
        return __connections;
    },
    multicast(usersIds: (number | string)[], command: ICommand) {
        const commandString = JSON.stringify(command);
        usersIds.forEach((user) => {
            connectionProvider.connections
                .find((conn) => conn.userId == user)
                ?.socket.send(commandString);
        });
    },
    unicast(userId: number | string, command: ICommand) {
        this.connections
            .find((conn) => conn.userId == userId)
            ?.socket.send(JSON.stringify(command));
    },
    broadcast(command: ICommand) {
        const commandString = JSON.stringify(command);
        this.connections.forEach((connection) =>
            connection.socket.send(commandString)
        );
    }
};
export const startServer = (port: number) => {
    const srv = new ws.Server({ port: port });
    srv.on('connection', async (webs) => {
        connectionProvider.connections.push({
            socket: webs as unknown as WebSocket, //?? FIXME
            userId: randomUUID()
        });
        webs.onmessage = (msg) => {
            routeMessage(msg.data.toString(), webs as unknown as WebSocket);
        };
        webs.onclose = () => {
            const index = connectionProvider.connections.findIndex(
                // FIXME
                (connection) =>
                    (connection.socket as unknown as ws.WebSocket) === webs
            );
            connectionProvider.connections.splice(index, 1);
        };
    });
};
