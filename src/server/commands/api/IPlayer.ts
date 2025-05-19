import { UserIdType } from '../../../api/storage/IUser';

export interface IRequestRegister {
    name: string;
    password: string;
}

export interface IResponseRegister {
    name: string;
    index: UserIdType;
    error: boolean;
    errorText: string;
}
export interface IUpdateWinner {
    name: string;
    wins: number;
}