export interface IRequestRegister {
    name: string;
    password: string;
}

export interface IResponseRegister {
    name: string;
    index: number | string;
    error: boolean;
    errorText: string;
}
export interface IUpdateWinner {
    name: string;
    wins: number;
}