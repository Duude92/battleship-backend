import { createCommandObject, ICommand } from '../../api/ICommand';
import { roomProvider } from '../../roomProvider/roomProvider';
import { connectionProvider } from '../server';

export const createGame = async (roomId: string | number) => {
    const room = roomProvider.rooms.find((room) => room.roomId === roomId);
    const command = createCommandObject('create_game', {
        idGame: roomId,
        idPlayer: room!.roomUsers.map((user) => user.user.id)
    });
    room!.roomUsers.forEach((user) => {
        connectionProvider.connections
            .find((conn) => conn.userId == user.user.id)
            ?.socket.send(JSON.stringify(command));
    });
};
