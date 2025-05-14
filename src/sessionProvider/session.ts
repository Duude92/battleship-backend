import { IShipsData } from '../server/commands/api/IShipsData';
import { startGame } from '../server/commands/startGame';
import { AttackResult } from '../server/commands/api/IAttack';
import { finish } from '../server/commands/finish';
import { UserType } from '../api/storage/IUser';

enum Turn {
    first = 0,
    second
}

export class Session {
    public readonly gameId: string;
    private readonly boards: IShipsData[];
    private turn: Turn;

    constructor(gameId: string) {
        this.gameId = gameId;
        this.boards = [];
        this.turn = Turn.first;
    }

    get nextPlayer(): string | number {
        return this.players[this.turn];
    }

    get players(): UserType[] {
        return this.boards.map((board) => board.indexPlayer);
    }

    makeTurn() {
        this.turn = Number(!this.turn);
    }

    addShips(data: IShipsData) {
        this.boards.push(data);
        if (this.boards.length === 2) startGame(this.boards);
    }

    shoot(x: number, y: number): AttackResult {
        //TODO: process shooting
        const random = Math.random();
        if (random >= 0.75) finish(this.players, this.currentPlayer);
        return 'miss';
    }
}
