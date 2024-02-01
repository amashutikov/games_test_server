import express from 'express';
import { gamesController } from '../controllers/games.controller.js';
import { catchError } from '../utils/catchError.js';

export const gamesRouter = express.Router();

gamesRouter.get('/top', catchError(gamesController.getTopRatedGames));
gamesRouter.get('/byGenre', catchError(gamesController.getGamesByGenre));
