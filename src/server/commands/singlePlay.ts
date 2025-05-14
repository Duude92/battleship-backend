import { IRoutedCommand } from '../../api/IRoutedCommand';

const singlePlay = async () => {
    // TODO: TOIMPLEMENT
    return [];
};
export const createCommand = (): IRoutedCommand => ({
    route: 'single_play',
    command: singlePlay
});
