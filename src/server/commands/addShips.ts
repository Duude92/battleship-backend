import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { IShipsData } from './api/IShipsData';
import { UserIdType } from '../../api/storage/IUser';
import { $ExportObject } from '@duude92/lazyinject';

const addShip = async (payload: string, userId: UserIdType) => {
    const data = JSON.parse(payload) as IShipsData;
    const session = sessionProvider.sessions.find(
        (session) => session.gameId == data.gameId
    );
    if (!session) {
        throw new Error('Session not found');
    }
    // What if our player tries to break game with changing user id
    data.indexPlayer = userId;
    session.addShips(data);
    return [];
};
$ExportObject(
    {
        route: 'add_ships',
        command: addShip
    },
    'IRoutedCommand'
);
