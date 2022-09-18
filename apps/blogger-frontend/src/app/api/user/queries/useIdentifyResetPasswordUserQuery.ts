import { ApiFactory } from "@blogger/api-client";
import {useQuery} from "react-query";

type Key = [string];

export const identifyUserKey = (): Key => ['identifier'];

export const identifyResetPasswordUser = async (token: string) => {
  const api = await ApiFactory.createUserServiceApi();
  const res = await api.userServiceApiUsersResetIdentifyGet(token);
  return res;
}

export const useIdentifyResetPasswordUserQuery = (token: string, disabled?: boolean) => {
  return useQuery(identifyUserKey(), () => identifyResetPasswordUser(token), {
    enabled: !disabled
  });
};
