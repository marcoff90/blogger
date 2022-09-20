import {object, string} from "zod";

export const apiMessageSchema = object({
  message: string({
    required_error: 'Message is missing'
  }),
}).strict();
