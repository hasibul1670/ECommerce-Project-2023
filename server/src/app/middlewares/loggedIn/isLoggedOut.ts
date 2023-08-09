import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../handlingError/ApiError';

const isLoggedOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User is Already Logged In');
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default isLoggedOut;
