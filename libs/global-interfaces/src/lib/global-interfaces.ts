import {InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface ErrorMessage {
  error: string;
}

export interface CreateUserResponse {
  id: number;
  username: string;
}

export interface LoginUserResponse {
  token: string;
  username: string;
  avatar: string;
}

export interface ApiMessage {
  message: string;
}

export interface ActivationResponse {
  username: string;
  active: boolean;
  avatar: string;
  token: string;
}

export interface RegisterServerInput {
  url: string,
  description: string,
  name: string,
  apis: Path[]
}

export interface Path {
  path: string
}

export interface ServerI
  extends Model<InferAttributes<ServerI>, InferCreationAttributes<ServerI>> {
  id: number;
  url: string;
  description: string;
  name: string
  apis?: ApiI[]
}

export interface ApiI
  extends Model<InferAttributes<ApiI>, InferCreationAttributes<ApiI>> {
  id: number;
  path: string;
  server_id?: number;
}

export interface SwaggerDocsServer {
  url: string,
  description: string
}

export interface ApiRegistryMessage {
  serversUpdated: boolean
}

export interface RequestParams {
  [key: string]: string
}
