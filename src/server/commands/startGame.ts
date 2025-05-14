import { IShipsData } from './api/IShipsData';
import { connectionProvider } from '../server';
import { createCommandObject } from '../../api/ICommand';

export const startGame = (shipData: IShipsData[]) => {
    shipData.forEach((data: IShipsData) => {
        connectionProvider.unicast(data.indexPlayer.toString(), createCommandObject(
            'start_game',
            {
                currentPlayerIndex: data.indexPlayer,
                ships: data.ships,
            }
        ))
    })
};
