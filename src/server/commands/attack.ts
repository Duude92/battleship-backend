import {
    IAttackRequest,
    IAttackResponse,
    isAttackRequest
} from './api/IAttack';
import { sessionProvider } from '../../sessionProvider/sessionProvider';
import { createCommandObject } from '../../api/ICommand';
import { connectionProvider } from '../server';
import { turn } from './turn';
import { UserIdType } from '../../api/storage/IUser';
import { finish } from './finish';
import { $ExportObject } from '@duude92/lazyinject';

export const attack = async (
    payload: string | IAttackRequest,
    userId: UserIdType
) => {
    const data = (
        !isAttackRequest(payload) ? JSON.parse(payload as string) : payload
    ) as IAttackRequest;
    data.indexPlayer = userId;
    const session = sessionProvider.sessions.find(
        (ss) => ss.gameId == data.gameId
    );
    if (!session) {
        throw new Error(`Session ${data.gameId} not found!`);
    }
    if (session.currentPlayer != userId) return [];
    const result = session.shoot(data.x, data.y, userId);
    if (result === 'unprocessed') {
        const nextPlayer = turn(session.currentPlayer);
        connectionProvider.multicast(session.players, nextPlayer);
        return [];
    }
    const response: IAttackResponse = {
        status: result,
        currentPlayer: userId,
        position: {
            x: data.x,
            y: data.y
        }
    };
    connectionProvider.multicast(
        session.players,
        createCommandObject('attack', response)
    );
    if (result === 'miss') session.makeTurn();
    if (result === 'killed') {
        const cells = session.getUntouchedNeighbouringCellsAndMarkEmHit(
            data.x,
            data.y,
            userId
        );
        cells.forEach((cell) => {
            const killResponse: IAttackResponse = {
                status: 'miss',
                currentPlayer: userId,
                position: {
                    x: cell.x,
                    y: cell.y
                }
            };
            connectionProvider.multicast(
                session.players,
                createCommandObject('attack', killResponse)
            );
        });
    }
    const nextPlayer = turn(session.currentPlayer);
    connectionProvider.multicast(session.players, nextPlayer);
    const winner = session.winner;
    if (winner) {
        await finish(session.players, winner);
    }
    return [];
};

$ExportObject(
    {
        route: 'attack',
        command: attack
    },
    'IRoutedCommand'
);
