import { IShipsData } from '../server/commands/api/IShipsData';
import { startGame } from '../server/commands/startGame';
import { AttackResult } from '../server/commands/api/IAttack';
import { finish } from '../server/commands/finish';
import { UserIdType } from '../api/storage/IUser';
import { createBoard, IBoard } from './board';

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

    shoot(x: number, y: number): AttackResult {
        //TODO: process shooting
        const random = Math.random();
        if (random >= 0.75) finish(this.players, this.currentPlayer);
        return 'miss';
    }
}
