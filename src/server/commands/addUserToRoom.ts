import { IRoutedCommand } from '../../api/IRoutedCommand';
import { roomProvider } from '../../roomProvider/roomProvider';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { ICommand } from '../../api/ICommand';
import { createRoomUser } from '../../api/IRoom';
import { createGame } from './createGame';

const commandType = 'add_user_to_room';

const addUserToRoom = async (
    payload: string,
    userId: string
): Promise<ICommand[]> => {
    const payloadObject: { indexRoom: string | number } = JSON.parse(payload);
    const room = roomProvider.rooms.find(
        (room) => room.roomId === payloadObject.indexRoom
    );
    const user = dbContext.users.find((user) => user.id === userId);
    room!.roomUsers.push(createRoomUser(1, user!)); //TODO: what is index? userId?
    return [...await createGame(room!.roomId)];
};
export const createCommand = (): IRoutedCommand => ({
    route: commandType,
    command: addUserToRoom
});
