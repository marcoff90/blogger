import sequelize from "../../config/sequelize";
import {DataTypes} from "sequelize";

const VoteModel = sequelize.define('vote', {
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
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  dislike: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
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
