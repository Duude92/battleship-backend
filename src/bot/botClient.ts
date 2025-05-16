import ws from 'ws';
import { routeMessage } from './botCommandRouter';
import { UserIdType } from '../api/storage/IUser';

export interface IBot {
    client: ws;
    sessionId: Promise<UserIdType>;
    response: (message: string) => void;
    resolveSessionId: (id: UserIdType) => void;
}
export const createBot = () => {
    const client = new ws.WebSocket('ws://localhost:3000');
    const bot = {
    const bot: IBot = {
        client: client,
        response: (message) => client.send(message),
        sessionId: resolvablePromise.promise,
        resolveSessionId: resolvablePromise.resolve
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
