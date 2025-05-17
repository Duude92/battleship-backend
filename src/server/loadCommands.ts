// This uses Webpack to statically include files

import { IRoutedCommand } from '../api/IRoutedCommand';
//@ts-ignore
const context = require.context('./commands', false, /\.ts$/);

export const moduleCommands: IRoutedCommand[] = context
    .keys()
    .map((key: unknown) => {
        const mod = context(key);
        return mod.createCommand;// as { createCommand: () => IRoutedCommand };
    })
    .filter(
        (command: { createCommand: () => IRoutedCommand }) =>
            command != undefined
    );

// export const moduleCommands = commands.map(
//     (command: { createCommand: () => IRoutedCommand }) =>
//         command.createCommand()
// );
console.log(moduleCommands);
