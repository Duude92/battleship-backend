import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IRequestRegister, IResponseRegister } from './IRegistration';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { randomUUID } from 'node:crypto';
import { createCommandObject } from '../../api/ICommand';

const register = async (payload: IRequestRegister, socket: WebSocket) => {
    let existingUser = dbContext.users.find(
        (user) => user.name === payload.name
    );
    if (!existingUser) {
        const newId = randomUUID();
        existingUser = {
            name: payload.name,
            password: payload.password,
            id: newId
        };
        dbContext.users.push(existingUser);

    }
    const response: IResponseRegister = {
        name: existingUser!.name,
        index: existingUser!.id,
        error: false,
        errorText: ''
    };
    const answer = createCommandObject('reg', response);
    socket.send(JSON.stringify(answer));
};

export const createCommand = (): IRoutedCommand => ({
    route: 'reg',
    command: register
});
