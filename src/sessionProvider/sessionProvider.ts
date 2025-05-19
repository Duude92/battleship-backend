import { Session } from './session';

const sessions: Session[] = [];

export const sessionProvider = {
    get sessions() {
        return sessions;
    }
};
