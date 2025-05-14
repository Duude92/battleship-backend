import { ICommand } from './ICommand';

export interface IRoutedCommand {
    route: string;
    command: (payload: string, userId: string) => Promise<ICommand[]>;
}
