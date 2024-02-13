import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import { gamesRouter } from './routes/games.route.js';
import { newsRouter } from './routes/news.route.js';

const PORT = process.env.PORT || 3006;
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

const clientUrls = process.env.CLIENT_URLS.split(',').map((url) => url.trim());

app.use(
  cors({
    origin: clientUrls,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use('/games', gamesRouter);
app.use('/news', newsRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3006`);
});
