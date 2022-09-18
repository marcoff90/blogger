import { ApiFactory } from "@blogger/api-client";
import {useQuery} from "react-query";

type Key = [string];

export const identifyUserKey = (): Key => ['identifier'];

export const identifyConfirmUser = async (token: string) => {
  const api = await ApiFactory.createUserServiceApi();
  const res = await api.userServiceApiUsersConfirmIdentifyGet(token);
  return res;
}

export const useIdentifyConfirmUserQuery = (token: string, disabled?: boolean) => {
  return useQuery(identifyUserKey(), () => identifyConfirmUser(token), {
    enabled: disabled
  });
};
