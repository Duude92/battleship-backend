import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IRequestRegister, IResponseRegister } from './api/IPlayer';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { createCommandObject } from '../../api/ICommand';
import { updateWinners } from './updateWinners';
import { updateRoom } from './updateRoom';
import { connectionProvider } from '../server';
import { UserIdType } from '../../api/storage/IUser';

const register = async (input: string, userId: UserIdType) => {
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
    if (existingUser.password !== payload.password) {
        const response: IResponseRegister = {
            name: payload.name,
            index: '',
            error: true,
            errorText: 'Provided password is incorrect'
        };
        return [createCommandObject('reg', response)];
    }
    connection!.userId = existingUser.id;
    const response: IResponseRegister = {
        name: existingUser!.name,
        index: existingUser!.id,
        error: false,
        errorText: ''
    };
    await updateRoom();
    await updateWinners();
    return [createCommandObject('reg', response)];
};

export const createCommand = (): IRoutedCommand => ({
    route: 'reg',
    command: register
});
