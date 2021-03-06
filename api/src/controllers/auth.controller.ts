import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequest } from '../interfaces/IRequest';
import { loginResponse, loginService } from '../services/auth.service';

const login = async (req: IRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

const getLoginResponse = async (req: IRequest, res: Response): Promise<void> => {
  const _token = req.headers.authorization.split(' ')[1];

  const { token, user } = loginResponse(_token, req.user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

const getLoggedInUser = async (req: IRequest, res: Response): Promise<void> => {
  const user = { ...req.user.toJSON() };
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export default {
  login,
  getLoginResponse,
  getLoggedInUser,
};
