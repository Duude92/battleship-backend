import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';
import { UserIdType } from '../../api/storage/IUser';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { updateWinners } from './updateWinners';

export const finish = async (players: UserIdType[], winner: UserIdType) => {
    connectionProvider.multicast(
        players,
        createCommandObject('finish', { winPlayer: winner })
    );
    const user = dbContext.users.find((user) => user.id === winner);
    if (!user) {
        throw new Error('User not found!');
    }
    user.wins++;
    await updateWinners()
};
