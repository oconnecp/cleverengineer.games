import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
// import { PrismaClient } from '@prisma/client';
import { Application } from 'express';
import { BACKEND_ORIGIN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../tools/Constants';
import { User } from '../db/entities/User';
import { upsertUser } from './UserService';

// const prisma = new PrismaClient();

export const initializeAuthService = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Google OAuth strategy
  const googleCallbackURL = `${BACKEND_ORIGIN}/auth/google/callback`;
  console.log("Google Callback URL:", googleCallbackURL);
  
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: googleCallbackURL
  },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      const saveableUser: Required<Omit<User, 'id'>> = {
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

  // Configure GitHub OAuth strategy
  const githubCallbackURL = `${BACKEND_ORIGIN}/auth/github/callback`;
  console.log("GitHub Callback URL:", githubCallbackURL);

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID || '',
    clientSecret: GITHUB_CLIENT_SECRET || '',
    callbackURL: githubCallbackURL
  },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      console.log("GitHub profile:", profile);
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      const delimitedName = profile.displayName.split[' '];
      const saveableUser: Required<Omit<User, 'id'>> = {
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

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    //todo, update to typeorm
    // const user = await prisma.user.findUnique({ where: { id } });
    done(null, {} as User); // Replace with actual user retrieval logic});
    // done(null, user);
  });
}
