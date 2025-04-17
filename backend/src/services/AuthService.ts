import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Application } from 'express';
import { BACKEND_ORIGIN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../tools/Constants';
import { User } from '../db/entities/User';
import { upsertUser, getUserByIdAndSecret } from './UserService';

export const initializeAuthService = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${BACKEND_ORIGIN}/auth/google/callback`
  },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      console.log("Google profile:", profile);

      const saveableUser: Required<Omit<User, 'id' | 'clientSecret'>> = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken,
        authProvider: 'google'
      }

      const user = await upsertUser(saveableUser);
      if (!user) {
        return done(new Error("Error saving user to database", { cause: { user } }));
      }

      return done(null, user);
    }));

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID || '',
    clientSecret: GITHUB_CLIENT_SECRET || '',
    callbackURL: `${BACKEND_ORIGIN}/auth/github/callback`
  },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      console.log("GitHub profile:", profile);
      const delimitedName = profile.displayName.split[' '];
      const saveableUser: Required<Omit<User, 'id' | 'clientSecret'>> = {
        firstName: delimitedName[0],
        lastName: delimitedName[delimitedName.length],
        email: profile.emails[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken,
        authProvider: 'github'
      }

      const user = await upsertUser(saveableUser);
      if (!user) {
        return done(new Error("Error saving user to database", { cause: { user } }));
      }

      return done(null, user);
    }));

  type returnUserType = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'clientSecret'>;
  const toReturnUserType = (user: User): returnUserType => {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      clientSecret: user.clientSecret
    }
  }

  passport.serializeUser((user: any, done) => {
    done(null, toReturnUserType(user));
  });

  passport.deserializeUser(async (userData: returnUserType, done) => {
    const user = await getUserByIdAndSecret(userData.id, userData.clientSecret);
      done(null, user);
  });
}
