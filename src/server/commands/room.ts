import { UserIdType } from '../../api/storage/IUser';

const commandType = 'create_room';

import { roomProvider } from '../../roomProvider/roomProvider';
import { randomUUID } from 'node:crypto';
import { IRoutedCommand } from '../../api/IRoutedCommand';
import { updateRoom } from './updateRoom';
import { dbContext } from '../../memoryDbProvider/dbProvider';

const createRoom = async (payload: string, userId: UserIdType) => {
    const user = dbContext.users.find((user) => user.id === userId)!;
    const newRoom = {
        roomId: randomUUID(),
        roomUsers: [
            {
                index: userId,
                name: user.name
            }
        ]
    };
    roomProvider.rooms.push(newRoom);
    await updateRoom();
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: commandType,
    command: createRoom
});
