import { ApiError } from '../exeptions/api.error.js';
import { gameService } from '../services/game.service.js';

const DATA_URL = 'https://api.igdb.com/v4';
const CLIENT_ID = process.env.IGDB_APP_CLIENT_ID;
const ACCESS_TOKEN = process.env.IGDB_APP_ACCESS_TOKEN;

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function request(method, data, endpoint) {
  const options = { method };

  if (data) {
    options.body = data;
    // Remove 'no-cors' mode
    options.headers = {
      'Client-ID': CLIENT_ID,
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      origin: 'https://localhost:3006',
    };
  }

  await wait(300);

  // Use a CORS proxy if needed
  const proxyUrl = 'https://cors-anywhere-34sl.onrender.com/';
  const urlWithProxy = `${proxyUrl}${DATA_URL}${endpoint}`;

  const response = await fetch(urlWithProxy, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error:', errorText);
    throw new Error();
  }
  return await response.json();
}

const getTopRatedGames = async (req, res) => {
  const { numberOfGames } = req.body;

  if (!Number(numberOfGames)) {
    throw ApiError.badRequest('Number of games can only be number', errors);
  }

  const count = await gameService.getNumberOfGames();

  const topGameIds = (await gameService.getTopRatedGames(numberOfGames))
    .map((game) => game.id)
    .sort((a, b) => b.totalRating - a.totalRating);

  const topGames = await request(
    'POST',
    `fields name, summary, id, slug, artworks.*, cover.*;
        limit ${numberOfGames};
        where id = (${topGameIds.join(',')});`,
    '/games'
  );

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
