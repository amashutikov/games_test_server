import express from 'express';
import { catchError } from '../utils/catchError.js';
import { newsController } from '../controllers/news.controller.js';

export const newsRouter = express.Router();

newsRouter.get('/:id', catchError(newsController.getNewsById));
newsRouter.post('/', catchError(newsController.getNews));
