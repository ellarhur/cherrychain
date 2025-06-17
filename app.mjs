import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDb from './src/db/cherrydatabase.mjs';
import authRoutes from './src/routes/authRoutes.mjs';
import cors from 'cors';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

const envPath = path.resolve(dirname, '../.env');
console.log('Laddar .env-fil från:', envPath);
dotenv.config({ path: envPath });

console.log('Miljövariabler efter dotenv.config():', {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI ? 'Definierad' : 'Ej definierad'
});

await connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname, '..')));

app.use('/api/v1/auth/register', authRoutes);

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  const token = req.headers.authorization;
  next();
});

export { app };