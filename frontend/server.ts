import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from the backend
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});