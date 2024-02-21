import { User } from '../models/user.js';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
import { ApiError } from '../exeptions/api.error.js';
import passwordValidator from 'password-validator';
import bcrypt from 'bcrypt';
import { tokenService } from '../services/token.service.js';

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{1,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validatePassword(value) {
  const schema = new passwordValidator();

  schema.is().min(6).is().max(20).has().digits(1).has().not().spaces();

  const isPasswordValid = schema.validate(value, { details: true });

  if (isPasswordValid.length > 0) {
    return isPasswordValid[0].message;
  }
}

async function generateTokens(res, user, setAccessToken = true) {
  const normalizedUser = userService.normalize(user);

  const accessToken = setAccessToken ? jwtService.sign(normalizedUser) : null;
  const refreshAccessToken = jwtService.signRefresh(normalizedUser);

  if (setAccessToken) {
    res.cookie('accessToken', accessToken, {
      HttpOnly: true,
      maxAge: 180 * 60 * 1000,
      sameSite: 'None',
      secure: true,
    });
  }

  await tokenService.save(normalizedUser.id, refreshAccessToken);

  res.cookie('refreshToken', refreshAccessToken, {
    HttpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'None',
    secure: true,
  });

  res.send({
    message: 'Welcome!',
    success: true,
    user: normalizedUser,
    accessToken: setAccessToken ? accessToken : null,
  });
}

const register = async (req, res) => {
  const { email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.email || errors.password) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userService.register(email, hashedPassword);

  res.send({ message: 'OK' });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const user = await User.findOne({ activationToken: activationToken });

  if (!user) {
    throw ApiError.notFound('Not found');
  }

  user.activationToken = null;
  await user.save();

  generateTokens(res, user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.badRequest('Wrong email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.badRequest('Wrong email or password');
  }

  if (user.activationToken) {
    throw ApiError.badRequest('Account is not activated');
  }

  generateTokens(res, user);
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userData = await jwtService.verifyRefresh(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!userData || !token) {
    throw ApiError.badRequest('Unauthorized');
  }

  const user = await userService.findByEmail(userData.email);
  await generateTokens(res, user);
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userData = await jwtService.verifyRefresh(refreshToken);

  if (!userData || !refreshToken) {
    throw ApiError.badRequest('Unauthorized');
  }

  await tokenService.remove(userData.id);

  res.status(204).send({
    message: 'Bye!',
  });
};

const verify = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const userData = jwtService.verify(accessToken);

    if (userData) {
      req.user = userData;
      res.status(200).send({
        success: true,
        message: 'Welcome!',
        userId: userData.id,
      });
    } else {
      // No access token, try to verify using refresh token
      await refresh(req, res);
    }
  } catch (error) {
    // Both access token and refresh token verification failed
    res
      .status(401)
      .send({ success: false, message: 'Invalid access and refresh tokens' });
  }
};

export const authController = {
  register,
  activate,
  login,
  refresh,
  logout,
  verify,
};
