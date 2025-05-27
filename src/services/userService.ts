import { envConfig } from '../config/config';
import {
  LoginUserDetails,
  UserDetails,
  UserDetailsInput,
} from '../models/UserDetails';
import { serverService } from './httpCommon';

export const register = async (userDetails: UserDetails) => {
  const response = await serverService.post(
    `${envConfig.BACKEND_SERVICE_URL}/user/register`,
    { userDetails }
  );

  return response;
};

export const login = async (loginUserDetails: LoginUserDetails) => {
  const response = await serverService.post(
    `${envConfig.BACKEND_SERVICE_URL}/user/login`,
    { userDetails: loginUserDetails }
  );

  return response;
};

export const getUserDetails = async (): Promise<UserDetails> => {
  const response = await serverService.get(
    `${envConfig.BACKEND_SERVICE_URL}/user/details`
  );

  return response.data;
};

export const updateUserDetails = async (userDetails: UserDetailsInput) => {
  const response = await serverService.post(
    `${envConfig.BACKEND_SERVICE_URL}/user/update`,
    { userDetails }
  );

  return response;
};
