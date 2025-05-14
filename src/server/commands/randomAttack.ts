import { IRoutedCommand } from '../../api/IRoutedCommand';
import { UserIdType } from '../../api/storage/IUser';
import { RoomIdType } from '../../api/IRoom';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { connectionProvider } from '../server';
import { createCommandObject } from '../../api/ICommand';
import { turn } from './turn';

const randomAttack = async (payload: string, userId: UserIdType) => {
    const data = JSON.parse(payload) as {
        gameId: RoomIdType;
        indexPlayer: UserIdType;
    };
    const session = sessionProvider.sessions.find(
        (ss) => ss.gameId === data.gameId
    )!;
    if (session.currentPlayer !== userId) return [];
    const result = session.randomShot(userId);
    connectionProvider.multicast(
        session.players,
        createCommandObject('attack', result)
    );
    if (result.status === 'miss') session.makeTurn();

    const nextPlayer = turn(session.currentPlayer);
    connectionProvider.multicast(session.players, nextPlayer);
    return [];
};

export const createCommand = (): IRoutedCommand => ({
    route: 'randomAttack',
    command: randomAttack
});
