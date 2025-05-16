import { ICommand } from './ICommand';
import { CommandType } from '../server/commands/api/CommandType';
import { UserIdType } from './storage/IUser';
import { IBot } from '../bot/botClient';

export interface IRoutedCommand {
    route: CommandType;
    command: (payload: string, userId: UserIdType) => Promise<ICommand[]>;
}
export interface IBotRoutedCommand {
    route: CommandType;
    command: (payload: string, userId: IBot) => Promise<ICommand[]>;
}
