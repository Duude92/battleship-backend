import { RoomIdType } from '../api/IRoom';
import { UserIdType } from '../api/storage/IUser';
import { Session } from '../sessionProvider/session';
import { sessionProvider } from '../sessionProvider/sessionProvider';
import { connectionProvider } from '../server/server';
import { createCommandObject } from '../api/ICommand';
import { roomProvider } from '../roomProvider/roomProvider';
import { updateRoom } from '../server/commands/updateRoom';

export const createSingleplayGame = async (
    roomId: RoomIdType,
    user: UserIdType,
    bot: UserIdType
) => {
    const session = new Session(roomId.toString());
    sessionProvider.sessions.push(session);
    const userRooms = roomProvider.rooms.filter((room) =>
        room.roomUsers[0].index === user
    );
    userRooms.forEach((uRoom) => {
        const rIndex = roomProvider.rooms.findIndex(
            (fRoom) => fRoom.roomId === uRoom.roomId
        );
        if (rIndex > 0) roomProvider.rooms.splice(rIndex, 1);
    });
    await updateRoom();
    connectionProvider.unicast(
        user,
        createCommandObject('create_game', {
            idGame: roomId,
            idPlayer: user
        })
    );
    connectionProvider.unicast(
        bot,
        createCommandObject('create_game', {
            idGame: roomId,
            idPlayer: bot
        })
    );
};
