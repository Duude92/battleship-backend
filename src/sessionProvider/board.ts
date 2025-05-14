import {
    getShipCells,
    IShip,
    IShipsData
} from '../server/commands/api/IShipsData';

const createCellData = (ships: IShip[]): ICellData[][] => {
    const result: ICellData[][] = [];
    ships.forEach((ship) => {
        const cells = getShipCells(ship);
        cells.forEach((cell) => {
            if (!result[cell.x]) result[cell.x] = [];
            result[cell.x][cell.y] = createCell(ship);
        });
    });
    for (let i = 0; i < 10; i++) {
        // for (let j = 0; j < 10; j++) {
            if (!result[i]) result[i] = [];

            // if (!result[i][j])
        // }
    }
    return result;
};
export const createBoard = (shipData: IShipsData): IBoard => ({
    shipData: shipData,
    cellData: createCellData(shipData.ships)
});

export interface IBoard {
    shipData: IShipsData;
    cellData: ICellData[][];
}

interface ICellData {
    cellHit: boolean;
    cellObject: IShip | undefined;
}

const createCell = (ship: IShip): ICellData => ({
    cellHit: false,
    cellObject: ship
});
