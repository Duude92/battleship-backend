export interface IShipsData {
    gameId: string | number;
    indexPlayer: string | number;
    ships: IShip[];
}

interface IShip {
    position: { x: number; y: number };
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge';
}
