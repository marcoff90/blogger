import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    })
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character'
      )
      .min(8, 'Must be at least 8 characters in length'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const loginUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export const forgottenUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type ForgottenUserPasswordInput = TypeOf<
  typeof forgottenUserPasswordSchema
>;

export const resetUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    })
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character'
      )
      .min(8, 'Must be at least 8 characters in length'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
  query: object({
    token: string({
      required_error: 'Reset password token is required',
    }),
  }),
});

export type ResetPasswordInput = TypeOf<typeof resetUserPasswordSchema>;

export const activateUserAccountSchema = object({
  body: object({
    avatar: string({
      required_error: 'Avatar must be provided',
    }),
  }),
  query: object({
    token: string({
      required_error: 'Confirmation token is required',
    }),
  }),
});

export type ActivateUserAccountInput = TypeOf<typeof activateUserAccountSchema>;

export const identifyUserByResetTokenSchema = object({
  query: object({
    token: string({
      required_error: 'Reset password token is required',
    }),
  }),
});

export type IdentifyUserByResetTokenInput = TypeOf<
  typeof identifyUserByResetTokenSchema
>;
