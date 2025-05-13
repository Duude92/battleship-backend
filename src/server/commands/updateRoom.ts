import { roomProvider } from '../../roomProvider/roomProvider';
import { createCommandObject } from '../../api/ICommand';

export const updateRoom = async () => {
    const roomTable = roomProvider.rooms.filter(
        (room) => room.roomUsers.length < 2
    );
    return createCommandObject('update_room', roomTable);
};
