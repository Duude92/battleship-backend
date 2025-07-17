import { ContainerFactory } from '@duude92/lazyinject';
import { Container } from '@duude92/lazyinject/dist/container';
import { InterfaceType } from '@duude92/lazyinject/dist/api/interfaceType';

let containerInternal: Container;

export const container = {
    async getMany<T>(type: InterfaceType) {
        if (!containerInternal) {
            containerInternal = await ContainerFactory.create({
                baseDir: __dirname,
                catalogs: ['./commands/']
            });
        }
        return containerInternal.getMany<T>(type);
    },
    async get<T>(type: InterfaceType) {
        if (!containerInternal) {
            containerInternal = await ContainerFactory.create({
                baseDir: __dirname,
                catalogs: ['./commands/']
            });
        }
        return containerInternal.get<T>(type);
    }
};
