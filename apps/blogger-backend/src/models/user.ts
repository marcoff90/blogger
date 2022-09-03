import sequelize from "../config/database-config";
import DataTypes from "sequelize";
import log from '../utils/logger';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  deletedAt: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null
  },
  confirmationToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  confirmationTokenExpiration: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  forgottenPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  forgottenPasswordTokenExpiration: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: null
  }
}, {timestamps: false});

User.sync({alter: true})
.then(res => log.info(res));

export default User;
