import { RoomIdType } from '../../../api/IRoom';
import { UserIdType } from '../../../api/storage/IUser';

export interface IShipsData {
    gameId: RoomIdType;
    indexPlayer: UserIdType;
    ships: IShip[];
}

export interface IShip {
    position: vector2d;
    direction: boolean;
    length: number;
    type: ShipSize;
}

interface vector2d {
    x: number;
    y: number;
}

enum ShipSize {
    'small' = 0,
    'medium',
    'large',
    'huge'
}

export const getShipCells = (ship: IShip): vector2d[] => {
    const pivot = ship.position;
    const cells: vector2d[] = [];
    cells.push(pivot);
    for (let i = 1; i < ship.length; i++) {
        cells.push({
            x: pivot.x + Number(!ship.direction) * i,
            y: pivot.y + Number(ship.direction) * i
        });
    }
    return cells;
};
