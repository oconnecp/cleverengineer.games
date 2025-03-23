import { createHmac, randomBytes } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const HOSTNAME = process.env.HOSTNAME || 'localhost';

export const FRONTEND_ORIGIN = HOSTNAME === 'localhost' ? 'http://localhost:3000' : `https://${HOSTNAME}`;
export const BACKEND_ORIGIN = HOSTNAME === 'localhost' ? 'http://localhost:5000' : `https://${HOSTNAME}`;
export const ADD_CORS = HOSTNAME === 'localhost';

// Generate a random SHA-256 hash if SESSION_SECRET is not provided
export const SESSION_SECRET = process.env.SESSION_SECRET || createHmac('sha256', randomBytes(32)).digest('hex');

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

if (GOOGLE_CLIENT_ID === '' || GOOGLE_CLIENT_SECRET === '') {
  console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment');
}

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

if (GITHUB_CLIENT_ID === '' || GITHUB_CLIENT_SECRET === '') {
  console.error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in environment');
}