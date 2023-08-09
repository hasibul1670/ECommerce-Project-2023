import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token || token === undefined) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'You Already Logged out ! Please login'
      );
    }
    const decoded = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    );
    if (!decoded) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Invalid Access token!! Please Login Again!'
      );
    }
    if (!decoded?.userDetails.isAdmin) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'Forbidden!! You must an Admin'
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default isAdmin;
