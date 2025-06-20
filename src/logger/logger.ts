import { styleText } from 'node:util';
import { ICommand } from '../api/ICommand';
import { transformCommand } from './commandTransform';
import * as stream from 'node:stream';
import { EOL } from 'node:os';

export enum MESSAGE_TYPE {
    REQUEST = 'green',
    RESPONSE = 'blue',
    ERROR = 'red',
    SYSTEM = 'yellow'
}

export const logger = {
    out: [] as stream.Writable[],
    setup(...stdout: stream.Writable[]) {
        this.out = stdout;
    },
    log(messageType: MESSAGE_TYPE, input: ICommand | string) {
        const message = styleText(
            messageType,
            typeof input === 'string' ? input : transformCommand(input)
        );
        for (const output of this.out) {
            output.write(message + EOL);
        }
    }
};
