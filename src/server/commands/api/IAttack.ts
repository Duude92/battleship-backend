export type AttackResult = 'miss' | 'killed' | 'shot';

export interface IAttackRequest {
    gameId: string | number;
    x: number;
    y: number;
    indexPlayer: string | number;
}
export interface IAttackResponse{
    position:
        {
            x: number;
            y: number
        };
    currentPlayer: number | string;
    status: AttackResult,
}