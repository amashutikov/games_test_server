import { DataModel } from '../models/game.js';

const getTopRatedGames = async (numberOfGames) => {
  try {
    const games = await DataModel.find().limit(Number(numberOfGames)).exec();
    return games;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

const getGamesByGenre = async (genreId, limit, offset) => {
  if (genreId) {
    try {
      const items = await DataModel.find({ genres: genreId })
        .skip(Number(offset))
        .limit(Number(limit))
        .exec();
      return items;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  try {
    const items = await DataModel.find()
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();
    return items;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getNumberOfGames = async (genre = null) => {
  if (genre) {
    try {
      const count = await DataModel.countDocuments({ genres: genre });
      return count;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  try {
    const count = await DataModel.countDocuments();
    return count;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const gameService = {
  getTopRatedGames,
  getGamesByGenre,
  getNumberOfGames,
};
