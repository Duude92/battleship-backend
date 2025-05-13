import { IRoutedCommand } from '../../api/IRoutedCommand';
import { IRequestRegister } from './IRegistration';

const register = async (payload: IRequestRegister, socket: WebSocket) => {
    console.log(payload);
};

export const createCommand = (): IRoutedCommand => ({
    route: 'reg',
    command: register
});
