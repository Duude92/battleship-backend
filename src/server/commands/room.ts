import { UserIdType } from '../../api/storage/IUser';
import { roomProvider } from '../../roomProvider/roomProvider';
import { randomUUID } from 'node:crypto';
import { updateRoom } from './updateRoom';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { $ExportObject } from '@duude92/lazyinject';

const commandType = 'create_room';

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

$ExportObject(
    {
        route: commandType,
        command: createRoom
    },
    'IRoutedCommand'
);
