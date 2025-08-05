import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { AppDataSource } from "./src/db/data-source";
import { initializeAuthService } from './src/services/AuthService';
import AuthRouter from './src/routes/AuthRoutes';
import { ADD_CORS, PORT, FRONTEND_ORIGIN, SESSION_SECRET } from './src/tools/Constants';
import DictionaryRouter from './src/routes/DictionaryRoutes';
import BogglerRouter from './src/routes/BoggleRoutes';

const app = express();
const baseUrl = '/api';

app.set('trust proxy', true); // Trust first proxy for secure cookies if behind a reverse proxy

// Configure CORS to allow requests from the frontend
// If we are in production with our current setup, we won't need to use CORS
// because the frontend and backend will be served from the same domain.
if (ADD_CORS) {
  console.log(`Adding CORS for ${FRONTEND_ORIGIN}`);
  app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  }));
}

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // Start your server or application logic here
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// logger middleware
app.use((req: Request ,res:Response,next) =>{
  const time = new Date(Date.now()).toString();
  console.log(req.method,req.hostname, req.path, time);
  next();
});

app.use(express.json());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

initializeAuthService(app);
//const pgSession = require('connect-pg-simple')(session);

// Use the existing TypeORM connection pool
// app.use(session({
//   store: new pgSession({
//     pool: (AppDataSource.driver as any).master, // Use TypeORM's database connection pool
//     tableName: 'session'
//   }),
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true } // set to true if using HTTPS
// }));

app.get(`${baseUrl}/healthcheck`, async (_req: Request, res: Response): Promise<void> => {
  console.log('Health check endpoint hit');
  try {
    await AppDataSource.query('SELECT 1');
    console.log('Database connection is healthy');
    res.send('All good!');
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.use(`${baseUrl}/auth`, AuthRouter);

app.use(`${baseUrl}/dictionary`, DictionaryRouter);

app.use(`${baseUrl}/boggle`, BogglerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});