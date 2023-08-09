import { Model } from "mongoose";


export type ICategory = {
  id: string;
  name: string;
  slug: string;
};


export type CategoryModel = Model<ICategory>;