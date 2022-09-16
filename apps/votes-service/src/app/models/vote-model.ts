import sequelize from "../../config/sequelize";
import {DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface VoteI extends Model<InferAttributes<VoteI>, InferCreationAttributes<VoteI>>{
  article_id: number;
  comment_id: number;
  ip_address: string;
  upvote: boolean;
  downvote: boolean;
  published: boolean;
}

const VoteModel = sequelize.define<VoteI>('vote', {
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  upvote: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  downvote: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['ip_address', 'article_id', 'comment_id']
    }
  ]
});

export default VoteModel;
