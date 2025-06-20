import { RoomIdType } from '../../../api/IRoom';
import { UserIdType } from '../../../api/storage/IUser';

export type AttackResult = 'miss' | 'killed' | 'shot' | 'unprocessed';

export const isAttackRequest = (object: unknown): object is IAttackRequest => {
    if (typeof object !== 'object') return false;
    if (object === null) return false;
    return (
        'gameId' in object &&
        'x' in object &&
        'y' in object &&
        'indexPlayer' in object
    );
};

export interface IAttackRequest {
    gameId: RoomIdType;
    x: number;
    y: number;
    indexPlayer: UserIdType;
}

export interface IAttackResponse {
    position: {
        x: number;
        y: number;
    };
    currentPlayer: UserIdType;
    status: AttackResult;
}
