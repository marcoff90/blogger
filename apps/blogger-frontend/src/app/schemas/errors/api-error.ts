import {object, string} from "zod";

export const apiErrorSchema = object({
  error: string({
    required_error: 'Error is expected'
  })
});
