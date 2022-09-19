import {ApiFactory} from "@blogger/api-client";
import {useQuery} from "react-query";

type Key = [string];

export const identifyUserKey = (): Key => ['confirmIdentifier'];

export const identifyConfirmUser = async (token: string) => {
  const api = await ApiFactory.createUserServiceApi();
  return await api.userServiceApiUsersConfirmIdentifyGet(token);
}

export const useIdentifyConfirmUserQuery = (token: string, disabled?: boolean) => {
  return useQuery(identifyUserKey(), () => identifyConfirmUser(token), {
    enabled: disabled
  });
};
