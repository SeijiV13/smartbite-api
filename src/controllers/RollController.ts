
import { Roll } from './../models/Roll';
import { Request, Response } from 'express';
import { configuration } from '../config';
import { SessionHandler } from '../utilities/session-handler';

export class RollController {

    public static rollSlots = (req: Request, res: Response) => {
        let { id } =  req.body;
        let roll;
        //check session 
        const session = SessionHandler.checkExistingSession(id);
        if(!session) {
            return res.status(400).send({error: "Session Not Found!"});
        }
        
        //check if user has remaining credits
        if(session.credits < 1) {
            return res.status(400).send({error: "You have no credits remaining"});
        } 
        // roll and check Results
        // if user hasa less than 40 credits
        if(session.credits < 40) {
           roll = RollController.checkResults(id);
        }
        // if user has greater than or equal to 40 credits and less than or equal to 60 credits
        else if(session.credits >= 40 && session.credits <= 60) {
           roll = RollController.checkResults(id, 30);

        } 
        // if use has greater than 60 credits
        else if(session.credits > 60) {
           roll = RollController.checkResults(id, 60);
        }
        res.status(200).send(roll);
    }

    public static testIfRollAgain(id: string, roll: Roll, chance: number) {
        //chance30 is used when users credits is between 40 and 60
        const chance30 = [true, true, true, false, false, false, false, false, false, false];
        //chance60 is used when users credits is above 60
        const chance60 = [true, true, true, true, true, true, false, false, false, false];
        
        //randomize number to return if to reroll again
        const index = Math.floor(Math.random() * 10);
        let result;

        // if chance is 30  use chance 30 roll
        if(chance === 30) {
            result = chance30[index];
        } else {
            result = chance60[index]
        }

        // if result is true roll again
        if(result) {
           RollController.checkResults(id, chance);
        } else {
           return roll;
        }

    }

    public static checkResults(id: string, chance: number = 0): Roll {
        // possible output of each slot item with correspoinding points
       const fruits = [
           {letters: "C", points: 10},
           {letters: "L", points: 20},
           {letters: "O", points: 30},
           {letters: "W", points: 40}];

       // result will be the container of the three random letters
       const result = [];
       let i = 0;
       // Generate results of the slot machine
       while(i < configuration.box) {
         const index =  Math.floor(Math.random() * 4);
         result.push(fruits[index].letters);
         i++;
       }

       // Create Roll model which the result
       const roll = new Roll();
       const winner = result.every(data => data === result[0]);
       roll.boxes = result;
       roll.result = winner ? "You are a Winner!!!" :  "Try Again!";
       roll.winner = winner;
       roll.credits = SessionHandler.computeCreditstoSession(
           id,
           winner ? fruits.find(data => result[0] == data.letters).points : -1);
       //if winner and chance is 30 or 60 percent evaluate if we will roll again

       if(winner && chance > 0) {
           return this.testIfRollAgain(id, roll, chance);
       }
       return  roll;
    }
}