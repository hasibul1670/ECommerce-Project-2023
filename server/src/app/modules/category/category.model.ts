import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

export const CategorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      minLength: [3, 'Category name must minimum 3 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category Slug name is required'],
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Category = model<ICategory, CategoryModel>(
  'Category',
  CategorySchema
);
