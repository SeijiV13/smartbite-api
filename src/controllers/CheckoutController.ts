import { SessionHandler } from './../utilities/session-handler';
import { Request, Response } from 'express';
export class CheckoutController {
    public static checkoutCredits = (req: Request, res: Response) => {
      
        let { id }  = req.body;
        const session = SessionHandler.checkExistingSession(id);

        // check if there is an existing session
        if(!session) {
            return res.status(400).send({error: "Session Not Found!"});
        }
        
        //check if user has remaining credits
        if(session.credits < 1) {
            return res.status(400).send({error: "You have no credits to checkout"});
        } 
        
        session.account = session.credits;
        session.credits  = 0
        res.status(200).send({session, message: `Successfully checked out ${session.account} credits`});
    }
}