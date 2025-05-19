import { CommandType } from '../server/commands/api/CommandType';

export interface ICommand {
    type: string;
    data: string;
    id: 0;
}

export const createCommandObject = (type: CommandType, data: object): ICommand => ({
    id: 0,
    type: type,
    data: JSON.stringify(data)
});
