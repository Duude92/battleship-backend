import { ICommand } from '../api/ICommand';
import { IRequestRegister } from '../server/commands/api/IPlayer';

export const transformCommand = (command: ICommand) => {
    switch (command.type) {
        case 'reg':
            return transformRegister(command);
        default:
            return transformDefault(command);
    }
};

const transformDefault = (command: ICommand) => {
    return JSON.stringify(command);
};
const transformRegister = (command: ICommand) => {
    const data = JSON.parse(command.data) as IRequestRegister;
    data.password = '[credentials]';
    return JSON.stringify({
        id: 0,
        type: command.type,
        data: data
    });
};
