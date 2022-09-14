import DataTypes, {InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelize from "../../config/sequelize";

export interface CommentI extends Model<InferAttributes<CommentI>, InferCreationAttributes<CommentI>> {
  id: number;
  author: string;
  content: string;
  article_id: number;
  parent_id: number;
  depth: number;
  created_at?: number;
  published: boolean;
  children?: CommentI[];
}

const CommentModel = sequelize.define<CommentI>('comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  depth: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  created_at: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: Math.floor(Date.now() / 1000)
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {timestamps: false});

export default CommentModel;

