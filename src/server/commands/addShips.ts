import { IRoutedCommand } from '../../api/IRoutedCommand';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { IShipsData } from './api/IShipsData';

const addShip = async (payload: string, userId: string) => {
    const data = JSON.parse(payload) as IShipsData;
    const session = sessionProvider.sessions.find(session=>session.gameId == data.gameId);
    if (!session) {
        throw new Error('Session not found');
    }
    session.addShips(data);
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: 'add_ships',
    command: addShip
});
