import express from 'express';
import passport from 'passport';
import { FRONTEND_ORIGIN } from '../tools/Constants';

const AuthRouter = express.Router()

// base url /auth
AuthRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

AuthRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${FRONTEND_ORIGIN}/error` }),
  (_req: express.Request, res: express.Response) => {
    res.redirect(FRONTEND_ORIGIN);
  });

AuthRouter.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }));

AuthRouter.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (_req: express.Request, res: express.Response) => {
    res.redirect(FRONTEND_ORIGIN);
  });

export default AuthRouter;