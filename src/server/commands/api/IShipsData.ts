import { RoomIdType } from '../../../api/IRoom';
import { UserIdType } from '../../../api/storage/IUser';

export interface IShipsData {
    gameId: RoomIdType;
    indexPlayer: UserIdType;
    ships: IShip[];
}

interface IShip {
    position: { x: number; y: number };
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge';
}
