import { IRoutedCommand } from '../../api/IRoutedCommand';
import { roomProvider } from '../../roomProvider/roomProvider';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { ICommand } from '../../api/ICommand';
import { createRoomUser, RoomIdType } from '../../api/IRoom';
import { createGame } from './createGame';
import { UserIdType } from '../../api/storage/IUser';

const commandType = 'add_user_to_room';

const addUserToRoom = async (
    payload: string,
    userId: UserIdType
): Promise<ICommand[]> => {
    const payloadObject: { indexRoom: RoomIdType } = JSON.parse(payload);
    const room = roomProvider.rooms.find(
        (room) => room.roomId === payloadObject.indexRoom
    );
    if (!room) {
        throw new Error('Room not found');
    }
    const user = dbContext.users.find((user) => user.id === userId)!;
    room.roomUsers.push(createRoomUser(user.id, user));
    await createGame(room.roomId);
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: commandType,
    command: addUserToRoom
});
