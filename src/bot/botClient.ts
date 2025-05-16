import ws from 'ws';
import { routeMessage } from './botCommandRouter';
import { UserIdType } from '../api/storage/IUser';

export const createBot = () => {
    const client = new ws.WebSocket('ws://localhost:3000');
    const bot = {
        client: client,
        sessionId: <UserIdType | null>null
    };
    client.on('open', (socket: WebSocket) => {
        socket.onmessage = async (message) => {
            await routeMessage(message.data.toString(), socket);
        };
        socket.send(
            JSON.stringify({
                name: bot,
                anonymous: true
            })
        );
    });
    return bot;
};
