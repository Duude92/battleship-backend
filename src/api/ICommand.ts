export interface ICommand {
    type: string;
    data: any;
    id: 0;
}

export const createCommandObject = (type: string, data: any): ICommand => ({
    id: 0,
    type: type,
    data: JSON.stringify(data)
});
