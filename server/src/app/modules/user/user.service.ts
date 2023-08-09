/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { generateUserId } from '../../../helpers/generateId';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { sendEmailWithNodemailer } from '../../../helpers/sendEmail';
import { IUser } from './user.interface';
import { User } from './user.model';

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const getAllUser = async () => {
  const result = await User.find({});
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(
    { _id: id },

    payload,
    {
      new: true,
    }
  );

  return result;
};

const createUser = async (payload: IUser) => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }

  const existingUser = await User.findOne({ email: payload?.email });

  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'User is already exist! Please login '
    );
  }

  const {
    email,
    phone,
    firstName,
    lastName,
    isBanned,
    isAdmin,
    address,
    password,
  } = payload;

  //! Generate an access token
  const accessToken = jwtHelpers.createToken(
    {
      email,
      phone,
      password,
      firstName,
      lastName,
      isBanned,
      isAdmin,
      address,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //!prepare Email

  const emailData = {
    email,
    subject: 'Account Activation Email!',
    html: `
  <h2> Hello ${firstName}!</h2>
  <p>
  Please Click here to this Link to <a href="${config.client_url}/api/users/activate/${accessToken}" target="_blank">Activate your account </a> 
  </p>
  `,
  };

  //!send email with nodemailer!!!
  try {
    await sendEmailWithNodemailer(emailData);
  } catch (error) {
    throw new ApiError(500, 'Error Occurs while sending Activation Email');
  }

  return accessToken;
};

const verifyUser = async (token: string) => {
  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required!!');
  }
  let verifiedUser = null;
  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const UserId = await generateUserId();
  const UserPayload = { ...verifiedUser, id: UserId };
  const createdUser = await User.create(UserPayload);
  const { password, ...result } = createdUser.toObject();
  return createdUser;
};

const banUserById = async (id: string): Promise<IUser | null> => {
  const updateData = { isBanned: true };
  const result = await User.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};
const unbanUserById = async (id: string): Promise<IUser | null> => {
  const updateData = { isBanned: false };
  const result = await User.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};
const updateUserPassword = async (user: IUser | any, payload: any) => {
  const email = user.email;
  const { oldPassword, newPassword } = payload;
  const loggedInUser = await User.isUserExist(email);
  let isPasswordMatched = false;
  if (user) {
    isPasswordMatched = await User.isPasswordMatched(
      oldPassword,
      loggedInUser.password
    );
  }
  if (!isPasswordMatched) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      ' Old Password is  not matched !!'
    );
  }
  const filter = user._id;
  const newBcryptedPassword = await bcrypt.hash(
    newPassword,
    Number(config.default_salt_rounds)
  );
  const updateData = { $set: { password: newBcryptedPassword } };
  let result;
  if (isPasswordMatched) {
    result = await User.findByIdAndUpdate({ _id: filter }, updateData, {
      new: true,
    });
  }
  return result;
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      ' User Not Found!! Please Sign Up !!'
    );
  }
  //! Generate an access token
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //!prepare Email
  const emailData = {
    email,
    subject: 'Reset Password  Email!',
    html: `
  <h2> Hello ${user.firstName}!</h2>
  <p>
  Please Click here to this Link to <a href="${config.client_url}/api/users/reset-password/${accessToken}" target="_blank">to reset your password </a> 
  </p>
  `,
  };
  //!send email with nodemailer!!!
  try {
    await sendEmailWithNodemailer(emailData);
  } catch (error) {
    throw new ApiError(500, 'Error Occurs while sending Reset Password Email');
  }
  return accessToken;
};

export const UserService = {
  createUser,
  getAllUser,
  unbanUserById,
  getSingleUser,
  forgetPassword,
  updateUser,
  banUserById,
  verifyUser,
  updateUserPassword,
};
