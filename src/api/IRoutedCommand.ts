import { ICommand } from './ICommand';

export interface IRoutedCommand {
    route: string;
    command: (payload: any, userId: string) => Promise<ICommand[]>;
}
