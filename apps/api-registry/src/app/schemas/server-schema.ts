import {object, string, TypeOf} from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateServerInput:
 *      type: object
 *      required:
 *        - url
 *        - description
 *        - name
 *        - apis
 *      properties:
 *        url:
 *          type: string
 *          default: http://localhost:3000
 *        description:
 *          type: string
 *          default: User Management Api
 *        name:
 *          type: string
 *          default: user-service-api
 *        apis:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateApiInput'
 *    CreateApiInput:
 *      type: object
 *      properties:
 *        path:
 *          type: string
 *          default: apps/user-service/src/app/routers/user-router.ts
 *    CreateApiResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        path:
 *          type: string
 *        server_id:
 *          type: number
 *    ShowAllServersResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CreateServerResponse'
 *    CreateServerResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        description:
 *          type: string
 *        url:
 *          type: string
 *        name:
 *          type: string
 *        apis:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateApiResponse'
 *
 */
export const createServerSchema = object({
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

export const createGetServesSchema = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetServers = TypeOf<typeof createGetServesSchema>;



