import {
    getShipCells,
    IShip,
    IShipsData
} from '../server/commands/api/IShipsData';

const CELLS_MAX = 10;

const createCellData = (ships: IShip[]): ICellData[][] => {
    const result: ICellData[][] = [];
    ships.forEach((ship) => {
        const cells = getShipCells(ship);
        const shipCells = { cells: cells };
        cells.forEach((cell) => {
            if (!result[cell.x]) result[cell.x] = [];
            const shipCell = createCell(ship);
            shipCell.shipCells = shipCells;
            result[cell.x][cell.y] = shipCell;
        });
    });
    for (let i = 0; i < CELLS_MAX; i++) {
        if (!result[i]) result[i] = [];
        for (let j = 0; j < CELLS_MAX; j++) {
            if (!result[i][j]) result[i][j] = createCell(undefined);
        }
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

interface vector2d {
    x: number;
    y: number;
}

interface ICellData {
    cellHit: boolean;
    cellObject: IShip | undefined;
    shipCells?: { cells: vector2d[] };
}

const createCell = (ship: IShip | undefined): ICellData => ({
    cellHit: false,
    cellObject: ship
});
