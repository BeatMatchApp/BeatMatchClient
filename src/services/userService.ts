import { envConfig } from "../config/config";
import { LoginUserDetails, UserDetails } from "../models/UserDetails";
import { serverService } from "./httpCommon";

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
