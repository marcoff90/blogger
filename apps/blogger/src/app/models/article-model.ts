import DataTypes, {InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../../config/sequelize";

export interface ArticleI
  extends Model<InferAttributes<ArticleI>, InferCreationAttributes<ArticleI>> {
  id: number;
  title: string;
  perex: string;
  content: string;
  deleted: boolean;
  state: State;
  image: string;
  user_id: number;
  createdAt?: Date,
  updatedAt?: Date
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
  }
});

export default ArticleModel;
