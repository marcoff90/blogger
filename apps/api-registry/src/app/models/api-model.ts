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
    },
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['server_id']
      }
    ]
  },

);

export default ApiModel;
