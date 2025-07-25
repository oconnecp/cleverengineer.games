import express from 'express';
import passport from 'passport';
import { FRONTEND_ORIGIN } from '../tools/Constants';
import { AuthenticatedUser } from '../db/entities/AuthenticatedUser';

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
  passport.authenticate('github', { failureRedirect: `${FRONTEND_ORIGIN}/error` }),
  (_req: express.Request, res: express.Response) => {
    res.redirect(FRONTEND_ORIGIN);
  });

AuthRouter.get('/user', (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    const thisUser = req.user as AuthenticatedUser; // Cast to any to avoid TypeScript issues
    console.log('Authenticated user:', thisUser);

    res.json({
      email: thisUser.email,
      firstName: thisUser.firstName,
      lastName: thisUser.lastName,
      profilePic: thisUser.profilePic,

    });
  }
  else {
    res.status(401).json({ user: null });
  }
});


AuthRouter.get('/logout', (req: express.Request, res: express.Response) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.redirect(FRONTEND_ORIGIN);
  }
  );
});

export default AuthRouter;