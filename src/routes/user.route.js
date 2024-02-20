import express from 'express';
import { catchError } from '../utils/catchError.js';
import { userController } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get('/:id', catchError(userController.getUserById));
userRouter.patch('/', catchError(userController.updateUser));
userRouter.patch('/like', catchError(userController.addLikedGame));
userRouter.patch('/dislike', catchError(userController.removeLikedGame));

