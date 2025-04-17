import { createHmac, randomBytes } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const HOSTNAME = process.env.HOSTNAME || 'localhost';
console.log('MODE', process.env.MODE);

console.log('HOSTNAME:', HOSTNAME);

export const FRONTEND_ORIGIN = HOSTNAME === 'localhost' ? 'http://localhost:3000' : `https://${HOSTNAME}`;
export const BACKEND_ORIGIN = HOSTNAME === 'localhost' ? 'http://localhost:5000' : `https://${HOSTNAME}`;
export const ADD_CORS = process.env.ADD_CORS || HOSTNAME === 'localhost';

// Generate a random SHA-256 hash if SESSION_SECRET is not provided
export const SESSION_SECRET = process.env.SESSION_SECRET || createHmac('sha256', randomBytes(32)).digest('hex');

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'test';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'test';

if (GOOGLE_CLIENT_ID === 'test' || GOOGLE_CLIENT_SECRET === 'test') {
  console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment');
}

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'test';
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'test';

if (GITHUB_CLIENT_ID === 'test' || GITHUB_CLIENT_SECRET === 'test') {
  console.error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in environment');
}

export const DB_HOST = process.env.DB_HOST || 'db';
export const DB_PORT = process.env.DB_PORT || '5432';
export const DB_USERNAME = process.env.DB_USERNAME || 'user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'mydb';

export const DB_ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY || 'secret';
