/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ICategory } from './category.interface';
import { Category } from './category.model';

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await Category.findByIdAndUpdate(
    { _id: id },

    payload,
    {
      new: true,
    }
  );

  return result;
};

const createCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

export const CategoryService = {
  createCategory,
  getSingleCategory,
  updateCategory,
};
