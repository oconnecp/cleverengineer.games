const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const { initializeAuthService } = require('./src/services/AuthService');

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

app.use('/auth', require('./src/routes/auth'));

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});