import { IShipsData } from '../server/commands/api/IShipsData';

export const createBoard = (shipData : IShipsData) : IBoard => ({
    shipData: shipData,
})
export interface IBoard {
    shipData: IShipsData;
}