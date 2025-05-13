import fs from 'node:fs/promises';
import * as path from 'node:path';
import { IRoutedCommand } from '../api/IRoutedCommand';

/**
 * Dynamically load modules from 'commands' directory
 * @param basePath Base directory of current module, which contains 'commands' directory with command modules
 * @returns {Promise<Awaited<IRoutedCommand[]>>} Awaited array of commands
 */
export const getCommands = async (
    basePath: string
): Promise<IRoutedCommand[]> => {
    const fullPath = await path.resolve('./src', basePath);
    const files = await fs.readdir(fullPath, { withFileTypes: true });

    return Promise.all(
        files
            .filter((file) => file.isFile())
            .map(async (file) => {
                const filePath = path.normalize('../' + basePath + file.name);
                let module = await import(filePath);

                /** @type {IRoutedCommand}*/
                if (!module.createCommand) return null;
                let command = module.createCommand();
                return command;
            })
    );
};
