import { RoomIdType } from '../api/IRoom';
import { UserIdType } from '../api/storage/IUser';
import { Session } from '../sessionProvider/session';
import { sessionProvider } from '../sessionProvider/sessionProvider';
import { connectionProvider } from '../server/server';
import { createCommandObject } from '../api/ICommand';

export const createSingleplayGame = async (
    roomId: RoomIdType,
    user: UserIdType,
    bot: UserIdType
) => {
    const session = new Session(roomId.toString());
    sessionProvider.sessions.push(session);
    connectionProvider.unicast(
        user,
        createCommandObject('create_game', {
            idGame: roomId,
            idPlayer: user
        })
    );
    connectionProvider.unicast(
        bot,
        createCommandObject('create_game', {
            idGame: roomId,
            idPlayer: bot
        })
    );
};
