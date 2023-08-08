import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { bookController } from './books.controller';
import { BookValidation } from './books.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  bookController.createBook
);
router.get('/:id', bookController.getSingleBook);
router.delete('/:id', bookController.deleteBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),

  bookController.updateBook
);
router.post('/review/:id', bookController.addBookReview);

router.get('/', bookController.getAllBook);

export const BookRoutes = router;
