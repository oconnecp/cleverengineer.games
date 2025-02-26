const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const prisma = require('../prisma/client');

export const initializeAuthService = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"  //todo:don't hardcode this
  },
    async (accessToken, refreshToken, profile, done) => {
    
      const user = await prisma.user.upsert({
        where: { email: profile.emails[0].value },
        update: { name: profile.displayName },
        create: { name: profile.displayName, email: profile.emails[0].value }
      });
      return done(null, user);
    }));

  console.log(process.env.GITHUB_CLIENT_ID);
  console.log(process.env.GITHUB_CLIENT_SECRET);
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
       const user = await prisma.user.upsert({
           where: { email: profile.emails[0].value },
           update: { name: profile.displayName },
           create: { name: profile.displayName, email: profile.emails[0].value }
       });
       return done(null, user);
   }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  });
}
