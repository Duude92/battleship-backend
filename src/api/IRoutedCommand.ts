import { ICommand } from './ICommand';

export interface IRoutedCommand {
    route: string;
    command: (payload: any) => Promise<ICommand>;
}
