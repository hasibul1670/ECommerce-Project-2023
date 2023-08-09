import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { default as sendReponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...User } = req.body;
  const { email } = req.body;

  const result = await UserService.createUser(User);
  sendUserResponse(
    res,
    `Please Go to Your ${email} for completing your Registration Process `,
    result
  );
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendUserResponse(res, ' Single User retrieved successfully !', result);
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendUserResponse(res, ' All Users retrieved successfully !', result);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);
  sendUserResponse(res, 'User updated successfully !', result);
});

const verifyUser = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await UserService.verifyUser(token);
  sendUserResponse(res, 'User was registered successfully !', result);
});

const banUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.banUserById(id);
  sendUserResponse(res, 'User is banned successfully !', result);
});

const unbanUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.unbanUserById(id);
  sendUserResponse(res, 'User is unbanned successfully !!', result);
});
const updateUserPassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.body.userId;
  const data = req.body;
  const result = await UserService.updateUserPassword(user,data);
  sendUserResponse(res, 'User Password is Upadted successfully !!', result);
});

export const UserController = {
  createUser,
  getAllUser,
  unbanUserById,
  getSingleUser,
  banUserById,
  verifyUser,
  updateUser,
  updateUserPassword,
};
