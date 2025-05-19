import { roomProvider } from '../../roomProvider/roomProvider';
import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';

export const updateRoom = async () => {
    const roomTable = roomProvider.rooms.filter(
        (room) => room.roomUsers.length < 2
    );
    connectionProvider.broadcast(createCommandObject('update_room', roomTable));
};
