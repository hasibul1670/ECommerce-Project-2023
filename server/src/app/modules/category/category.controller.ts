import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { default as sendReponse } from '../../../shared/sendResponse';
import { ICategory } from './category.interface';
import { CategoryService } from './category.service';

const sendCategoryResponse = async (
  res: Response,
  message: string,
  data: any
) => {
  sendReponse<ICategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...Category } = req.body;
  console.log('Hello', Category);
  const result = await CategoryService.createCategory(Category);
  sendCategoryResponse(res, `Category is created successfully`, result);
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategory(id);
  sendCategoryResponse(
    res,
    ' Single Category retrieved successfully !',
    result
  );
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CategoryService.updateCategory(id, updatedData);

  sendCategoryResponse(res, 'Category updated successfully !', result);
});

export const CategoryController = {
  createCategory,
  getSingleCategory,

  updateCategory,
};
