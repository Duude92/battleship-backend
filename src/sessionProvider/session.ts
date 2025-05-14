import { IShipsData } from '../server/commands/api/IShipsData';
import { startGame } from '../server/commands/startGame';
import { AttackResult, IAttackResponse } from '../server/commands/api/IAttack';
import { finish } from '../server/commands/finish';
import { UserIdType } from '../api/storage/IUser';
import { createBoard, IBoard } from './board';

const CELL_MAX_ID = 9;

enum Turn {
    first = 0,
    second
}

export class Session {
    public readonly gameId: string;
    private readonly boards: IBoard[];
    private turn: Turn;

    constructor(gameId: string) {
        this.gameId = gameId;
        this.boards = [];
        this.turn = Turn.first;
    }

    get currentPlayer(): UserIdType {
        return this.players[this.turn];
    }

    //TODO: Optimize it
    get players(): UserIdType[] {
        return this.boards.map((board) => board.shipData.indexPlayer);
    }

    makeTurn() {
        this.turn = Number(!this.turn);
    }

    addShips(data: IShipsData) {
        this.boards.push(createBoard(data));
        if (this.boards.length === 2) {
            //Randomize first turn
            this.turn = Number(Math.random() > 0.5);
            startGame(
                this.boards.map((board) => board.shipData),
                this.currentPlayer
            );
        }
    }

    shoot(x: number, y: number, userId: UserIdType): AttackResult {
        //TODO: process game finishing

        const board = this.boards.find(
            (board) => board.shipData.indexPlayer !== userId
        )!;
        console.log({ x, y });
        if (board.cellData[x][y].cellHit) return 'unprocessed';
        board.cellData[x][y].cellHit = true;
        if (!board.cellData[x][y].cellObject) return 'miss';
        else return 'shot';
    }

    randomShot(userId: UserIdType): IAttackResponse {
        let result: AttackResult = 'unprocessed';
        let randX: number;
        let randY: number;
        // TODO: Optimize
        while (result == 'unprocessed') {
            randX = Math.round(Math.random() * CELL_MAX_ID);
            randY = Math.round(Math.random() * CELL_MAX_ID);
            result = this.shoot(randX, randY, userId);
        }
        return {
            status: result,
            currentPlayer: userId,
            position: {
                x: randX!,
                y: randY!
            }
        };
    }
}
