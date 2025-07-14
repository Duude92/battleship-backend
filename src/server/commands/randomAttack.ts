import { UserIdType } from '../../api/storage/IUser';
import { RoomIdType } from '../../api/IRoom';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { attack } from './attack';
import { $ExportObject } from '@duude92/lazyinject';

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

$ExportObject(
    {
        route: 'randomAttack',
        command: randomAttack
    },
    'IRoutedCommand'
);
