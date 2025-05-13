import { IRoutedCommand } from '../../api/IRoutedCommand';
import { roomProvider } from '../../roomProvider/roomProvider';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { ICommand } from '../../api/ICommand';

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
    room!.roomUsers.push({ name: user!.name, index: 1 });
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: commandType,
    command: addUserToRoom
});
