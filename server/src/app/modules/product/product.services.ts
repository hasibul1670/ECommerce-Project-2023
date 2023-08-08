import { ApiError } from '../../../handlingError/ApiError';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateBookId } from '../../../helpers/generateId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { formatDate } from '../../../helpers/timeDateFormater';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './books.constant';
import { IBook, IReview, IbookFilters } from './books.interface';
import { Book } from './books.model';

const createBook = async (payload: IBook): Promise<IBook> => {
  const bookId = await generateBookId();
  //const BookPayload: IBook = { ...payload, id: BookId };
  const images = [
    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1616514130l/55145261.jpg',
    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601937850l/54814676.jpg',
    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618913179l/54985743.jpg',
    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602570691l/53138095.jpg',
    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1628625865l/58745185._SY475_.jpg',
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  const bookPayload: IBook = {
    ...payload,
    id: bookId,
    bookImage: payload.bookImage || randomImage,
  };

  const result = await Book.create(bookPayload);
  return result;
};

const getAllBooks = async (
  filters: IbookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const {page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    bookSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
 

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      total,
    },
    data: result,
  };
};
const getSingleBook = async (id: string) => {
  const result = await Book.find({ id: id });

  if (result === null) {
    throw new ApiError(404, 'Book not found');
  } else {
    return result;
  }
};

const deleteBook = async (id: string) => {
  const result = await Book.findOneAndDelete({ id: id });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const today = new Date();
  const options = {
    ...payload,
    lastUpdateTime: formatDate(today),
  };

  const result = await Book.findOneAndUpdate({ id: id }, options, {
    new: true,
  });
  return result;
};

const addBookReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const today = new Date();
  const options = {
    $push: {
      review: {
        title: payload.title,
        writtenBy: payload.writtenBy,
        date: formatDate(today),
      },
    },
  };
  const result = await Book.findOneAndUpdate({ id: id }, options, {
    new: true,
  });
  return result;
};

export const BookService = {
  createBook,
  addBookReview,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
