import { IUpdateWinner } from './api/IPlayer';
import { dbContext } from '../../memoryDbProvider/dbProvider';
import { createCommandObject } from '../../api/ICommand';

const commandType = 'update_winners';
export const updateWinners = async () => {
    const winnerTable: IUpdateWinner[] = dbContext.users
        .map((user) => ({
            name: user.name,
            wins: user.wins
        }))
        .sort((a, b) => a.wins - b.wins);
    return createCommandObject(commandType, winnerTable);
};
