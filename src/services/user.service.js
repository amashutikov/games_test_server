import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user.js';
import { emailService } from '../services/email.service.js';
import { v4 as uuidv4 } from 'uuid';

function findByEmail(email) {
  return User.findOne({ email: email });
}

function findById(id) {
  return User.findById(id);
}

function normalize({ id, email }) {
  return { id, email };
}

async function register(email, password) {
  const activationToken = uuidv4();

  const existUser = await findByEmail(email);

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: 'User already exist',
    });
  }

  const user = new User({
    email,
    password,
    activationToken,
  });

  await user.save();

  await emailService.sendActivationEmail(email, activationToken);
}

async function updateUser(
  id,
  firstName = null,
  secondName = null,
  country = null,
  image = null
) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw ApiError.badRequest('User not found');
    }

    user.firstName = firstName;
    user.secondName = secondName;
    user.country = country;
    user.image = image;

    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw ApiError.badRequest('Error while updating the user');
  }
}

export const userService = {
  findByEmail,
  normalize,
  register,
  findById,
  updateUser,
};
