import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidaion } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidaion.createCategoryZodSchema),
  CategoryController.createCategory
);
router.get('/:slug', CategoryController.getSingleCategory);

router.patch(
  '/:id',
  validateRequest(CategoryValidaion.updateCategoryZodSchema),
  CategoryController.updateCategory
);

export const CategoryRoutes = router;
