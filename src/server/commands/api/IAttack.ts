import { RoomIdType } from '../../../api/IRoom';
import { UserIdType } from '../../../api/storage/IUser';

export type AttackResult = 'miss' | 'killed' | 'shot';

export interface IAttackRequest {
    gameId: RoomIdType;
    x: number;
    y: number;
    indexPlayer: UserIdType;
}
export interface IAttackResponse{
    position:
        {
            x: number;
            y: number
        };
    currentPlayer: UserIdType;
    status: AttackResult,
}