import ws from 'ws';
import { routeMessage } from './botCommandRouter';
import { UserIdType } from '../api/storage/IUser';
import { sendBotRegister } from './commands/botReg';
import { ICommand } from '../api/ICommand';
import { RoomIdType } from '../api/IRoom';

export interface IBot {
    gameId?: RoomIdType;
    client: ws;
    sessionId: Promise<UserIdType>;
    response: (message: ICommand) => void;
    resolveSessionId: (id: UserIdType) => void;
}

const createResolvablePromise = <T>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
} => {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((res) => (resolve = res));
    return { promise, resolve };
};
export const createBot = () => {
    const client = new ws.WebSocket('ws://localhost:3000');
    const resolvablePromise = createResolvablePromise<UserIdType>();
    const bot: IBot = {
        client: client,
        response: (message) => client.send(JSON.stringify(message)),
        sessionId: resolvablePromise.promise,
        resolveSessionId: resolvablePromise.resolve
    };
    client.on('open', () => {
        client.onmessage = async (message) => {
            await routeMessage(message.data.toString(), bot);
        };
        sendBotRegister(bot);
    });
    return bot;
};
