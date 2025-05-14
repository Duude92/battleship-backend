import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';
import { UserIdType } from '../../api/storage/IUser';
import { dbContext } from '../../memoryDbProvider/dbProvider';

export const finish = (players: UserIdType[], winner: UserIdType) => {
    connectionProvider.multicast(
        players,
        createCommandObject('finish', { winPlayer: winner })
    );
    const user = dbContext.users.find((user) => user.id === winner);
    if (!user) {
        throw new Error('User not found!');
    }
    user.wins++;
};
