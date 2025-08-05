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

// Trust the proxy because we are using an nginx reverse proxy in production
// This is important for session handling and secure cookies
app.set('trust proxy', true); 

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

// logger middleware
app.use((req: Request, res: Response, next) => {
  const time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, time);
  next();
});

app.use(express.json());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

initializeAuthService(app);

// Uncomment the following lines if you want to use PostgreSQL sessions
// This will store session data in a PostgreSQL database allowing for persistence across server restarts.
// const pgSession = require('connect-pg-simple')(session);
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

// Add health check endpoint
app.get(`${baseUrl}/healthcheck`, async (_req: Request, res: Response) => {
  console.log('Health check endpoint hit');
  // Check the TypeORM connection
  try {
    await AppDataSource.query('SELECT 1');
    console.log('Database connection is healthy');
    res.send('All good!');
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Add routes
app.use(`${baseUrl}/auth`, AuthRouter);
app.use(`${baseUrl}/dictionary`, DictionaryRouter);
app.use(`${baseUrl}/boggle`, BogglerRouter);

// Initialize the database connection, run migrations, and start the server
AppDataSource.initialize()
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1); // Exit the process if the database connection fails
  })
  .then(() => {
    console.log("Data Source has been initialized!");
    return AppDataSource.runMigrations();
  }).catch((err) => {
    console.error("Error during Migrations:", err);
  })
  .then(() => {
    console.log("Migrations have been run successfully!");
    console.log("Starting server...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })