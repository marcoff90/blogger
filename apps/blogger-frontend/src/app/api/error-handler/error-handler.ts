import {validationErrorSchema} from "../../schemas/errors/validation-error";
import {apiErrorSchema} from "../../schemas/errors/api-error";

export const handleError = (data: any, enqueueErrorSnackbar: (message: string) => void) => {
  if (Array.isArray(data)) {
    const result = validationErrorSchema.safeParse(data[0]);
    if (result) {
      enqueueErrorSnackbar(data[0].message);
    }
  } else {
    const result = apiErrorSchema.safeParse(data);
    if (result) {
      enqueueErrorSnackbar(data.error);
    }
  }

};
