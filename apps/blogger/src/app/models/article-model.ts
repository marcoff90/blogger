import DataTypes, {InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../../config/sequelize";

export interface ArticleI
  extends Model<InferAttributes<ArticleI>, InferCreationAttributes<ArticleI>> {
  id: number;
  title: string;
  perex: string;
  content: string;
  deleted?: boolean;
  state: State;
  image: string;
  user_id: number;
  created_at?: number,
  updated_at?: number
}

export enum State {
  DRAFT = 'draft',
  DONE = 'done'
}

const ArticleModel = sequelize.define<ArticleI>('article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  state: {
    type: DataTypes.ENUM(State.DONE, State.DRAFT),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: Math.floor(Date.now() / 1000)
  },
  updated_at: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: Math.floor(Date.now() / 1000)
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: false,
      fields: ['user_id', 'id']
    },
    {
      unique: false,
      fields: ['user_id']
    }
  ]
});

export default ArticleModel;
