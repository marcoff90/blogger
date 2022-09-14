import {AnyZodObject, object, string, TypeOf} from "zod";

export const createServerSchema: AnyZodObject = object({
  body: object({
    url: string({
      required_error: 'Url is required',
    }).url('Not a valid url'),
    description: string({
      required_error: 'Description is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
    apis: object({
      path: string({
        required_error: 'Path is required',
      })
    }).array().nonempty()
  }),
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })

});

export type CreateServerInput = TypeOf<typeof createServerSchema>;



