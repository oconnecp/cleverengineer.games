import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import { initializeAuthService } from './src/services/AuthService';
import AuthRouter from './src/routes/AuthRoutes';
import { ADD_CORS, PORT, FRONTEND_ORIGIN, SESSION_SECRET } from './src/tools/Constants';

const app = express();
const prisma = new PrismaClient();

// Configure CORS to allow requests from the frontend
// If we are in production with our current setup, we won't need to use CORS
// because the frontend and backend will be served from the same domain.
if (ADD_CORS) {
  app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  }));
}
// logger middleware
app.use((req: Request ,res:Response,next) =>{
  const time = new Date(Date.now()).toString();
  console.log(req.method,req.hostname, req.path, time);
  next();
});

app.use(express.json());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

initializeAuthService(app);

app.use('/auth', AuthRouter);

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});