/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import slugify from 'slugify';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const updateCategory = async (slug: string, payload: ICategory) => {
  const updateData = {
    $set: { name: payload.name, slug: slugify(payload.name) },
  };
  const result = await Category.findOneAndUpdate({ slug: slug }, updateData, {
    new: true,
  });
  return result;
};

const createCategory = async (payload: ICategory) => {
  const sluggedName = slugify(payload.name);
  const createData = {
    name: payload.name,
    slug: sluggedName,
  };
  const result = await Category.create(createData);
  return result;
};

const getSingleCategory = async (slug: string): Promise<ICategory | null> => {
  const result = await Category.findOne({ slug: slug });
  return result;
};
const getAllCategory = async () => {
  const result = await Category.find({}).lean();
  return result;
};

export const CategoryService = {
  createCategory,
  getSingleCategory,
  updateCategory,
  getAllCategory,
};
