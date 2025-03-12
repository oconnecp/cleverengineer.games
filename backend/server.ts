import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import { initializeAuthService } from './src/services/AuthService';
import AuthRouter from './src/routes/AuthRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

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