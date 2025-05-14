const commandType = 'create_room';

import { roomProvider } from '../../roomProvider/roomProvider';
import { randomUUID } from 'node:crypto';
import { IRoutedCommand } from '../../api/IRoutedCommand';
import { updateRoom } from './updateRoom';
import { dbContext } from '../../memoryDbProvider/dbProvider';

const createRoom = async (payload: string, userId: string) => {
    const newRoom = {
        roomId: randomUUID(),
        roomUsers: [
            {
                index: 0, //TODO: What is that index <string|number>
                user: dbContext.users.find((user) => user.id === userId)!,
                get name() {
                    return this.user.name;
                }
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
