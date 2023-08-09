import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidaion } from './user.validation';
import isLoggedIn from '../../middlewares/loggedIn/isLoggedIn';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidaion.createUserZodSchema),
  UserController.createUser
);
router.get('/:id',isLoggedIn, UserController.getSingleUser);
router.get('/',isLoggedIn, UserController.getAllUser);
router.post('/verify-user', UserController.verifyUser);

router.patch(
  '/:id',
  validateRequest(UserValidaion.updateUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;
