import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidaion } from './user.validation';
import isLoggedIn from '../../middlewares/loggedIn/isLoggedIn';
import isLoggedOut from '../../middlewares/loggedIn/isLoggedOut';
import isAdmin from '../../middlewares/loggedIn/isAdmin';

const router = express.Router();

router.patch(
  '/update-password',isLoggedIn,
  UserController.updateUserPassword
);
router.post(
  '/create-user',isLoggedOut,
  validateRequest(UserValidaion.createUserZodSchema),
  UserController.createUser
);
router.get('/:id',isLoggedIn, UserController.getSingleUser);
router.get('/',isAdmin, UserController.getAllUser);
router.post('/verify-user',isLoggedOut, UserController.verifyUser);

router.patch(
  '/:id',isLoggedIn,
  validateRequest(UserValidaion.updateUserZodSchema),
  UserController.updateUser
);
router.patch(
  '/ban-user/:id',isLoggedIn,isAdmin,
  UserController.banUserById
);
router.patch(
  '/unban-user/:id',isLoggedIn,isAdmin,
  UserController.unbanUserById
);
router.patch(
  '/forget-password/:id',
  UserController.forgetPassword
);



export const UserRoutes = router;
