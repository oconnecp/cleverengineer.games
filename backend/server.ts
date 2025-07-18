import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import { AppDataSource } from "./src/db/data-source";
import { initializeAuthService } from './src/services/AuthService';
import AuthRouter from './src/routes/AuthRoutes';
import { ADD_CORS, PORT, FRONTEND_ORIGIN, SESSION_SECRET } from './src/tools/Constants';
import DictionaryRouter from './src/routes/DictionaryRoutes';

const app = express();
const baseUrl = '/api';

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

app.use(`${baseUrl}/auth`, AuthRouter);

// app.get(`${baseUrl}/users`, async (req: Request, res: Response) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

app.use(`${baseUrl}/dictionary`, DictionaryRouter);

app.get(`${baseUrl}/helloworld`, async (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});