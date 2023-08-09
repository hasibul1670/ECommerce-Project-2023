import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    console.log('Hello',token);

    if (!token || token === undefined) {
      new ApiError(StatusCodes.NOT_FOUND, 'Access token not found');
    }
    const decoded = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    );

    if (!decoded) {
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Invalid Access token!! Please Login Again!'
      );
    }

    req.body.userId = decoded?.userDetails?._id;

    next();
  } catch (error) {
    next(error);
  }
};
export default isLoggedIn;
