
import { Session } from './../models/Session';
import * as guid from 'guid';
import { resolve } from 'path';

export class SessionHandler {
    static sessions: Array<Session> = [];
    public static checkAllSessions = () => {
        return SessionHandler.sessions;
    }

    public static checkExistingSession = (id: string ) => {
        const session = SessionHandler.sessions.find((data) => data.id === id)
        if(session) {
            return session;
        }
        return null;
    }

    public static createSession = () => {
        const session = new Session();
        session.id = guid.raw();
        session.credits = 10;
        session.account = 0;
        SessionHandler.sessions.push(session);

        return session;
    }

    public static computeCreditstoSession = (id: string, points: number) => {
        const session = SessionHandler.sessions.find((data) => data.id === id);
        if(session) {
            session.credits = session.credits + points;
            return session.credits;
        }
        return 0;
    }
}