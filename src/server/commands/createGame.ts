import { createCommandObject } from '../../api/ICommand';
import { roomProvider } from '../../roomProvider/roomProvider';
import { connectionProvider } from '../server';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { Session } from '../../sessionProvider/session';
import { RoomIdType } from '../../api/IRoom';
import { updateRoom } from './updateRoom';

export const createGame = async (roomId: RoomIdType) => {
    const room = roomProvider.rooms.find((room) => room.roomId === roomId);
    if (!room) {
        throw new Error('Room not found');
    }
    const session = new Session(room.roomId.toString());
    sessionProvider.sessions.push(session);
    room.roomUsers.forEach((user) => {
        connectionProvider.unicast(
            user.user.id,
            createCommandObject('create_game', {
                idGame: roomId,
                idPlayer: user.user.id
            })
        );
    });
    const roomIndex = roomProvider.rooms.findIndex((rm) => rm == room);
    roomProvider.rooms.splice(roomIndex, 1);
    await updateRoom();
};
