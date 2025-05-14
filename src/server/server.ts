import * as ws from 'ws';
import { routeMessage } from './commandRouter';
import { randomUUID } from 'node:crypto';
import { ICommand } from '../api/ICommand';

const __connections: { socket: WebSocket; userId: string }[] = [];
export const connectionProvider = {
    get connections() {
        return __connections;
    },
    multicast(usersIds: string[], command: ICommand) {
        const commandString = JSON.stringify(command);
        usersIds.forEach((user) => {
            connectionProvider.connections
                .find((conn) => conn.userId == user)
                ?.socket.send(commandString);
        });
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
    });
    //TODO: remove connection on disconnect
};
