import { IShipsData } from '../server/commands/api/IShipsData';
import { startGame } from '../server/commands/startGame';
import { AttackResult } from '../server/commands/api/IAttack';
import { UserIdType } from '../api/storage/IUser';
import { createBoard, IBoard } from './board';

const CELL_MAX_ID = 9;

enum Turn {
    first = 0,
    second
}

export class Session {
    public readonly gameId: string;
    public winner: UserIdType | undefined;
    public players: UserIdType[];
    private readonly boards: IBoard[];
    private turn: Turn;

    constructor(gameId: string) {
        this.gameId = gameId;
        this.boards = [];
        this.turn = Turn.first;
        this.players = [];
    }

    get currentPlayer(): UserIdType {
        return this.players[this.turn];
    }

    makeTurn() {
        this.turn = Number(!this.turn);
    }

    addShips(data: IShipsData) {
        this.boards.push(createBoard(data));
        this.players.push(data.indexPlayer);
        if (this.boards.length === 2) {
            //Randomize first turn
            this.turn = Number(Math.random() > 0.5);
            startGame(
                this.boards.map((board) => board.shipData),
                this.currentPlayer
            );
        }
    }

    getAvailableRandomPosition(userId: UserIdType) {
        const board = this.boards.find(
            (board) => board.shipData.indexPlayer !== userId
        )!;
        if (!board.freeCells.length) return { x: -1, y: -1 };
        const rand = Math.round(Math.random() * (board.freeCells.length - 1));
        return board.freeCells[rand];
    }

    shoot(x: number, y: number, userId: UserIdType): AttackResult {
        const board = this.getAnotherPlayerBoard(userId);
        if (board.cellData[x][y].cellHit) return 'unprocessed';
        board.cellData[x][y].cellHit = true;
        const freeCell = board.freeCells.findIndex(
            (cell) => cell.x === x && cell.y === y
        );
        if (freeCell > 0) board.freeCells.splice(freeCell, 1);
        if (!board.cellData[x][y].cellObject) return 'miss';
        const missed = board.cellData[x][y].shipCells!.cells.find(
            (cellPos) => !board.cellData[cellPos.x][cellPos.y].cellHit
        );
        if (!missed) {
            const shipIndex = board.shipData.ships.findIndex(
                (ship) => ship == board.cellData[x][y].cellObject
            );
            board.shipData.ships.splice(shipIndex, 1);
            if (board.shipData.ships.length < 1) this.winner = userId;
            return 'killed';
        }
        return 'shot';
    }

    private getAnotherPlayerBoard(userId: string | number) {
        return this.boards.find(
            (board) => board.shipData.indexPlayer !== userId
        )!;
    }

    getUntouchedNeighbouringCellsAndMarkEmHit(
        x: number,
        y: number,
        userId: UserIdType
    ): { x: number; y: number }[] {
        const board = this.getAnotherPlayerBoard(userId);
        const cellData = board.cellData[x][y];
        const shipCells = cellData.shipCells!;
        const allCells = shipCells.cells.flatMap((cell) => {
            const aroundCells: { x: number; y: number }[] = [];
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const newCell = { x: cell.x + i, y: cell.y + j };
                    if (
                        !(
                            newCell.x < 0 ||
                            newCell.x > CELL_MAX_ID ||
                            newCell.y < 0 ||
                            newCell.y > CELL_MAX_ID
                        )
                    ) {
                        aroundCells.push(newCell);
                    }
                }
            }
            return aroundCells;
        });
        const result = allCells?.filter(
            (cell) => !board.cellData[cell.x][cell.y].cellHit
        );
        result?.forEach((cell) => {
            board.cellData[cell.x][cell.y].cellHit = true;
            const freeCell = board.freeCells.findIndex(
                (fCell) => cell.x === fCell.x && cell.y === fCell.y
            );
            if (freeCell > 0) board.freeCells.splice(freeCell, 1);
        });

        return result;
    }
}
