import { IRoutedCommand } from '../../api/IRoutedCommand';
import { UserIdType } from '../../api/storage/IUser';
import { RoomIdType } from '../../api/IRoom';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { attack } from './attack';

const randomAttack = async (payload: string, userId: UserIdType) => {
    const data = JSON.parse(payload) as {
        gameId: RoomIdType;
        indexPlayer: UserIdType;
    };
    const session = sessionProvider.sessions.find(
        (ss) => ss.gameId === data.gameId
    )!;
    if (session.currentPlayer !== userId) return [];
    const randomShot = session.getAvailableRandomPosition(userId);
    await attack(
        {
            gameId: data.gameId,
            indexPlayer: userId,
            x: randomShot.x,
            y: randomShot.y
        },
        userId
    );
    return [];
};

export const createCommand = (): IRoutedCommand => ({
    route: 'randomAttack',
    command: randomAttack
});
