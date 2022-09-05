import sequelize from '../../config/database-config';
import DataTypes, {
  InferAttributes,
  Model,
  InferCreationAttributes,
} from 'sequelize';

export interface UserI
  extends Model<InferAttributes<UserI>, InferCreationAttributes<UserI>> {
  id: number;
  username: string;
  email: string;
  password: string;
  active: boolean;
  avatar?: string;
  confirmationToken?: string;
  confirmationTokenExpiration?: number;
  forgottenPasswordToken?: string;
  forgottenPasswordTokenExpiration?: number;
}

const UserModel = sequelize.define<UserI>('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    confirmationTokenExpiration: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    forgottenPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    forgottenPasswordTokenExpiration: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {timestamps: false}
);

export default UserModel;
