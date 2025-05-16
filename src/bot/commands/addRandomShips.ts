import { readFileSync } from 'node:fs';
import { IBot } from '../botClient';
import { createCommandObject } from '../../api/ICommand';
import { RoomIdType } from '../../api/IRoom';
import { UserIdType } from '../../api/storage/IUser';

const shipArray = JSON.parse(
    readFileSync('./src/bot/shipPlacements.json', 'utf8')
);
const shipsLength = shipArray.length;

export const addRandomShips = async (
    payload: {
        idGame: RoomIdType;
        idPlayer: UserIdType;
    },
    bot: IBot
) => {
    const randomShipsIdx = Math.ceil(Math.random() * shipsLength);
    const ships = shipArray[randomShipsIdx];
    const command = createCommandObject('add_ships', {
        ...ships,
        gameId: payload.idGame,
        indexPlayer: payload.idPlayer
    });

    bot.response(command);
};
