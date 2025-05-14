export interface IUser {
    id: string;
    name: string;
    password: string;
    wins: number;
}
export type UserType = string | number;