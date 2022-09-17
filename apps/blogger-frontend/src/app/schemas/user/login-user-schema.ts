import {number, object, string} from "zod";

export const loginUserSchema = object({
  token: string({
    required_error: 'Token is missing'
  }),
  id: number({
    required_error: 'Id is missing'
  }),
  username: string({
    required_error: 'Username is missing'
  }),
  avatar: string({
    required_error: 'Avatar is missing'
  })
}).strict();
