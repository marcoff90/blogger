import ServerModel from '../models/server-model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ApiModel from "../models/api-model";
import { Interfaces } from '@blogger/global-interfaces';

const create = async (server: Interfaces.ServerI) => {
  return await ServerModel.create(server, {
    include: [{
      model: ApiModel, as: 'apis'
    }]
  });
};

const findAll = async () => {
  return await ServerModel.findAll({
    include: [{
      model: ApiModel, as: 'apis'
    }]
  });
};

const update = async (server: Interfaces.ServerI) => {
  const updatedServer = await ServerModel.update({
    name: server.name,
    description: server.description,
  }, {
    where: {
      id: server.id
    },
    returning: true
  });
  return updatedServer;
};

const findByUrl = async (url: string) => {
  return await ServerModel.findOne({
    where: {
      url: url
    },
    include: [{
      model: ApiModel, as: 'apis'
    }]
  });
};

export default {
  create,
  findAll,
  findByUrl,
  update
};
