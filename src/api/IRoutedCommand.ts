import { ICommand } from './ICommand';
import { CommandType } from '../server/commands/api/CommandType';

export interface IRoutedCommand {
    route: CommandType;
    command: (payload: string, userId: string) => Promise<ICommand[]>;
}
