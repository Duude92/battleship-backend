import * as ws from 'ws';
import { routeMessage } from './commandRouter';

export const startServer = (port: number) => {
    const srv = new ws.Server({ port: port });
    srv.on('connection', async (socket) => {
        socket.onmessage = (msg) => {
            routeMessage(msg.data.toString(), socket as unknown as WebSocket);
        };
    });
};
