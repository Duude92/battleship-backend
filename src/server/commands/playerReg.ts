import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IRequestRegister, IResponseRegister } from './api/IPlayer';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { createCommandObject } from '../../api/ICommand';
import { updateWinners } from './updateWinners';
import { updateRoom } from './updateRoom';
import { connectionProvider } from '../server';

const register = async (input: string, userId: string) => {
    const payload = JSON.parse(input) as IRequestRegister;

    let existingUser = dbContext.users.find(
        (user) => user.name === payload.name
    );
    if (!existingUser) {
        existingUser = {
            name: payload.name,
            password: payload.password,
            id: userId,
            wins: 0
        };
        dbContext.users.push(existingUser);
    }
    const connection = connectionProvider.connections.find(
        (conn) => conn.userId === userId
    );
    connection!.userId = existingUser.id;
    const response: IResponseRegister = {
        name: existingUser!.name,
        index: existingUser!.id,
        error: false,
        errorText: ''
    };
    return [
        createCommandObject('reg', response),
        await updateRoom(),
        await updateWinners()
    ];
};

export const createCommand = (): IRoutedCommand => ({
    route: 'reg',
    command: register
});
