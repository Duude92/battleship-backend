import { ICommand } from './ICommand';
import { CommandType } from '../server/commands/api/CommandType';
import { UserIdType } from './storage/IUser';

export interface IRoutedCommand {
    route: CommandType;
    command: (payload: string, userId: UserIdType) => Promise<ICommand[]>;
}
