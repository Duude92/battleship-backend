import { IShipsData } from './api/IShipsData';
import { connectionProvider } from '../server';
import { createCommandObject } from '../../api/ICommand';
import { UserIdType } from '../../api/storage/IUser';
import { turn } from './turn';

export const startGame = (
    shipData: IShipsData[],
    currentPlayerMove: UserIdType
) => {
    shipData.forEach((data: IShipsData) => {
        connectionProvider.unicast(
            data.indexPlayer.toString(),
            createCommandObject('start_game', {
                currentPlayerIndex: data.indexPlayer,
                ships: data.ships
            })
        );
    });
    connectionProvider.multicast(
        shipData.map((data: IShipsData) => data.indexPlayer),
        turn(currentPlayerMove)
    );
};
