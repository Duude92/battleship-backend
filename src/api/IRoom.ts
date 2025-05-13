export interface IRoom {
    roomId: string | number;
    roomUsers: IUser[];
}

interface IUser {
    name: string;
    index: string | number;
}
