import { Token } from '../models/token.js';

async function save(userId, newToken) {
  const token = await Token.findOne({ userId: userId });

  if (!token) {
    const token = new Token({ userId, refreshToken: newToken });

    await token.save();
    return;
  }

  token.refreshToken = newToken;
  await token.save();
}

function getByToken(refreshToken) {
  return Token.findOne({ refreshToken: refreshToken });
}

function remove(userId) {
  return Token.deleteOne({ userId: userId });
}

export const tokenService = {
  save,
  getByToken,
  remove,
};
