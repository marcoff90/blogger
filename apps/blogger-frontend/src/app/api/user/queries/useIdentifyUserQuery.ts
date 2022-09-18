import { ApiFactory } from "@blogger/api-client";
import {useQuery} from "react-query";

type Key = [string];

export const identifyUserKey = (): Key => ['identifier'];

export const identifyUser = async (token: string) => {
  const api = await ApiFactory.createUserServiceApi();
  const res = await api.userServiceApiUsersIdentifyGet(token);
  return res;
}

export const useIdentifyUserQuery = (token: string, disabled?: boolean) => {
  return useQuery(identifyUserKey(), () => identifyUser(token), {
    enabled: !disabled
  });
};
