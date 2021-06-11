
import { Request, Response } from 'express';
import { SessionHandler } from "../utilities/session-handler"

export class SessionController {
   
    public static checkSession = (req: Request, res: Response) => {
        const { id } = req.body;
        const session = SessionHandler.checkExistingSession(id);
        let newSession = null;

        // if no session is found, it will create a new session
        if(!session) {
          newSession = SessionHandler.createSession();
          return res.status(200).send(newSession);
        }

        // if sessios is found but 0 credits create new
        if(session.credits < 1) {
            newSession = SessionHandler.createSession();
            return res.status(200).send(newSession);
        }
        return res.status(200).send(session);


    }

    public static checkAllSessions = (req: Request, res: Response) => {
        return res.status(200).send(SessionHandler.checkAllSessions());
    }

}