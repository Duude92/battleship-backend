import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IAttackRequest, IAttackResponse } from './api/IAttack';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';

const attack = async (payload: string, userId: string) => {
    const data = JSON.parse(payload) as IAttackRequest;
    data.indexPlayer = userId;
    const session = sessionProvider.sessions.find(
        (ss) => ss.gameId == data.gameId
    );
    if (!session) {
        throw new Error(`Session ${data.gameId} not found!`);
    }
    const result = session.shoot(data.x, data.y);
    const response: IAttackResponse = {
        status: result,
        currentPlayer: userId,
        position: {
            x: data.x,
            y: data.y
        }
    };
    connectionProvider.multicast(session.players, createCommandObject("attack", response))

    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: 'attack',
    command: attack
});
