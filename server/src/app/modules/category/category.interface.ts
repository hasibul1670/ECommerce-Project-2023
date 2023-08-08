import { Model } from "mongoose";


export type ICategory = {
  name: string;
  slug: string;
};


export type CategoryModel = Model<ICategory>;