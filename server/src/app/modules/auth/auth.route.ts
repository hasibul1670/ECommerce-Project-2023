import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import isLoggedIn from '../../middlewares/loggedIn/isLoggedIn';
import isLoggedOut from '../../middlewares/loggedIn/isLoggedOut';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validate';

const router = express.Router();

router.post(
  '/login',
  isLoggedOut,
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginStudent
);
router.post('/logout', isLoggedIn, AuthController.logoutUser);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AuthController.changePassword
);

export const AuthRoutes = router;
