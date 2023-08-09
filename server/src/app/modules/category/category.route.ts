import express from 'express';
import isAdmin from '../../middlewares/loggedIn/isAdmin';
import isLoggedIn from '../../middlewares/loggedIn/isLoggedIn';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidaion } from './category.validation';

const router = express.Router();

router.get('/:slug', CategoryController.getSingleCategory);
router.get('/', CategoryController.getAllCategory);

router.post(
  '/create-category',
  isLoggedIn,
  isAdmin,
  validateRequest(CategoryValidaion.createCategoryZodSchema),
  CategoryController.createCategory
);

router.patch(
  '/:slug',
  validateRequest(CategoryValidaion.updateCategoryZodSchema),
  CategoryController.updateCategory
);

export const CategoryRoutes = router;
