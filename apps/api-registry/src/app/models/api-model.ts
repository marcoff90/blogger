import { Interfaces } from '@blogger/global-interfaces';
import DataTypes from 'sequelize';
import sequelize from "../../config/sequelize";

const ApiModel = sequelize.define<Interfaces.ApiI>('api', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {timestamps: false}
);

export default ApiModel;
