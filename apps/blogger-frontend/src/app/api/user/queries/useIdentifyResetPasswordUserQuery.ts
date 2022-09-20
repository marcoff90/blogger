import {ApiFactory} from "@blogger/api-client";
import {useQuery} from "react-query";

type Key = [string];

export const identifyUserKey = (): Key => ['resetIdentifier'];

export const identifyResetPasswordUser = async (token: string) => {
  const api = await ApiFactory.createUserServiceApi();
  return await api.userServiceApiUsersResetIdentifyGet(token);
}

export const useIdentifyResetPasswordUserQuery = (token: string, disabled?: boolean) => {
  return useQuery(identifyUserKey(), () => identifyResetPasswordUser(token), {
    enabled: !disabled
  });
};
