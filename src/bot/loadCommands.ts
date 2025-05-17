// This uses Webpack to statically include files

import { IBotRoutedCommand } from '../api/IRoutedCommand';

//@ts-ignore
const context = require.context('./commands', false, /\.ts$/);
// (async () => {
//     const ctx = await context;
//     console.log(ctx());
// })();

export const moduleCommands: IBotRoutedCommand[] = context
    .keys()
    .map((key: unknown) => {
        const mod = context(key);
        return mod.createCommand as IBotRoutedCommand;
    });
// console.log(context());
console.log(...moduleCommands);
