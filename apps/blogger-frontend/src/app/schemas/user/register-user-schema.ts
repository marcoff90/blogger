import {number, object, string} from "zod";

export const registerUserSchema = object({
  id: number({
    required_error: 'Id is missing'
  }),
  username: string({
    required_error: 'Username is missing'
  })
});
