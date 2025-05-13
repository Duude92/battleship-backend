import { IUser } from './storage/IUser';
import { dbContext } from '../memoryDbProvider/dbProvider';

export interface IRoom {
    roomId: string | number;
    roomUsers: IRoomUser[];
}

interface IRoomUser {
    name: string;
    index: string | number;
    user: IUser;
}

export const createRoomUser = (index: string | number, user: IUser) => ({
    index: index, //TODO: What is that index <string|number>
    user: user,
    get name() {
        return this.user.name;
    }
});
