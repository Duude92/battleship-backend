import { styleText } from 'node:util';
import { IRoutedCommand } from '../api/IRoutedCommand';

export const logInputMessage = (input: IRoutedCommand) => {
    const message = styleText('blue', JSON.stringify(input));
    console.log(message);
};
