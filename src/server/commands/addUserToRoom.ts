import { roomProvider } from '../../roomProvider/roomProvider';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { ICommand } from '../../api/ICommand';
import { createRoomUser, RoomIdType } from '../../api/IRoom';
import { createGame } from './createGame';
import { UserIdType } from '../../api/storage/IUser';
import { $ExportObject } from '@duude92/lazyinject';

const commandType = 'add_user_to_room';

const addUserToRoom = async (
    payload: string,
    userId: UserIdType
): Promise<ICommand[]> => {
    const payloadObject: { indexRoom: RoomIdType } = JSON.parse(payload);
    const room = roomProvider.rooms.find(
        (room) => room.roomId === payloadObject.indexRoom
    );
    if (!room) {
        throw new Error('Room not found');
    }
    if (room.roomUsers.find((user) => user.index === userId)) return [];
    const user = dbContext.users.find((user) => user.id === userId)!;
    const user2Id = room.roomUsers[0].index;
    const usersRooms = roomProvider.rooms
        .filter((room) =>
            room.roomUsers.find(
                (roomUser) =>
                    roomUser.index === userId || roomUser.index === user2Id
            )
        )
        .filter((fRoom) => fRoom != room);
    usersRooms.forEach((uRoom) => {
        const rIndex = roomProvider.rooms.findIndex(
            (fRoom) => fRoom.roomId === uRoom.roomId
        );
        if (rIndex >= 0) roomProvider.rooms.splice(rIndex, 1);
    });

    room.roomUsers.push(createRoomUser(user.id, user));
    await createGame(room.roomId);
    return [];
};

$ExportObject(
    {
        route: commandType,
        command: addUserToRoom
    },
    'IRoutedCommand'
);
