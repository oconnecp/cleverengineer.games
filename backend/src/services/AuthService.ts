import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient } from '@prisma/client';
import { Application } from 'express';
import { BACKEND_ORIGIN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../tools/Constants';

const prisma = new PrismaClient();

export const initializeAuthService = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${BACKEND_ORIGIN}/auth/google/callback`  
  },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    
      const user = await prisma.user.upsert({
        where: { email: profile.emails[0].value },
        update: { name: profile.displayName },
        create: { name: profile.displayName, email: profile.emails[0].value }
      });
      return done(null, user);
    }));

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID || '',
    clientSecret: GITHUB_CLIENT_SECRET || '',
    callbackURL: `${BACKEND_ORIGIN}/auth/github/callback`
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
       const user = await prisma.user.upsert({
           where: { email: profile.emails[0].value },
           update: { name: profile.displayName },
           create: { name: profile.displayName, email: profile.emails[0].value }
       });
       return done(null, user);
   }));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  });
}
