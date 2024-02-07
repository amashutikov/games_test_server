import express from 'express';
import { gamesController } from '../controllers/games.controller.js';
import { catchError } from '../utils/catchError.js';

export const gamesRouter = express.Router();

gamesRouter.post('/top', catchError(gamesController.getTopRatedGames));
gamesRouter.post('/byGenre', catchError(gamesController.getGamesByGenre));
