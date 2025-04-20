import { envConfig } from "../config/config";
import { UserDetails } from "../models/UserDetails";
import { serverService } from "./httpCommon";

export const register = async (userDetails: UserDetails) => {
  const response = await serverService.post(
    `${envConfig.BACKEND_SERVICE_URL}/user/register`,
    { userDetails }
  );

  return response;
};
