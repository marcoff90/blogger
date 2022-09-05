import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - passwordConfirmation
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *        username:
 *          type: string
 *          default: JohnDoe99
 *        password:
 *          type: string
 *          default: Password123!
 *        passwordConfirmation:
 *          type: string
 *          default: Password123!
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        username:
 *          type: string
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: JohnDoe99
 *        password:
 *          type: string
 *          default: Password123!
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        username:
 *          type: string
 *        avatar:
 *          type: string
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *    ForgottenPasswordUserSchema:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *    ApiMessage:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *    ResetPasswordUserSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *        password:
 *          type: string
 *          default: Password123!
 *        passwordConfirmation:
 *          type: string
 *          default: Password123!
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *    ActivateUserAccountSchema:
 *      type: object
 *      required:
 *        - avatar
 *      properties:
 *        avatar:
 *          type: string
 *          default: assets/avatar.jpg
 *    ActivationResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        active:
 *          type: boolean
 *        avatar:
 *          type: string
 *        token:
 *          type: string
 */
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
