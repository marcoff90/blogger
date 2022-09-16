import ApiModel from "../models/api-model";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Interfaces } from "@blogger/global-interfaces";

const create = async (path: string, serverId: number): Promise<Interfaces.ApiI> => {
  return await ApiModel.create({
    path: path,
    server_id: serverId
  });
};

export default {
  create
};


