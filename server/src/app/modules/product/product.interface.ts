import { Model } from 'mongoose';

export type IReview = {
  title?: string;
  rating?: number;
  writtenBy?: string;
  date?: Date;
};

export type IBook = {
  id: string;
  title: string;
  bookDescription?: string;
  author: string;
  genre: string;
  year: string;
  publicationDate: string;
  price: number;
  bookImage?: string;
  rating?: number;
  review?: IReview;
  addedBy?: string;
  editedBy?: string;
  lastUpdateTime?: string;
  finishedReading?:boolean;
};

export type BookModel = Model<IBook>;

export type IbookFilters = {
  searchTerm?: string;
  price?: number;
  year?: string;
  genre?: string;
  rating?: string;
};
