import { createCommandObject, ICommand } from '../../api/ICommand';

export const turn = (player: number | string): ICommand =>
    createCommandObject('turn', {
        currentPlayer: player
    });
