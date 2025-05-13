import { createCommandObject, ICommand } from '../../api/ICommand';
import { roomProvider } from '../../roomProvider/roomProvider';

export const createGame = async (
    roomId: string | number
): Promise<ICommand[]> => {
    const room = roomProvider.rooms.find((room) => room.roomId === roomId);
    //TODO: send to all users within room
    return [
        createCommandObject('create_game', {
            idGame: roomId,
            idPlayer: room!.roomUsers.map((user) => user.user.id)
        })
    ];
};
