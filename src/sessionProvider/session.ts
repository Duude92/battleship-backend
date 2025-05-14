import { IShipsData } from '../server/commands/api/IShipsData';

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

    addShips(data: IShipsData) {
        this.boards.push(data);
    }
}
