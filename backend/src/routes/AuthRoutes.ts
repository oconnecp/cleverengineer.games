import express from 'express';
import passport from 'passport';


const AuthRouter = express.Router()

// base url /auth
AuthRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  AuthRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req: express.Request, res: express.Response) => {
    res.redirect('http://localhost:3000');
  });

  AuthRouter.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }));

  AuthRouter.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (_req: express.Request, res: express.Response) => {
    res.redirect('http://localhost:3000');
  });

export default AuthRouter;