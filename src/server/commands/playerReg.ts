import { IRequestRegister, IResponseRegister } from './api/IPlayer';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { createCommandObject } from '../../api/ICommand';
import { updateWinners } from './updateWinners';
import { updateRoom } from './updateRoom';
import { connectionProvider } from '../server';
import { UserIdType } from '../../api/storage/IUser';
import { $ExportObject } from '@duude92/lazyinject';

const register = async (input: string, userId: UserIdType) => {
    const payload = JSON.parse(input) as IRequestRegister;
    if ('anonymous' in payload) {
        const response: IResponseRegister = {
            name: payload.name,
            index: userId,
            error: false,
            errorText: ''
        };
        connectionProvider.unicast(
            userId,
            createCommandObject('reg', response)
        );
        return [];
    }

    let existingUser = dbContext.users.find(
        (user) => user.name === payload.name
    );
    let userCreated = false;
    if (!existingUser) {
        existingUser = {
            name: payload.name,
            password: payload.password,
            id: userId,
            wins: 0
        };
        userCreated = true;
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
    if (!userCreated) {
        const connectedUser = connectionProvider.connections.find(
            (conn) => conn.userId === existingUser!.id
        );
        if (connectedUser) {
            const response: IResponseRegister = {
                name: payload.name,
                index: '',
                error: true,
                errorText: `User ${existingUser.name} is already connected`
            };
            return [createCommandObject('reg', response)];
        }
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
    connectionProvider.unicast(
        existingUser.id,
        createCommandObject('reg', response)
    );
    return [];
};

$ExportObject(
    {
        route: 'reg',
        command: register
    },
    'IRoutedCommand'
);
