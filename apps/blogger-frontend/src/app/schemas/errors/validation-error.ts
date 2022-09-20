import {array, object, string} from "zod";

export const validationErrorSchema = object({
  code: string({
    required_error: 'Code is expected'
  }),
  expected: string({
    required_error: 'Expected is expected'
  }),
  received: string({
    required_error: 'Received is expected'
  }),
  path: array(string({
    required_error: 'Paths are expected'
  })),
  message: string({
    required_error: 'Message is expected'
  })
});
