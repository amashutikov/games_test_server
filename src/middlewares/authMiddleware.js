import { jwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken; 

  if (!token) {
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
