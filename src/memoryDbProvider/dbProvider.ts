import { IUser } from '../api/storage/IUser';

const usersData: IUser[] = [];
export const dbContext = {
    get users():  IUser[] {
        return usersData;
    }
};
