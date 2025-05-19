import { IRoom } from '../api/IRoom';

const rooms: IRoom[] = [];

export const roomProvider = {
    get rooms() {
        return rooms;
    }
};
