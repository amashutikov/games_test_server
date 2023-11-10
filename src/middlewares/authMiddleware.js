import { jwtService } from '../services/jwt.service';

export const authMiddleware = (req, res, next) => {
  const autorization = req.headers['autorization'] || '';
  const [, token] = autorization.split(' ');

  if (!autorization || !token) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    res.sendStatus(401);
    return;
  }

  next();
};
