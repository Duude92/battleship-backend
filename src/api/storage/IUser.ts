export interface IUser {
    id: UserIdType;
    name: string;
    password: string;
    wins: number;
}
export type UserIdType = string | number;