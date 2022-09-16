import ServerModel from '../models/server-model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ApiModel from "../models/api-model";
import {Interfaces} from '@blogger/global-interfaces';

const create = async (server: Interfaces.ServerI): Promise<Interfaces.ServerI> => {
  return await ServerModel.create(server, {
    include: [{
      model: ApiModel, as: 'apis'
    }]
  });
};

const findAll = async (): Promise<Interfaces.ServerI[]> => {
  return await ServerModel.findAll({
    include: [{
      model: ApiModel, as: 'apis'
    }]
  });
};

const update = async (server: Interfaces.ServerI): Promise<void> => {
  await ServerModel.update({
    name: server.name,
    description: server.description,
  }, {
    where: {
      id: server.id
    }
  });
};

const findByUrl = async (url: string): Promise<Interfaces.ServerI> => {
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
