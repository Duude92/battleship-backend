import { IBotRoutedCommand } from '../../api/IRoutedCommand';
import { IBot } from '../botClient';
import { RoomIdType } from '../../api/IRoom';
import { UserIdType } from '../../api/storage/IUser';
import { addRandomShips } from './addRandomShips';

const createGame = async (input: string, bot: IBot) => {
    const payload = JSON.parse(input) as {
        idGame: RoomIdType;
        idPlayer: UserIdType;
    };
    await addRandomShips(payload, bot);
    return [];
};

export const createCommand = (): IBotRoutedCommand => ({
    route: 'create_game',
    command: createGame
});
