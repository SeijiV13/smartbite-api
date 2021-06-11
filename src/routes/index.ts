import {  Router } from 'express';
import roll from './roll';
import session from './session';
import checkout from './checkout';
const routes = Router();

routes.use('/roll', roll);
routes.use('/session', session);
routes.use('/checkout', checkout);
export default routes;
