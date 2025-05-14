import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';
import { UserType } from '../../api/storage/IUser';

export const finish = (players: UserType[], winner: UserType) => {
    connectionProvider.multicast(
        players,
        createCommandObject('finish', { winPlayer: winner })
    );
};
