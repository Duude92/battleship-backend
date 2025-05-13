import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IRequestRegister, IResponseRegister } from './api/IPlayer';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { randomUUID } from 'node:crypto';
import { createCommandObject } from '../../api/ICommand';

const register = async (payload: IRequestRegister) => {
    let existingUser = dbContext.users.find(
        (user) => user.name === payload.name
    );
    if (!existingUser) {
        const newId = randomUUID();
        existingUser = {
            name: payload.name,
            password: payload.password,
            id: newId,
            wins: 0
        };
        dbContext.users.push(existingUser);
    }
    const response: IResponseRegister = {
        name: existingUser!.name,
        index: existingUser!.id,
        error: false,
        errorText: ''
    };
    return createCommandObject('reg', response);
};

export const createCommand = (): IRoutedCommand => ({
    route: 'reg',
    command: register
});
