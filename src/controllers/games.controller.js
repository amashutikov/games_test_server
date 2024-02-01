import { DataModel } from '../models/game.js';
import { ApiError } from '../exeptions/api.error.js';
import { gameService } from '../services/game.service.js';

const getTopRatedGames = async (req, res) => {
  const { numberOfGames } = req.body;

  if (!Number(numberOfGames)) {
    throw ApiError.badRequest('Number of games can only be number', errors);
  }

  const count = await gameService.getNumberOfGames();

  const topGames = (await gameService.getTopRatedGames(numberOfGames))
    .map((game) => ({
      id: game.id,
      weightedRating: game.weightedRating,
      totalRating: game.totalRating,
      genres: game.genres,
    }))
    .sort((a, b) => b.totalRating - a.totalRating);

  res.status(200).send({ games: topGames, count });
};

const getGamesByGenre = async (req, res) => {
  const { genre, limit, offset } = req.body;

  if (!(Number(genre) && Number(limit) && Number(offset))) {
    if (offset !== '0') {
      throw ApiError.badRequest('Wrong request body data', errors);
    }
  }

  const count = await gameService.getNumberOfGames(genre);

  const games = (await gameService.getGamesByGenre(genre, limit, offset))
    .map((game) => ({
      id: game.id,
      weightedRating: game.weightedRating,
      totalRating: game.totalRating,
      genres: game.genres,
    }))
    .sort((a, b) => b.totalRating - a.totalRating);

  res.status(200).send({ games, count });
};

export const gamesController = {
  getTopRatedGames,
  getGamesByGenre,
};
