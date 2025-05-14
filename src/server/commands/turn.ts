import { createCommandObject, ICommand } from '../../api/ICommand';
import { UserIdType } from '../../api/storage/IUser';

export const turn = (player: UserIdType): ICommand =>
    createCommandObject('turn', {
        currentPlayer: player
    });
