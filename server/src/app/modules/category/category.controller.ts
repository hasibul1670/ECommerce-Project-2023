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
  const result = await CategoryService.createCategory(Category);
  sendCategoryResponse(res, `Category is created successfully`, result);
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await CategoryService.getSingleCategory(slug);
  sendCategoryResponse(
    res,
    ' Single Category retrieved successfully !',
    result
  );
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();
  sendCategoryResponse(res, ' All Categories retrieved successfully !', result);
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await CategoryService.updateCategory(slug, payload);
  sendCategoryResponse(res, 'Category updated successfully !', result);
});

export const CategoryController = {
  createCategory,
  getSingleCategory,
  getAllCategory,
  updateCategory,
};
