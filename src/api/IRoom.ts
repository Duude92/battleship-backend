import { IUser, UserIdType } from './storage/IUser';

export interface IRoom {
    roomId: RoomIdType;
    roomUsers: IRoomUser[];
}

interface IRoomUser {
    name: string;
    index: RoomIdType;
    user: IUser;
}

export const createRoomUser = (index: RoomIdType, user: IUser) => ({
    index: index, //TODO: What is that index <string|number>
    user: user,
    get name() {
        return this.user.name;
    }
});

export type RoomIdType = UserIdType