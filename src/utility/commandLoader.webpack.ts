// This uses Webpack to statically include files

import { IRoutedCommand } from '../api/IRoutedCommand';

//@ts-expect-error __WebpackModuleApi is a Webpack TS namespace
function loadCommands(context: __WebpackModuleApi.RequireContext) {
    const moduleCommands: (() => IRoutedCommand)[] = context
        .keys()
        .map((key: unknown) => {
            const mod = context(key);
            return mod.createCommand as () => IRoutedCommand;
        })
        .filter((command: unknown) => command != undefined);
    return moduleCommands.map((command) => {
        return command();
    });
}

export const getCommands = async (
    basePath: string
): Promise<IRoutedCommand[]> => {
    const contexts = [
        {
            path: 'server/commands/',
            //@ts-expect-error Usage of require.context
            ctx: require.context('../server/commands/', false, /\.ts$/)
        },
        {
            path: 'bot/commands/',
            //@ts-expect-error Usage of require.context
            ctx: require.context('../bot/commands/', false, /\.ts$/)
        }
    ];
    const ctxCommands = contexts.map((ctx) => ({
        path: ctx.path,
        commands: loadCommands(ctx.ctx) as IRoutedCommand[]
    }));
    return ctxCommands.find((commands) => commands.path.includes(basePath))!
        .commands;
};
