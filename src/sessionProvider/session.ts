import { IShipsData } from '../server/commands/api/IShipsData';
import { startGame } from '../server/commands/startGame';
import { AttackResult } from '../server/commands/api/IAttack';

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

    get players(): (string | number)[] {
        return this.boards.map((board) => board.indexPlayer);
    }

    addShips(data: IShipsData) {
        this.boards.push(data);
        if (this.boards.length === 2) startGame(this.boards);
    }

    shoot(x: number, y: number): AttackResult {
        //TODO: process shooting
        return 'miss';
    }
}
