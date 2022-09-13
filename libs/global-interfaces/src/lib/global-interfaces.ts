import {InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface ApiMessage {
  message: string;
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

export interface ApiRegistryMessage {
  serversUpdated: boolean
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

export interface UserData {
  id: number;
  username: string;
  avatar: string;
}

export interface DeletedArticleMessage {
  deletedId: number
}

export interface RabbitMessage {
  type: string;
  message: any;
  date: Date;
}
