import { createCommandObject } from '../../api/ICommand';

const commandType = 'create_room';

import { roomProvider } from '../../roomProvider/roomProvider';
import { randomUUID } from 'node:crypto';
import { IRoutedCommand } from '../../api/IRoutedCommand';
import { updateRoom } from './updateRoom';
import { dbContext } from '../../memoryDbProvider/dbProvider';

const createRoom = async (payload: '', userId: string) => {
    const newRoom = {
        roomId: randomUUID(),
        roomUsers: [
            {
                name: dbContext.users.find((user) => user.id === userId)!.name,
                index: 0
            }
        ]
    };
    roomProvider.rooms.push(newRoom);
    return [
        await updateRoom()

        // createCommandObject(commandType, {
        //     idGame: newRoom.roomId,
        //     idPlayer: ''
        // })
    ];
};
export const createCommand = (): IRoutedCommand => ({
    route: commandType,
    command: createRoom
});
