import { userService } from '../services/user.service.js';

const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const user = await userService.findById(userId);

  res.status(200).send(userService.normalize(user));
};

const updateUser = async (req, res) => {
  const { firstName, secondName, country, image, id } = req.body;

  if (!id) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const user = await userService.updateUser(
    id,
    firstName,
    secondName,
    country,
    image
  );

  res.status(200).send(user);
};

const addLikedGame = async (req, res) => {
  const { gameId, id } = req.body;

  if (!id || !gameId) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const user = await userService.addLikedGames(id, gameId);

  res.status(200).send(user);
};

const removeLikedGame = async (req, res) => {
  const { gameId, id } = req.body;

  if (!id || !gameId) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const user = await userService.removeLikedGame(id, gameId);

  res.status(200).send(user);
};

export const userController = {
  getUserById,
  updateUser,
  addLikedGame,
  removeLikedGame,
};
