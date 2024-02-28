import { ApiError } from '../exeptions/api.error.js';
import { gameService } from '../services/game.service.js';

const getTopRatedGames = async (req, res) => {
  const { numberOfGames } = req.body;

  if (!Number(numberOfGames)) {
    throw ApiError.badRequest('Number of games can only be number', errors);
  }

  const count = await gameService.getNumberOfGames();

  const topGames = (await gameService.getTopRatedGames(numberOfGames))
    .map((game) => game.id)
    .sort((a, b) => b.totalRating - a.totalRating);

  res.status(200).send({ games: topGames, count });
};

const getGamesByGenre = async (req, res) => {
  const { genre, limit, offset } = req.body;

  if (
    !(
      Number.isFinite(genre) &&
      Number.isFinite(Number(limit)) &&
      Number.isFinite(Number(offset))
    )
  ) {
    throw ApiError.badRequest('Wrong request body data', errors);
  }

  const count = await gameService.getNumberOfGames(genre);

  const games = (await gameService.getGamesByGenre(genre, limit, offset))
    .map((game) => game.id)
    .sort((a, b) => b.totalRating - a.totalRating);

  res.status(200).send({ games, count });
};

export const gamesController = {
  getTopRatedGames,
  getGamesByGenre,
};
