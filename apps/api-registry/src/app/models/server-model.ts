import DataTypes from 'sequelize';
import sequelize from "../../config/sequelize";
import { Interfaces } from '@blogger/global-interfaces';

const ServerModel = sequelize.define<Interfaces.ServerI>('server', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {timestamps: false}
);

export default ServerModel;
