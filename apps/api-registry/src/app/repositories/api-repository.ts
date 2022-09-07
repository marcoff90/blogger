import ApiModel from "../models/api-model";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const create = async (path: string, serverId: number) => {
  return await ApiModel.create({
    path: path,
    server_id: serverId
  });
};

export default {
  create
};


